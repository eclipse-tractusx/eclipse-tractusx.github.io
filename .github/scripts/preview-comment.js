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
 * Writes the preview comment of a pull request. Every pull request has at most
 * one such comment, recognized by MARKER. It always shows the current state of
 * the preview: published (with the commit it was built from), not published
 * (too large, no space) or removed (and why).
 *
 * Used with actions/github-script by "Deploy pull request preview" and "Remove
 * pull request preview", both from the default branch:
 *
 *   const preview = require(`${process.env.GITHUB_WORKSPACE}/tools/.github/scripts/preview-comment.js`);
 *   await preview.update({ github, context, prNumber, state: 'published', ... });
 */

const fs = require('fs');

const MARKER = '<!-- pr-preview-comment -->';
const SHA_MARKER = /<!-- pr-preview-sha: ([0-9a-f]{40}) -->/;
const SITE = 'https://eclipse-tractusx.github.io';
const MAX_LISTED_PAGES = 15;
const SAFE_PAGE = /^\/[A-Za-z0-9._~/%-]{0,300}$/;

// Reads the pages the preview contains from the untrusted .preview-pages.json
// of the build. Only plain paths are used, and only as links below the preview.
function readChangedPages(file) {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed.filter((page) => typeof page === 'string' && SAFE_PAGE.test(page) && !page.includes('..')) : [];
  } catch {
    return [];
  }
}

function isSha(sha) {
  return typeof sha === 'string' && /^[0-9a-f]{40}$/.test(sha);
}

function commitLink(repo, prNumber, sha) {
  return `[\`${sha.slice(0, 7)}\`](https://github.com/${repo}/pull/${prNumber}/commits/${sha})`;
}

function spaceLine(space) {
  if (!space || !/^\d+$/.test(String(space.siteMb ?? '')) || !/^\d+$/.test(String(space.previewsMb ?? ''))) {
    return null;
  }
  const total = Number(space.siteMb) + Number(space.previewsMb);
  const limit = /^\d+$/.test(String(space.limitMb ?? '')) ? ` of ${space.limitMb} MB` : '';
  return `💾 Space on GitHub Pages: ${total} MB${limit} (website ${space.siteMb} MB, all previews ${space.previewsMb} MB)`;
}

const REMOVAL_REASONS = {
  closed: 'This pull request is closed, so its preview has been removed.',
  manual: 'The preview was removed manually with the workflow "Remove pull request preview".',
  evicted:
    'The preview was removed to make space on GitHub Pages for the website. Comment `/preview` or push a new commit to publish it again.',
  newer:
    'The preview was removed to make space on GitHub Pages for a newer preview: when space runs out, the oldest previews make way for the newest one. Its build is kept for 90 days: comment `/preview` to publish it again without a rebuild.',
  replaced:
    'The preview was replaced by the preview of another pull request to make space on GitHub Pages. Its build is kept for 90 days: comment `/preview` to publish it again without a rebuild.',
};

// Parses the "<pr-number>:<MB>" list of the deploy script; only plain numbers are kept.
function parsePreviews(list) {
  return String(list || '')
    .split(/\s+/)
    .map((entry) => entry.match(/^([1-9][0-9]{0,9}):([0-9]{1,7})$/))
    .filter(Boolean)
    .map(([, number, mb]) => ({ number: Number(number), mb: Number(mb) }));
}

