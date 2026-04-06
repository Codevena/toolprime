#!/usr/bin/env bash
set -euo pipefail

echo "=== ToolPrime Deploy ==="
echo ""

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Uncommitted changes detected:"
  git status --short
  echo ""
  read -rp "Commit and deploy? (y/n) " answer
  if [[ "$answer" != "y" ]]; then
    echo "Aborted."
    exit 1
  fi
  git add -A
  read -rp "Commit message: " msg
  git commit -m "$msg"
fi

# Check for untracked files
if [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  echo "Untracked files:"
  git ls-files --others --exclude-standard
  echo ""
  read -rp "Stage and commit these too? (y/n) " answer
  if [[ "$answer" == "y" ]]; then
    git add -A
    read -rp "Commit message: " msg
    git commit -m "$msg"
  fi
fi

# Push to main
echo ""
echo "Pushing to origin/main..."
git push origin main

# Show workflow link
echo ""
echo "Deploy triggered! Watch progress:"
echo "  gh run watch"
echo ""
echo "Or visit: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]//' | sed 's/.git$//')/actions"
