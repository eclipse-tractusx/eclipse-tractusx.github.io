#!/usr/bin/env bash
#********************************************************************************
# Copyright (c) 2026 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
#*******************************************************************************/
#
# Applies one change to the gh-pages branch and pushes it.
#
# Several workflows write to gh-pages independently of each other: the
# production deployment, the previews of different pull requests and the
# removal of previews. A push is therefore rejected whenever another workflow
# pushed in the meantime. In that case the change is applied again on top of the
# latest gh-pages commit and pushed again, so no workflow has to wait for a
# shared lock and no change of another workflow is lost.
#
# Run it from an empty directory. It fetches the latest gh-pages commit there
# (only the files, no history) and creates the branch if it does not exist yet,
# for example in a fork:
#
#   update-gh-pages.sh site <build-dir>
#       Replace the production site with <build-dir>. The pull request previews
#       in pr/ are kept, and so is generated/ when <build-dir> has none.
#   update-gh-pages.sh preview <pr-number> <build-dir>
#       Replace the preview in pr/<pr-number> with <build-dir>. The production
#       site and the other previews are kept.
#   update-gh-pages.sh remove [<pr-number>...]
#       Remove the previews in pr/<pr-number>. Without a number, only the space
#       limit below is enforced.
#   update-gh-pages.sh data <data-dir>
#       Replace generated/ (data the site reads at run time, such as the product
#       statistics) with <data-dir>. Everything else is kept.
#
# Space limit: GitHub Pages fails to deploy a site that is too large, and then
# not even the production site is updated. Every mode therefore checks the space
# against GH_PAGES_LIMIT_MB before it pushes. The previews may use what the
# production site leaves free of the limit. If they need more, the oldest
# previews are removed first (by pr/<pr-number>/.deployed-at, previews without
# it count as oldest). The preview that is being deployed is never removed for
# another one; if it does not fit on its own, it is not published and an older
# version of it is removed as well. The production site is always published,
# with a warning if it alone exceeds the limit. A removed preview comes back
# with the next deployment of its pull request.
#
# Outputs (appended to GITHUB_OUTPUT when it is set, after a successful push or
# if there was nothing to push):
#   removed-previews   previews removed on request (remove mode), space separated
#   evicted-previews   previews removed to stay within the space limit
#   no-space           "true" if the preview did not fit and was not published
#   needed-mb          with no-space: how many MB more the preview needs
#   replaced-previews  previews removed through REPLACE_PREVIEWS
#   previews           the other previews as "<pr-number>:<MB>", oldest first
#   deployed-at        preview mode: content of pr/<pr-number>/.deployed-at that was
#                      pushed (empty if the preview was not published). GitHub Pages
#                      serves it, so a workflow can check that the preview is online.
#   site-mb, previews-mb, limit-mb
#                      space used by the production site and all previews after
#                      the change, and the limit (empty if there is none)
# A table of the space used is appended to GITHUB_STEP_SUMMARY when it is set.
#
# Environment:
#   GITHUB_TOKEN       token with contents: write, used to fetch and push
#   GITHUB_REPOSITORY  owner/name of the repository (set by GitHub Actions)
#   GH_PAGES_REMOTE    overrides the remote URL, for example for local tests
#   MAX_ATTEMPTS       number of push attempts (default 10)
#   PREVIEW_EVICT      preview mode: "oldest" (default) removes the oldest previews of
#                      other pull requests when space runs out; "none" removes none and
#                      reports no-space instead, so a person can choose what to replace
#   REPLACE_PREVIEWS   preview mode: previews of these pull requests are removed in the
#                      same commit before the space is checked (space separated numbers)
#   GH_PAGES_LIMIT_MB  maximum size of the whole gh-pages site in MB, 0 for no limit
#                      (default 2500: deployments of up to about 3.3 GB succeeded,
#                      4.4 GB and more failed)

set -euo pipefail

usage() {
  sed -n '/^# Run it from/,/^# Environment/p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
}

