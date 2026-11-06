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
# Run it from a checkout of the gh-pages branch:
#
#   update-gh-pages.sh site <build-dir>
#       Replace the production site with <build-dir>. The pull request previews
#       in pr/ are kept.
#   update-gh-pages.sh preview <pr-number> <build-dir>
#       Replace the preview in pr/<pr-number> with <build-dir>. The production
#       site and the other previews are kept.
#   update-gh-pages.sh remove <pr-number>
#       Remove the preview in pr/<pr-number>.
#
# Environment: MAX_ATTEMPTS (default 10) limits the number of push attempts.

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
    [ "$#" -eq 2 ] || usage
    pr_number="$2"
    message="Remove preview of pull request ${pr_number}"
    ;;
  *)
    usage
    ;;
esac

# The pull request number becomes a path segment, so it must be a plain number.
if [ "${mode}" != "site" ] && ! [[ "${pr_number}" =~ ^[1-9][0-9]{0,9}$ ]]; then
  echo "Invalid pull request number: '${pr_number}'" >&2
  exit 2
fi

if [ "${mode}" = "site" ] && [ -e "${source_dir}/pr" ]; then
  echo "The build output must not contain a pr/ folder, it is reserved for previews." >&2
  exit 1
fi

if [ "$(git rev-parse --abbrev-ref HEAD)" != "gh-pages" ]; then
  echo "Run this script from a checkout of the gh-pages branch." >&2
  exit 1
fi

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'

apply_change() {
  case "${mode}" in
    site)
      find . -mindepth 1 -maxdepth 1 ! -name .git ! -name pr -exec rm -rf {} +
      cp -R "${source_dir}/." .
      ;;
    preview)
      rm -rf "pr/${pr_number}"
      mkdir -p "pr/${pr_number}"
      cp -R "${source_dir}/." "pr/${pr_number}/"
      ;;
    remove)
      rm -rf "pr/${pr_number}"
      ;;
  esac
}

max_attempts="${MAX_ATTEMPTS:-10}"
for attempt in $(seq 1 "${max_attempts}"); do
  # Start from the latest published state, also dropping the commit of a
  # previous attempt that was rejected.
  git fetch --quiet --depth=1 origin gh-pages
  git reset --quiet --hard FETCH_HEAD
  git clean --quiet -ffdx

  apply_change

  git add --all
  if git diff --cached --quiet; then
    echo "Nothing to publish, gh-pages is already up to date."
    exit 0
  fi
  git commit --quiet --message "${message}"

  if git push --quiet origin HEAD:gh-pages; then
    echo "Published to gh-pages (attempt ${attempt}): ${message}"
    exit 0
  fi

  delay=$(( attempt * 3 + RANDOM % 5 ))
  echo "Push rejected, gh-pages has moved. Retrying in ${delay}s (attempt ${attempt} of ${max_attempts})."
  sleep "${delay}"
done

echo "Could not push to gh-pages after ${max_attempts} attempts." >&2
exit 1
