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

# Build locally
echo ""
echo "Building site..."
ASTRO_TELEMETRY_DISABLED=1 pnpm build

# Deploy to Cloudflare
echo ""
echo "Deploying to Cloudflare..."
pnpm wrangler deploy

echo ""
echo "Done! Site is live at https://toolprime.dev"