mode="${1:-}"
case "${mode}" in
  site)
    [ "$#" -eq 2 ] || usage
    source_dir="$(cd "$2" && pwd)"
    message="Deploy website from ${GITHUB_SHA:-a local build}"
    ;;
  preview)
    [ "$#" -eq 3 ] || usage
    pr_number="$2"
    source_dir="$(cd "$3" && pwd)"
    message="Deploy preview of pull request ${pr_number}"
    ;;
  remove)
    shift
    remove_numbers=("$@")
    if [ "$#" -eq 0 ]; then
      message="Enforce the space limit of the pull request previews"
    else
      message="Remove previews of pull requests $*"
    fi
    ;;
  data)
    [ "$#" -eq 2 ] || usage
    source_dir="$(cd "$2" && pwd)"
    message="Update generated data"
    ;;
  *)
    usage
    ;;
esac

# A pull request number becomes a path segment, so it must be a plain number.
for number in ${pr_number:-} ${remove_numbers[@]+"${remove_numbers[@]}"}; do
  if ! [[ "${number}" =~ ^[1-9][0-9]{0,9}$ ]]; then
    echo "Invalid pull request number: '${number}'" >&2
    exit 2
  fi
done

evict="${PREVIEW_EVICT:-oldest}"
case "${evict}" in
  oldest|none) ;;
  *) echo "Invalid PREVIEW_EVICT: '${evict}'" >&2; exit 2 ;;
esac
read -r -a replace_numbers <<< "${REPLACE_PREVIEWS:-}"
for number in ${replace_numbers[@]+"${replace_numbers[@]}"}; do
  if ! [[ "${number}" =~ ^[1-9][0-9]{0,9}$ ]]; then
    echo "Invalid pull request number in REPLACE_PREVIEWS: '${number}'" >&2
    exit 2
  fi
done

limit_mb="${GH_PAGES_LIMIT_MB:-2500}"
if ! [[ "${limit_mb}" =~ ^[0-9]+$ ]]; then
  echo "Invalid GH_PAGES_LIMIT_MB: '${limit_mb}'" >&2
  exit 2
fi
if [ "${limit_mb}" -eq 0 ]; then
  limit_mb=""
fi

if [ "${mode}" = "site" ] && [ -e "${source_dir}/pr" ]; then
  echo "The build output must not contain a pr/ folder, it is reserved for previews." >&2
  exit 1
fi

if [ -n "$(ls -A)" ]; then
  echo "Run this script from an empty directory." >&2
  exit 1
fi

remote_url="${GH_PAGES_REMOTE:-https://github.com/${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is not set}.git}"
git -c init.defaultBranch=gh-pages init --quiet
git remote add origin "${remote_url}"
if [ -n "${GITHUB_TOKEN:-}" ]; then
  # Same authentication as actions/checkout uses. The repository only lives in
  # the runner's workspace, which is discarded after the job.
  git config "http.https://github.com/.extraheader" \
    "AUTHORIZATION: basic $(printf 'x-access-token:%s' "${GITHUB_TOKEN}" | base64 | tr -d '\n')"
fi
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'

# Makes the working directory match the latest gh-pages commit, or an empty
# branch without history if gh-pages does not exist yet. Also drops the commit
# of a previous attempt that was rejected.
load_latest_gh_pages() {
  if git ls-remote --exit-code --heads origin gh-pages > /dev/null; then
    git fetch --quiet --depth=1 origin gh-pages
    git checkout --quiet --force -B gh-pages FETCH_HEAD
  else
    # If the branch does exist and ls-remote only failed, the push below is
    # rejected because it is not a fast-forward, and the next attempt retries.
    echo "The gh-pages branch does not exist yet, it will be created."
    git symbolic-ref HEAD refs/heads/gh-pages
    git update-ref -d refs/heads/gh-pages 2> /dev/null || true
    git read-tree --empty
  fi
  git clean --quiet -ffdx
}

