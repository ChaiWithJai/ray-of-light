#!/usr/bin/env bash
#
# Pushes every issue in issues/ to GitHub, using the front matter for title and
# labels and the body below it verbatim.
#
# The issues are kept as tracked markdown because this repo had no remote when
# they were written. Once it has one:
#
#   scripts/file-issues.sh              # create all issues
#   scripts/file-issues.sh --dry-run    # print what would be created
#
# Requires: gh (authenticated), a git remote pointing at the target repo.

set -euo pipefail

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
	echo "error: gh is not installed. See https://cli.github.com" >&2
	exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
	echo "error: no 'origin' remote. Add one before filing issues." >&2
	exit 1
fi

if ! $DRY_RUN && ! gh auth status >/dev/null 2>&1; then
	echo "error: gh is not authenticated. Run 'gh auth login'." >&2
	exit 1
fi

# Collect labels first — gh errors on labels that do not exist yet.
declare -A seen_labels=()
for file in issues/[FSD]-*.md; do
	labels=$(awk '/^labels: \[/ { gsub(/^labels: \[|\]$/, ""); print; exit }' "$file")
	IFS=',' read -ra parts <<<"$labels"
	for label in "${parts[@]}"; do
		label="$(echo "$label" | xargs)"
		[[ -n "$label" ]] && seen_labels["$label"]=1
	done
done

echo "Labels in use: ${!seen_labels[*]}"
if ! $DRY_RUN; then
	for label in "${!seen_labels[@]}"; do
		gh label create "$label" --force >/dev/null 2>&1 || true
	done
fi

count=0
for file in issues/[FSD]-*.md; do
	title=$(awk -F'"' '/^title: / { print $2; exit }' "$file")
	labels=$(awk '/^labels: \[/ { gsub(/^labels: \[|\]$/, ""); gsub(/, */, ","); print; exit }' "$file")
	body=$(awk 'f { print } /^---$/ { c++; if (c == 2) f = 1 }' "$file")

	if $DRY_RUN; then
		printf '%-72s [%s]\n' "$title" "$labels"
	else
		gh issue create --title "$title" --label "$labels" --body "$body" >/dev/null
		echo "filed: $title"
	fi
	count=$((count + 1))
done

if $DRY_RUN; then
	echo "$count issues would be created."
else
	echo "$count issues created."
fi