// Returns the comment for a state:
//   published  the preview is online (needs headSha, pagesFile)
//   too-large  the preview is larger than maxPreviewMb (needs previewMb, maxPreviewMb)
//   no-space   the preview does not fit into the free space of GitHub Pages
//   removed    the preview was removed (needs reason: closed, manual, evicted,
//              newer or replaced; replacedBy names the pull request for newer
//              and replaced)
// pagesPending marks a published preview that GitHub Pages did not serve yet.
function render({ repo, prNumber, state, headSha, previousSha, runUrl, pagesFile, previewMb, maxPreviewMb, space, reason, replacedBy, previews, neededMb, pagesPending = false, now = new Date() }) {
  const url = `${SITE}/pr/${prNumber}/`;
  const lines = [MARKER, '## 🔍 Pull request preview', ''];
  const sha = isSha(headSha) ? headSha : null;
  const build = runUrl ? ` · [build](${runUrl})` : '';
  const updated = `🕒 ${now.toISOString().slice(0, 16).replace('T', ' ')} UTC`;

  if (state === 'published') {
    const pages = readChangedPages(pagesFile);
    lines.push(`🌐 **Preview URL:** ${url}`, '');
    if (pagesPending) {
      lines.push('⏳ The preview is pushed, but GitHub Pages did not serve it yet. If the link shows an older state or "Page not found", wait a few minutes.', '');
    }
    if (sha) {
      lines.push(`📌 **Commit:** ${commitLink(repo, prNumber, sha)} · ${updated}${build}`, '');
    }
    lines.push(pages.length > 0 ? 'The preview only contains the pages this pull request changes:' : 'This pull request does not change any page of the website.');
    if (pages.length > 0) {
      lines.push('', ...pages.slice(0, MAX_LISTED_PAGES).map((page) => `- [\`${page}\`](${url}${page.slice(1)})`));
      if (pages.length > MAX_LISTED_PAGES) {
        lines.push(`- … and ${pages.length - MAX_LISTED_PAGES} more`);
      }
    }
    lines.push(
      '',
      '> All other pages of the preview open on the live website. This comment is updated on every push and shows the commit the preview was built from. The preview is removed once the pull request is closed, or earlier if GitHub Pages needs the space. Committers can publish it again with `/preview`.',
    );
  } else if (state === 'too-large' || state === 'no-space') {
    const why =
      state === 'too-large'
        ? `The preview of this commit has ${previewMb} MB, more than the ${maxPreviewMb} MB a single preview may use, so it is not published. This happens when a change affects every page, for example a change to a component, a style or the configuration.`
        : `The preview of this commit has ${previewMb} MB and does not fit into the space that GitHub Pages has left${/^\d+$/.test(String(neededMb ?? '')) ? ` (it needs ${neededMb} MB more)` : ''}, so it is not published.`;
    lines.push(why, '');
    if (state === 'too-large') {
      lines.push(
        '📦 **Publish it anyway:** a committer can comment `/preview large` to publish this preview despite its size, as long as GitHub Pages has space left for it. Replacing other previews does not help here, the limit is per preview.',
        '',
      );
    }
    const others = parsePreviews(previews).filter((other) => other.number !== prNumber);
    if (state === 'no-space' && others.length > 0) {
      lines.push(
        '♻️ **Make space:** comment `/preview replace <number>` to remove one of these previews and publish this one in its place (oldest first):',
        '',
        '| Pull request | Size | Command |',
        '|---|---:|---|',
        ...others.map((other) => `| #${other.number} | ${other.mb} MB | \`/preview replace ${other.number}\` |`),
        '',
      );
    }
    if (sha) {
      lines.push(`📌 **Commit:** ${commitLink(repo, prNumber, sha)} · ${updated}${build}`, '');
    }
    lines.push(
      `📦 Download the \`pr-preview\` artifact of the ${runUrl ? `[build](${runUrl})` : 'build'} and serve it locally, or build the preview locally as described in the README. Any older preview of this pull request has been removed, so no outdated state is shown.`,
    );
  } else if (state === 'removed') {
    lines.push(REMOVAL_REASONS[reason] || REMOVAL_REASONS.manual, '');
    if (['replaced', 'newer'].includes(reason) && Number.isInteger(replacedBy)) {
      lines.push(`It was replaced by the preview of #${replacedBy}.`, '');
    }
    const last = isSha(previousSha) ? ` · last preview: ${commitLink(repo, prNumber, previousSha)}` : '';
    lines.push(`🗑️ Removed on ${now.toISOString().slice(0, 16).replace('T', ' ')} UTC${last}`);
  } else {
    throw new Error(`Unknown preview state: ${state}`);
  }

  const spaceInfo = spaceLine(space);
  if (spaceInfo) {
    lines.push('', spaceInfo);
  }
  if (state === 'published' && sha) {
    lines.push('', `<!-- pr-preview-sha: ${sha} -->`);
  }
  return lines.join('\n');
}

async function findComment(github, owner, repo, prNumber) {
  const comments = await github.paginate(github.rest.issues.listComments, { owner, repo, issue_number: prNumber, per_page: 100 });
  return comments.find((comment) => comment.body?.startsWith(MARKER));
}

// Creates or updates the preview comment. With create: false, a missing comment
// is not created (for example for a pull request that never had a preview).
// The pull request has this label while its preview is on GitHub Pages, so the
// list of pull requests shows which previews are online. Every state other than
// published means that gh-pages no longer has the preview (a preview that is
// too large or does not fit is removed together with its older version).
const LABEL = 'preview';