# Lists the previews as "<deployed-at> <pr-number>", oldest first. Previews
# without a timestamp were deployed before timestamps existed and count as oldest.
list_previews_oldest_first() {
  local dir number deployed_at
  for dir in pr/*/; do
    [ -d "${dir}" ] || continue
    number="$(basename "${dir}")"
    deployed_at="$(tr -dc '0-9' < "${dir}.deployed-at" 2> /dev/null || true)"
    echo "${deployed_at:-0} ${number}"
  done | sort -n
}

# Size in MB of the production site (everything except .git and pr/).
site_size_mb() {
  find . -mindepth 1 -maxdepth 1 ! -name .git ! -name pr -exec du -sk {} + | awk '{ kb += $1 } END { print int(kb / 1024) }'
}

previews_size_mb() {
  if [ -d pr ]; then
    du -sk pr | awk '{ print int($1 / 1024) }'
  else
    echo 0
  fi
}

# A preview that is not published must not take the place of the preview it
# was going to replace: those are restored from the gh-pages commit.
restore_replaced_previews() {
  local number
  for number in ${replaced_previews[@]+"${replaced_previews[@]}"}; do
    echo "Keeping the preview pr/${number}, because pull request ${pr_number} is not published."
    git checkout --quiet HEAD -- "pr/${number}"
  done
  replaced_previews=()
}

enforce_space_limit() {
  [ -n "${limit_mb}" ] || return 0
  local site_mb budget_mb previews_mb own_mb deployed_at number
  site_mb="$(site_size_mb)"
  budget_mb=$(( limit_mb - site_mb ))
  # A preview that does not fit on its own must not remove the others.
  if [ "${mode}" = "preview" ]; then
    own_mb="$(du -sk "pr/${pr_number}" | awk '{ print int($1 / 1024) }')"
    if [ "${own_mb}" -gt "${budget_mb}" ]; then
      echo "::warning title=No space for the preview::The preview of pull request ${pr_number} needs ${own_mb} MB, but the production site (${site_mb} MB) leaves only ${budget_mb} MB of ${limit_mb} MB. The preview is not published."
      rm -rf "pr/${pr_number}"
      rmdir pr 2> /dev/null || true
      restore_replaced_previews
      no_space=true
      return 0
    fi
  fi
  # Without eviction, a preview that would need the space of others is not
  # published; the comment lists the previews so a person can pick one to replace.
  if [ "${mode}" = "preview" ] && [ "${evict}" = "none" ]; then
    previews_mb="$(previews_size_mb)"
    if [ "${previews_mb}" -gt "${budget_mb}" ]; then
      needed_mb=$(( previews_mb - budget_mb ))
      echo "::notice title=No space for the preview::The preview of pull request ${pr_number} needs ${needed_mb} MB more than GitHub Pages has left. It is not published; replace another preview with /preview replace <number>."
      rm -rf "pr/${pr_number}"
      rmdir pr 2> /dev/null || true
      restore_replaced_previews
      no_space=true
      return 0
    fi
  fi
  while read -r deployed_at number; do
    previews_mb="$(previews_size_mb)"
    [ "${previews_mb}" -gt "${budget_mb}" ] || break
    [ "${number}" != "${pr_number:-}" ] || continue
    echo "The site uses ${site_mb} MB and the previews ${previews_mb} MB of ${limit_mb} MB. Removing the oldest preview pr/${number} (deployed at ${deployed_at})."
    rm -rf "pr/${number}"
    evicted_previews+=("${number}")
  done < <(list_previews_oldest_first)

  # Only the production site itself can still exceed the limit here.
  if [ "$(previews_size_mb)" -gt "${budget_mb}" ] || [ "${budget_mb}" -lt 0 ]; then
    echo "::warning title=Site exceeds the space limit::The production site alone uses ${site_mb} MB of ${limit_mb} MB. Raise GH_PAGES_LIMIT_MB or make the site smaller."
  fi
}

write_outputs() {
  local site_mb previews_mb number
  site_mb="$(site_size_mb)"
  previews_mb="$(previews_size_mb)"
  echo "Space used: production site ${site_mb} MB, previews ${previews_mb} MB, limit ${limit_mb:-none} MB."
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    {
      echo "removed-previews=${removed_previews[*]}"
      echo "evicted-previews=${evicted_previews[*]}"
      echo "no-space=${no_space}"
      echo "needed-mb=${needed_mb}"
      echo "replaced-previews=${replaced_previews[*]}"
      echo "previews=$(for number in $(list_previews_oldest_first | cut -d' ' -f2); do [ "${number}" = "${pr_number:-}" ] || printf '%s:%s ' "${number}" "$(du -sk "pr/${number}" | awk '{ print int($1 / 1024) }')"; done)"
      echo "site-mb=${site_mb}"
      echo "previews-mb=${previews_mb}"
      echo "limit-mb=${limit_mb}"
      if [ "${mode}" = "preview" ]; then
        echo "deployed-at=$(tr -dc '0-9' < "pr/${pr_number}/.deployed-at" 2> /dev/null || true)"
      fi
    } >> "${GITHUB_OUTPUT}"
  fi
  if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
    {
      echo "### Space on gh-pages"
      echo
      echo "| Part | MB |"
      echo "|---|---:|"
      echo "| Production site | ${site_mb} |"
      for number in $(list_previews_oldest_first | cut -d' ' -f2); do
        echo "| Preview of #${number} | $(du -sk "pr/${number}" | awk '{ print int($1 / 1024) }') |"
      done
      echo "| **Total** | **$(( site_mb + previews_mb ))** of ${limit_mb:-no limit} |"
      if [ "${#evicted_previews[@]}" -gt 0 ]; then
        echo
        echo "Removed to stay within the limit: ${evicted_previews[*]}"
      fi
    } >> "${GITHUB_STEP_SUMMARY}"
  fi
}

apply_change() {
  case "${mode}" in
    site)
      find . -mindepth 1 -maxdepth 1 ! -name .git ! -name pr ! -name generated -exec rm -rf {} +
      if [ -d "${source_dir}/generated" ]; then
        rm -rf generated
      fi
      cp -R "${source_dir}/." .
      enforce_space_limit
      ;;
    preview)
      rm -rf "pr/${pr_number}"
      mkdir -p "pr/${pr_number}"
      cp -R "${source_dir}/." "pr/${pr_number}/"
      date +%s > "pr/${pr_number}/.deployed-at"
      for number in ${replace_numbers[@]+"${replace_numbers[@]}"}; do
        if [ "${number}" != "${pr_number}" ] && [ -d "pr/${number}" ]; then
          echo "Replacing the preview pr/${number}."
          rm -rf "pr/${number}"
          replaced_previews+=("${number}")
        fi
      done
      enforce_space_limit
      ;;
    remove)
      for number in ${remove_numbers[@]+"${remove_numbers[@]}"}; do
        if [ -d "pr/${number}" ]; then
          rm -rf "pr/${number}"
          removed_previews+=("${number}")
        fi
      done
      enforce_space_limit
      ;;
    data)
      rm -rf generated
      mkdir -p generated
      cp -R "${source_dir}/." generated/
      enforce_space_limit
      ;;
  esac
}

max_attempts="${MAX_ATTEMPTS:-10}"
for attempt in $(seq 1 "${max_attempts}"); do
  removed_previews=()
  evicted_previews=()
  replaced_previews=()
  no_space=false
  needed_mb=""
  load_latest_gh_pages
  apply_change
  commit_message="${message}"
  if [ "${no_space}" = true ]; then
    commit_message="Remove preview of pull request ${pr_number}, it does not fit into ${limit_mb} MB"
  fi
  if [ "${#replaced_previews[@]}" -gt 0 ]; then
    commit_message+=$'\n\n'"Replace previews: ${replaced_previews[*]}"
  fi
  if [ "${#evicted_previews[@]}" -gt 0 ]; then
    commit_message+=$'\n\n'"Remove previews to stay within ${limit_mb} MB: ${evicted_previews[*]}"
  fi

  git add --all
  if git diff --cached --quiet; then
    echo "Nothing to publish, gh-pages is already up to date."
    write_outputs
    exit 0
  fi
  git commit --quiet --message "${commit_message}"

  if git push --quiet origin HEAD:gh-pages; then
    echo "Published to gh-pages (attempt ${attempt}): ${commit_message%%$'\n'*}"
    write_outputs
    exit 0
  fi

  delay=$(( attempt * 3 + RANDOM % 5 ))
  echo "Push rejected, gh-pages has moved. Retrying in ${delay}s (attempt ${attempt} of ${max_attempts})."
  sleep "${delay}"
done

echo "Could not push to gh-pages after ${max_attempts} attempts." >&2
exit 1
