// #********************************************************************************
// # Copyright (c) 2024 Contributors to the Eclipse Foundation
// #
// # See the NOTICE file(s) distributed with this work for additional
// # information regarding copyright ownership.
// #
// # This program and the accompanying materials are made available under the
// # terms of the Apache License, Version 2.0 which is available at
// # https://www.apache.org/licenses/LICENSE-2.0.
// #
// # Unless required by applicable law or agreed to in writing, software
// # distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// # WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// # License for the specific language governing permissions and limitations
// # under the License.
// #
// # SPDX-License-Identifier: Apache-2.0
// #*******************************************************************************/

/**
 * screenshot-pages.js
 *
 * Takes screenshots of Docusaurus pages that correspond to changed MD/MDX files.
 * Usage: node scripts/screenshot-pages.js '<json-array-of-file-paths>'
 *
 * Environment variables:
 *   BASE_URL        - Base URL of the running Docusaurus server (default: http://localhost:3000)
 *   SCREENSHOT_DIR  - Directory to save screenshots (default: /tmp/screenshots)
 *   MAX_SCREENSHOTS - Maximum number of screenshots to take (default: 15)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const changedFiles = JSON.parse(process.argv[2] || process.env.CHANGED_FILES || '[]');
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const outputDir = process.env.SCREENSHOT_DIR || '/tmp/screenshots';
const maxScreenshots = parseInt(process.env.MAX_SCREENSHOTS || '15', 10);

fs.mkdirSync(outputDir, { recursive: true });

/**
 * Reads a file and extracts a frontmatter field value by key.
 * Returns null if not found.
 */
function getFrontmatterField(filePath, field) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    const frontmatter = match[1];
    const fieldMatch = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
    return fieldMatch ? fieldMatch[1].trim() : null;
  } catch {
    return null;
  }
}

/**
 * Maps a file path (relative to repo root) to a Docusaurus URL path.
 * Returns null if the mapping cannot be determined.
 */
function filePathToUrl(filePath) {
  // Normalize separators
  filePath = filePath.replace(/\\/g, '/');

  // Remove .md or .mdx extension
  const withoutExt = filePath.replace(/\.(mdx?)$/, '');

  // Helper to clean up index paths (e.g. /docs/index -> /docs)
  const cleanIndex = (url) => url.replace(/\/index$/, '') || '/';

  // docs/ -> /docs/{path}
  if (filePath.startsWith('docs/')) {
    return cleanIndex('/' + withoutExt);
  }

  // docs-kits/ -> /docs-kits/{path}
  if (filePath.startsWith('docs-kits/')) {
    return cleanIndex('/' + withoutExt);
  }

  // documentation/ -> /documentation/{path}
  if (filePath.startsWith('documentation/')) {
    return cleanIndex('/' + withoutExt);
  }

  // community/ -> /community/{path}
  if (filePath.startsWith('community/')) {
    return cleanIndex('/' + withoutExt);
  }

  // blog/ -> /blog/{slug}
  // Blog posts use a 'slug' frontmatter or derive from filename date pattern
  if (filePath.startsWith('blog/')) {
    const slug = getFrontmatterField(filePath, 'slug');
    if (slug) return '/blog/' + slug;
    const filename = path.basename(withoutExt);
    const dateSlug = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    return '/blog/' + (dateSlug ? dateSlug[1] : filename);
  }

  // blog-meeting-minutes/ -> /community/meeting-minutes/{slug}
  if (filePath.startsWith('blog-meeting-minutes/')) {
    const slug = getFrontmatterField(filePath, 'slug');
    if (slug) return '/community/meeting-minutes/' + slug;
    const filename = path.basename(withoutExt);
    const dateSlug = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    return '/community/meeting-minutes/' + (dateSlug ? dateSlug[1] : filename);
  }

  // blog-changelog/ -> /blog-changelog/{slug}
  if (filePath.startsWith('blog-changelog/')) {
    const slug = getFrontmatterField(filePath, 'slug');
    if (slug) return '/blog-changelog/' + slug;
    const filename = path.basename(withoutExt);
    const dateSlug = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    return '/blog-changelog/' + (dateSlug ? dateSlug[1] : filename);
  }

  // Cannot map
  return null;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  const results = [];
  const filesToProcess = changedFiles.slice(0, maxScreenshots);

  if (changedFiles.length > maxScreenshots) {
    console.log(`Note: ${changedFiles.length} files changed but only taking screenshots for the first ${maxScreenshots}.`);
  }

  for (const file of filesToProcess) {
    const url = filePathToUrl(file);
    if (!url) {
      console.log(`Could not map '${file}' to a URL, skipping.`);
      results.push({ file, url: null, screenshot: null, status: 'skipped', note: 'No URL mapping' });
      continue;
    }

    const fullUrl = baseUrl + url;
    console.log(`Screenshotting: ${fullUrl}`);

    try {
      const response = await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;

      if (status === 404) {
        console.log(`  → 404 Not Found`);
        results.push({ file, url, screenshot: null, status: 'not_found' });
        continue;
      }

      const screenshotName = file.replace(/[/\\]/g, '_').replace(/\.(mdx?)$/, '') + '.png';
      const screenshotPath = path.join(outputDir, screenshotName);

      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  → Saved: ${screenshotPath}`);
      results.push({ file, url, screenshot: screenshotName, status: 'success' });
    } catch (err) {
      console.error(`  → Error: ${err.message}`);
      results.push({ file, url, screenshot: null, status: 'error', note: err.message });
    }
  }

  // Add remaining files that were skipped due to limit
  for (const file of changedFiles.slice(maxScreenshots)) {
    results.push({ file, url: filePathToUrl(file), screenshot: null, status: 'skipped', note: 'Screenshot limit reached' });
  }

  fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`\nResults written to ${path.join(outputDir, 'results.json')}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