// Adds or removes the label. A label that cannot be changed (missing
// permission) never stops the deployment.
async function syncLabel({ github, owner, repo, prNumber, online }) {
  try {
    if (online) {
      try {
        await github.rest.issues.createLabel({
          owner, repo, name: LABEL, color: '1f883d',
          description: 'A preview of this pull request is online at https://eclipse-tractusx.github.io/pr/<number>/',
        });
      } catch (error) {
        if (error.status !== 422) {
          throw error;
        }
        // 422: the label exists already.
      }
      await github.rest.issues.addLabels({ owner, repo, issue_number: prNumber, labels: [LABEL] });
    } else {
      await github.rest.issues.removeLabel({ owner, repo, issue_number: prNumber, name: LABEL });
    }
  } catch (error) {
    if (error.status !== 404) {
      console.log(`Could not ${online ? 'add' : 'remove'} the label "${LABEL}" on #${prNumber}: ${error.message}`);
    }
  }
}

async function update({ github, context, prNumber, create = true, ...options }) {
  const { owner, repo } = context.repo;
  const existing = await findComment(github, owner, repo, prNumber);
  const previousSha = existing?.body?.match(SHA_MARKER)?.[1];
  const body = render({ repo: `${owner}/${repo}`, prNumber, previousSha, ...options });
  if (existing) {
    await github.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body });
  } else if (create) {
    await github.rest.issues.createComment({ owner, repo, issue_number: prNumber, body });
  }
  await syncLabel({ github, owner, repo, prNumber, online: options.state === 'published' });
}

// Tells the author of a pull request that its preview was replaced. The preview
// comment is edited for that too, but GitHub does not notify about edits.
async function notifyReplaced({ github, context, prNumber, replacedBy }) {
  const { owner, repo } = context.repo;
  const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number: prNumber });
  if (pr.state !== 'open') {
    return;
  }
  const login = /^[A-Za-z0-9-]{1,39}(\[bot\])?$/.test(pr.user?.login || '') ? pr.user.login : null;
  const who = login ? `@${login} ` : '';
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: `${who}the preview of this pull request was replaced by the preview of #${replacedBy} to make space on GitHub Pages. Its build is kept for 90 days, so commenting \`/preview\` here publishes it again without a rebuild (committers only).`,
  });
}

// Tells the author of a pull request that its preview was removed to stay
// within the space of GitHub Pages: for the website itself, or, with newerBy,
// for the newer preview of that pull request. The preview comment is edited
// for that too, but GitHub does not notify about edits.
async function notifyEvicted({ github, context, prNumber, newerBy }) {
  const { owner, repo } = context.repo;
  const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number: prNumber });
  if (pr.state !== 'open') {
    return;
  }
  const login = /^[A-Za-z0-9-]{1,39}(\[bot\])?$/.test(pr.user?.login || '') ? pr.user.login : null;
  const who = login ? `@${login} ` : '';
  const why = Number.isInteger(newerBy)
    ? `GitHub Pages was full and the newer preview of #${newerBy} needed the space (the oldest previews make way for the newest one)`
    : 'GitHub Pages was full and the live website needed the space to be published';
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: `${who}the preview of this pull request was removed, because ${why}. Its build is kept for 90 days, so commenting \`/preview\` here publishes it again without a rebuild once there is space (committers only).`,
  });
}

// Parses a space separated list of pull request numbers from a workflow output.
function numbers(list) {
  return String(list || '')
    .split(/\s+/)
    .filter((number) => /^[1-9][0-9]{0,9}$/.test(number))
    .map(Number);
}

// The status comment that answers a /preview command shows the progress of
// the request. It is written by "Pull request preview command" and advanced by
// "Deploy pull request preview":
//
//   0 Request received   the command
//   1 Build              the command (started or found running)
//   2 Publish            the deployment, when it starts
//   3 GitHub Pages       the deployment, after pushing to gh-pages
//   4 Result             the deployment: link, reason or table of previews
//
// The build itself runs without write access and cannot report its progress.
const STATUS_MARKER = /^<!-- pr-preview-status:([0-9]+) -->/;
const PENDING_MARKER = '<!-- pr-preview-pending -->';
const STEP_LABELS = ['Request received', 'Build', 'Publish to `gh-pages`', 'GitHub Pages serves the preview', 'Result'];
// An animated SVG on the live website (static/img/preview/spinner.svg). GitHub
// shows images in comments and keeps SVG animations running; until the file is
// online, the alt text 🔄 is shown.
const SPINNER = `<img src="${SITE}/img/preview/spinner.svg" width="16" height="16" alt="🔄">`;
// A yellow square that blinks, for the step in progress in the bar
// (static/img/preview/pulse.svg); until it is online, the alt text 🟨 is shown.
const PULSE = `<img src="${SITE}/img/preview/pulse.svg" width="20" height="20" alt="🟨">`;
const STEP_HEADINGS = ['receiving the request', 'building', 'publishing to `gh-pages`', 'waiting for GitHub Pages', 'result'];

