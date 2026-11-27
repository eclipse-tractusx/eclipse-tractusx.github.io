#!/usr/bin/env node
/********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/*
 * Shrinks the build of a pull request preview to the pages the pull request
 * changes. Run it after `npm run build`, from the repository root:
 *
 *   node utils/prune-preview.js --changed-files <file> [--build build] [--generated .docusaurus]
 *
 * <file> lists the changed files of the pull request, one path per line.
 *
 * Every page that has a source file (docs, KIT docs, blog posts, Markdown pages)
 * is removed from the build unless the pull request affects it. Its page chunks
 * and the images and static files that only it uses are removed as well. Pages
 * that a content plugin derives from its files (blog lists, tags, archives,
 * generated category indexes, RSS and Atom feeds) are kept only if the pull
 * request changes the content of that plugin. Even then, the further list pages
 * (page/2, single tags, authors) are removed: they repeat the posts of the first
 * list page and carry all their images. React pages (src/pages/*.js) only depend on code, data
 * and static files, so they are kept only if the pull request changes those.
 * The home page is always kept, so the root of the preview opens.
 *
 * A removed page is not lost: GitHub Pages answers the missing path with the
 * 404.html of the production site, which sends the visitor to the same page on
 * the live website (see previewFallbackScript in docusaurus.config.js). Client
 * side navigation to a removed page fails to load its chunk, and Docusaurus then
 * reloads the page, which ends in the same redirect.
 *
 * Which pages are kept:
 * - A changed Markdown file keeps its own page. Any other changed file inside a
 *   content folder (an image, a partial) keeps the pages of its folder.
 * - A change inside a KIT keeps the whole KIT in that version, so reviewers can
 *   browse it. A changed versioned sidebar keeps the whole version.
 * - A change outside the content folders (components, styles, configuration,
 *   data, static files) can affect any page. It keeps all pages except the
 *   released KIT versions, which are copies of older KIT states.
 * - Changes that do not end up in the website (.github/, README.md, ...) keep
 *   nothing beyond the home page.
 *
 * Images, downloads and large static files that the pull request does not
 * change are not copied into the preview: the kept pages load them from the
 * live website, which has the very same files (see shareUnchangedAssets). This
 * keeps the preview of a style or component change, which keeps almost every
 * page, small.
 *
 * The kept pages that the pull request affects are written to
 * <build>/.preview-pages.json, so the deployment can link them.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIRS = [
  'docs',
  'documentation',
  'community',
  'blog',
  'blog-changelog',
  'blog-meeting-minutes',
  'docs-kits',
  'src/pages',
];
const VERSIONED_KIT_DOCS = /^docs-kits_versioned_docs\/version-([^/]+)\//;
const VERSIONED_KIT_SIDEBAR = /^docs-kits_versioned_sidebars\/version-(.+)-sidebars\.json$/;
// Files that are not part of the website.
const IGNORED = [
  /^\.github\//,
  /^\.husky\//,
  /^\.claude\//,
  /^scripts\//,
  /^docs-kits\/kit-template\//,
  /^[^/]+\.md$/,
  /^(LICENSE|NOTICE|DEPENDENCIES|REUSE\.toml)/,
  /^\.(gitignore|gitattributes|markdownlint[^/]*|tractusx|nvmrc)$/,
  /\.license$/,
];
// Static files below this size are always kept, they hardly matter for the size.
const STATIC_KEEP_BELOW_BYTES = 64 * 1024;
const FEED_FILES = ['atom.xml', 'rss.xml', 'feed.json', 'atom.xsl', 'rss.xsl'];
const TEXT_FILES = /\.(html|js|mjs|css|json|xml|txt|webmanifest|svg)$/;

function parseArgs(argv) {
  const args = { build: 'build', generated: '.docusaurus', static: 'static' };
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '');
    if (!['build', 'generated', 'static', 'changed-files'].includes(key) || argv[i + 1] === undefined) {
      throw new Error(`Unknown or incomplete argument: ${argv[i]}`);
    }
    args[key] = argv[i + 1];
  }
  if (!args['changed-files']) {
    throw new Error('Missing --changed-files <file>');
  }
  return args;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function toPosix(file) {
  return file.split(path.sep).join('/');
}

function trimSlash(route) {
  return route.length > 1 ? route.replace(/\/+$/, '') : route;
}

// Returns the folder that is kept as a whole when a file in it changes: the KIT
// folder for KIT docs, otherwise null.
function kitUnit(file) {
  const versioned = file.match(/^(docs-kits_versioned_docs\/version-[^/]+\/)(.*)$/);
  const [prefix, rest] = versioned ? [versioned[1], versioned[2]] : file.startsWith('docs-kits/') ? ['docs-kits/', file.slice(10)] : [null, null];
  if (prefix === null) {
    return null;
  }
  const kit = rest.match(/^kits\/[^/]+\//);
  return { version: prefix, unit: kit ? prefix + kit[0] : prefix };
}

function classifyChanges(changedFiles) {
  const result = { siteWide: [], kitUnits: new Set(), files: new Set(), folders: new Set() };
  for (const file of changedFiles) {
    if (IGNORED.some((pattern) => pattern.test(file))) {
      continue;
    }
    const sidebar = file.match(VERSIONED_KIT_SIDEBAR);
    if (sidebar) {
      result.kitUnits.add(`docs-kits_versioned_docs/version-${sidebar[1]}/`);
      continue;
    }
    const kit = kitUnit(file);
    if (kit) {
      result.kitUnits.add(kit.unit);
      continue;
    }
    const contentDir = CONTENT_DIRS.find((dir) => file.startsWith(`${dir}/`));
    if (!contentDir) {
      result.siteWide.push(file);
    } else if (/\.mdx?$/.test(file) && !path.posix.basename(file).startsWith('_')) {
      result.files.add(file);
    } else {
      // Images and partials are used by the pages next to them. If the file
      // sits in a sub folder such as img/ or assets/, use its parent folder.
      let folder = path.posix.dirname(file);
      if (folder !== contentDir && /^(img|images|assets|resources|static|_.*)$/.test(path.posix.basename(folder))) {
        folder = path.posix.dirname(folder);
      }
      result.folders.add(`${folder}/`);
    }
  }
  return result;
}

// The content folder a source file belongs to: versioned KIT docs belong to docs-kits.
function contentRoot(source) {
  if (VERSIONED_KIT_DOCS.test(source)) {
    return 'docs-kits';
  }
  return CONTENT_DIRS.find((dir) => source.startsWith(`${dir}/`)) || null;
}

function touchesContentRoot(root, changes) {
  if (changes.siteWide.length > 0) {
    return true;
  }
  const changed = [...changes.kitUnits, ...changes.files, ...changes.folders];
  return changed.some((file) => contentRoot(file) === root);
}

function commonRoutePrefix(routes) {
  const [first, ...rest] = routes.map((route) => route.split('/'));
  let length = first.length;
  for (const parts of rest) {
    let i = 0;
    while (i < length && parts[i] === first[i]) {
      i += 1;
    }
    length = i;
  }
  return first.slice(0, length).join('/');
}

// Maps the route prefix of every content plugin (for example /blog or
// /community/meeting-minutes) to its content folder, so pages without a source
// file can be assigned to the plugin that derives them.
function contentRootPrefixes(sources, homeRoute) {
  const routesByRoot = new Map();
  for (const [route, source] of sources) {
    const root = contentRoot(source);
    if (root && root !== 'src/pages') {
      routesByRoot.set(root, [...(routesByRoot.get(root) || []), route]);
    }
  }
  const prefixes = [];
  for (const [root, routes] of routesByRoot) {
    const prefix = commonRoutePrefix(routes);
    if (prefix.length > homeRoute.length) {
      prefixes.push({ prefix, root });
    }
  }
  return prefixes.sort((a, b) => b.prefix.length - a.prefix.length);
}

// Returns the plugin prefix a page without a source file lives under, or null.
function derivedPagePrefix(route, prefixes) {
  return prefixes.find(({ prefix }) => route === prefix || route.startsWith(`${prefix}/`)) || null;
}

const FURTHER_LIST_PAGE = /(^|\/)(page\/\d+|tags\/.+|authors\/.+)$/;

function isAffected(source, changes) {
  const kit = kitUnit(source);
  if (kit) {
    if (changes.kitUnits.has(kit.unit) || changes.kitUnits.has(kit.version)) {
      return true;
    }
    // Site-wide changes are shown on the unreleased KIT version only.
    return changes.siteWide.length > 0 && kit.version === 'docs-kits/';
  }
  if (changes.siteWide.length > 0 || changes.files.has(source)) {
    return true;
  }
  return [...changes.folders].some((folder) => source.startsWith(folder));
}

// Maps every route of a page with a source file to that source, using the
// metadata Docusaurus generates for docs, blog posts and Markdown pages.
function readPageSources(generatedDir) {
  const sources = new Map();
  for (const file of walk(generatedDir)) {
    if (!file.endsWith('.json')) {
      continue;
    }
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    const stack = [data];
    while (stack.length > 0) {
      const value = stack.pop();
      if (Array.isArray(value)) {
        stack.push(...value);
      } else if (value && typeof value === 'object') {
        if (typeof value.source === 'string' && value.source.startsWith('@site/') && typeof value.permalink === 'string') {
          sources.set(trimSlash(value.permalink), value.source.slice('@site/'.length));
        }
        stack.push(...Object.values(value));
      }
    }
  }
  return sources;
}

function collectChunkNames(value, names = new Set()) {
  if (typeof value === 'string') {
    names.add(value);
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((child) => collectChunkNames(child, names));
  }
  return names;
}

function chunkFiles(chunkNames, manifest) {
  const files = new Set();
  for (const name of chunkNames) {
    for (const id of manifest.origins[name] || []) {
      const asset = manifest.assets[id] || {};
      for (const entry of [...(asset.js || []), ...(asset.css || [])]) {
        files.add(entry.file);
      }
    }
  }
  return files;
}

function htmlFileOf(route, baseUrl, buildDir) {
  const relative = route.slice(baseUrl.length).replace(/\/+$/, '');
  const candidates = relative ? [path.join(relative, 'index.html'), `${relative}.html`] : ['index.html'];
  return candidates.map((candidate) => path.join(buildDir, candidate)).find((file) => fs.existsSync(file));
}

function removeEmptyDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      removeEmptyDirs(path.join(dir, entry.name));
    }
  }
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

function sizeOf(files) {
  return files.reduce((total, file) => total + fs.statSync(file).size, 0);
}

function megabytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const ESCAPE = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Webpack names images, files and media after their content
// ([name]-[contenthash].[ext]), so an unchanged source file ends up under the
// same path on the live website.
const HASHED_ASSET = /^assets\/(?:images|files|medias)\/(.+)-[0-9a-f]{8,}(\.[^./]+)$/;

// Returns true if the build file (relative to the build folder) comes from a
// file that the pull request changes, so the live website does not have it.
function isChangedAsset(relative, changedFiles, changedBasenames) {
  const hashed = relative.match(HASHED_ASSET);
  if (hashed) {
    return changedBasenames.has(`${path.posix.basename(hashed[1])}${hashed[2]}`.toLowerCase());
  }
  if (relative.startsWith('assets/')) {
    // Not a content hashed asset: never assume the live website has it.
    return true;
  }
  return changedFiles.has(`static/${relative}`);
}

// Loads the images, downloads and large static files that the pull request does
// not change from the live website instead of copying them into the preview.
// The preview is served from /pr/<number>/ on the same GitHub Pages site as the
// live website (baseUrl "/"), so a reference to <baseUrl><file> becomes /<file>.
// A file is only removed from the preview if every reference to it was
// rewritten; anything referenced in another form stays in the preview.
//
// A preview that loads a file from the live website shows it as long as the
// live website has it: once main changes that file, older previews show the
// new version, or none if it was removed.
function shareUnchangedAssets(buildDir, baseUrl, candidates, changedFiles) {
  const changedBasenames = new Set([...changedFiles].map((file) => path.posix.basename(file).toLowerCase()));
  const shared = new Map();
  for (const file of candidates) {
    const relative = toPosix(path.relative(buildDir, file));
    if (!isChangedAsset(relative, changedFiles, changedBasenames)) {
      shared.set(relative, { file, total: 0, rewritten: 0 });
    }
  }
  if (shared.size === 0) {
    return { removed: [], bytes: 0 };
  }

  const pathPattern = '[^"\'`()\\s\\\\?#<>,]+';
  // Webpack's public path at runtime (publicPath + "assets/..."), and the
  // absolute <baseUrl>file form used in HTML, CSS and JSON.
  const runtimeReference = new RegExp(`\\b[A-Za-z_$][\\w$]*\\.p\\s*\\+\\s*(["'])(${pathPattern})\\1`, 'g');
  const absoluteReference = new RegExp(`${ESCAPE(baseUrl)}(${pathPattern})`, 'g');
  const topFolders = [...new Set([...shared.keys()].map((relative) => relative.split('/')[0]))];
  const anyReference = new RegExp(`(?:${topFolders.map(ESCAPE).join('|')})/${pathPattern}`, 'g');
  // References may be URI encoded (spaces in file names).
  const lookup = (relative) => {
    if (shared.has(relative)) {
      return shared.get(relative);
    }
    try {
      return shared.get(decodeURI(relative));
    } catch {
      return undefined;
    }
  };

  const textFiles = walk(buildDir).filter((file) => TEXT_FILES.test(file));
  // First count every reference, so a file referenced in a form that is not
  // rewritten is not removed.
  for (const file of textFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(anyReference)) {
      const entry = lookup(match[0]);
      if (entry) {
        entry.total += 1;
      }
    }
  }
  for (const file of textFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rewritten = content
      .replace(runtimeReference, (match, quote, relative) => {
        const entry = lookup(relative);
        if (!entry) {
          return match;
        }
        entry.rewritten += 1;
        return `${quote}/${relative}${quote}`;
      })
      .replace(absoluteReference, (match, relative) => {
        const entry = lookup(relative);
        if (!entry) {
          return match;
        }
        entry.rewritten += 1;
        return `/${relative}`;
      });
    if (rewritten !== content) {
      fs.writeFileSync(file, rewritten);
    }
  }

  const removed = [];
  let bytes = 0;
  for (const entry of shared.values()) {
    if (entry.total > 0 && entry.rewritten >= entry.total) {
      bytes += fs.statSync(entry.file).size;
      fs.rmSync(entry.file, { force: true });
      removed.push(entry.file);
    }
  }
  return { removed, bytes };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const buildDir = path.resolve(args.build);
  const generatedDir = path.resolve(args.generated);
  const changedFiles = fs
    .readFileSync(args['changed-files'], 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const config = fs.readFileSync(path.join(generatedDir, 'docusaurus.config.mjs'), 'utf8');
  const baseUrl = (config.match(/"baseUrl":\s*"([^"]+)"/) || [])[1];
  if (!baseUrl || baseUrl === '/') {
    throw new Error('Refusing to prune a build with baseUrl "/": only pull request previews may be pruned.');
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(generatedDir, 'client-manifest.json'), 'utf8'));
  const routesChunkNames = JSON.parse(fs.readFileSync(path.join(generatedDir, 'routesChunkNames.json'), 'utf8'));
  const sources = readPageSources(generatedDir);
  const changes = classifyChanges(changedFiles);
  const homeRoute = trimSlash(baseUrl);
  const prefixes = contentRootPrefixes(sources, homeRoute);

  const sizeBefore = sizeOf(walk(buildDir));
  const keptChunkNames = new Set();
  const prunedChunkNames = new Set();
  const prunedRoutes = new Set();
  const affectedPages = new Set();

  for (const [key, chunks] of Object.entries(routesChunkNames)) {
    const route = trimSlash(key.replace(/-[0-9a-f]{3}$/, ''));
    const source = sources.get(route);
    let keep;
    if (source !== undefined) {
      keep = isAffected(source, changes);
      if (keep) {
        affectedPages.add(route.slice(homeRoute.length) || '/');
      }
    } else {
      const plugin = derivedPagePrefix(route, prefixes);
      if (route === homeRoute) {
        keep = true;
      } else if (plugin === null) {
        keep = changes.siteWide.length > 0;
      } else {
        keep = touchesContentRoot(plugin.root, changes) && !FURTHER_LIST_PAGE.test(route.slice(plugin.prefix.length + 1));
      }
    }
    collectChunkNames(chunks, keep ? keptChunkNames : prunedChunkNames);
    if (!keep) {
      prunedRoutes.add(route);
    }
  }

  // Page chunks that only removed pages use.
  const keptChunks = chunkFiles(keptChunkNames, manifest);
  const removedChunks = [...chunkFiles(prunedChunkNames, manifest)]
    .filter((file) => !keptChunks.has(file))
    .map((file) => path.join(buildDir, file));
  const removedPages = [...prunedRoutes].map((route) => htmlFileOf(route, baseUrl, buildDir)).filter(Boolean);
  // Blog feeds contain the full posts, with their images.
  for (const { prefix, root } of prefixes) {
    if (!touchesContentRoot(root, changes)) {
      const dir = path.join(buildDir, prefix.slice(homeRoute.length));
      removedPages.push(...FEED_FILES.map((name) => path.join(dir, name)).filter((file) => fs.existsSync(file)));
    }
  }
  [...removedChunks, ...removedPages].forEach((file) => fs.rmSync(file, { force: true }));

  // Images, downloads and static files that no remaining file refers to.
  const staticDirs = fs.existsSync(args.static)
    ? fs.readdirSync(args.static, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    : [];
  const referencePattern = new RegExp(
    `(?:assets/(?:images|files|medias)|${staticDirs.map((dir) => dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') || '(?!)'})/[^"'\`()\\s\\\\?#<>,]+`,
    'g',
  );
  const referenced = new Set();
  for (const file of walk(buildDir)) {
    if (TEXT_FILES.test(file)) {
      for (const match of fs.readFileSync(file, 'utf8').matchAll(referencePattern)) {
        referenced.add(match[0]);
        try {
          referenced.add(decodeURI(match[0]));
        } catch {
          // Not URI encoded.
        }
      }
    }
  }
  const unreferenced = [];
  const candidates = [
    ...['images', 'files', 'medias'].flatMap((dir) => walk(path.join(buildDir, 'assets', dir))),
    ...staticDirs.flatMap((dir) => walk(path.join(buildDir, dir)).filter((file) => fs.statSync(file).size >= STATIC_KEEP_BELOW_BYTES)),
  ];
  for (const file of candidates) {
    const relative = toPosix(path.relative(buildDir, file));
    if (!referenced.has(relative) && !referenced.has(encodeURI(relative))) {
      unreferenced.push(file);
    }
  }
  unreferenced.forEach((file) => fs.rmSync(file, { force: true }));
  const removedSet = new Set(unreferenced);
  const sharedAssets = shareUnchangedAssets(
    buildDir,
    baseUrl,
    candidates.filter((file) => !removedSet.has(file) && fs.existsSync(file)),
    new Set(changedFiles),
  );
  removeEmptyDirs(buildDir);

  const pages = [...affectedPages].sort();
  fs.writeFileSync(path.join(buildDir, '.preview-pages.json'), `${JSON.stringify(pages, null, 2)}\n`);

  const sizeAfter = sizeOf(walk(buildDir));
  if (changes.siteWide.length > 0) {
    console.log(`Changes outside the content folders, for example ${changes.siteWide[0]}: keeping all pages except the released KIT versions.`);
  }
  console.log(`Pages affected by the pull request: ${pages.length}`);
  console.log(`Removed ${removedPages.length} pages, ${removedChunks.length} page chunks and ${unreferenced.length} unused images and files.`);
  console.log(`Loading ${sharedAssets.removed.length} unchanged images and files (${megabytes(sharedAssets.bytes)}) from the live website.`);
  console.log(`Preview size: ${megabytes(sizeBefore)} -> ${megabytes(sizeAfter)}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { classifyChanges, isAffected, commonRoutePrefix, shareUnchangedAssets };