// step: the step in progress (0 to 4), or 5 when everything is done.
// failed: the step in progress failed. links: { build, deploy } URLs.
// result: Markdown shown under the steps.
function renderProgress({ step, failed = false, headSha, links = {}, result }) {
  const total = STEP_LABELS.length;
  const bar = STEP_LABELS.map((_, i) => (i < step ? '🟩' : i === step ? (failed ? '🟥' : PULSE) : '⬜')).join('');
  const heading =
    step >= total
      ? '**Done**'
      : `**Step ${step + 1} of ${total}:** ${failed ? 'failed while ' : ''}${STEP_HEADINGS[step]}`;
  const label = (i) => {
    if (i === 1) {
      const commit = isSha(headSha) ? ` of commit \`${headSha.slice(0, 7)}\`` : '';
      return `Build${commit}${links.build ? ` · [build log](${links.build})` : ''}`;
    }
    if (i === 2 && links.deploy) {
      return `${STEP_LABELS[i]} · [deploy log](${links.deploy})`;
    }
    return STEP_LABELS[i];
  };
  const lines = [`${bar}  ${heading}`, ''];
  STEP_LABELS.forEach((_, i) => {
    const icon = i < step ? '✅' : i === step ? (failed ? '❌' : SPINNER) : '⬜';
    lines.push(`${icon} ${label(i)}  `);
  });
  if (result) {
    lines.push('', result);
  }
  return lines.join('\n');
}

// Rebuilds a status comment with new content, keeping its marker, the quoted
// command and the footer. pending marks a status that waits for the deployment.
function statusBody(previous, content, pending) {
  const lines = String(previous).split('\n');
  const marker = lines[0];
  const quote = lines.find((line) => line.startsWith('> ')) || '';
  const footer = lines.filter((line) => line.startsWith('<sub>')).pop() || '';
  return [`${marker}${pending ? `\n${PENDING_MARKER}` : ''}`, quote, '', content, '', footer].join('\n');
}

// The /preview status comments of a pull request that still wait for a result:
// marked as pending, or older ones that show a waiting icon. statusId is always
// included if it is a status comment.
async function waitingStatusComments({ github, owner, repo, prNumber, statusId }) {
  const comments = await github.paginate(github.rest.issues.listComments, { owner, repo, issue_number: prNumber, per_page: 100 });
  const waiting = (body) => body.includes(PENDING_MARKER) || /\n(⏳|🔨|🚀|🔁|👀) /.test(body);
  return comments.filter(
    (c) => c.user?.type === 'Bot' && STATUS_MARKER.test(c.body || '') && (c.id === statusId || waiting(c.body)),
  );
}

// Writes content into the waiting status comments of a pull request. With a
// reaction (hooray or -1), the result is final: the comments are no longer
// pending and their /preview comments get the reaction.
async function updateStatusComments({ github, context, core, prNumber, statusId, content, reaction }) {
  const { owner, repo } = context.repo;
  const targets = await waitingStatusComments({ github, owner, repo, prNumber, statusId });
  for (const status of targets) {
    await github.rest.issues.updateComment({ owner, repo, comment_id: status.id, body: statusBody(status.body, content, !reaction) });
    if (reaction) {
      try {
        await github.rest.reactions.createForIssueComment({
          owner, repo, comment_id: Number(status.body.match(STATUS_MARKER)[1]), content: reaction,
        });
      } catch (error) {
        core?.info(`Could not react to the /preview comment: ${error.message}`);
      }
    }
  }
  core?.info(`Updated ${targets.length} status comment(s).`);
  return targets.length;
}

module.exports = {
  MARKER, LABEL, render, update, syncLabel, numbers, readChangedPages, parsePreviews, notifyReplaced, notifyEvicted,
  PENDING_MARKER, renderProgress, statusBody, updateStatusComments,
};
