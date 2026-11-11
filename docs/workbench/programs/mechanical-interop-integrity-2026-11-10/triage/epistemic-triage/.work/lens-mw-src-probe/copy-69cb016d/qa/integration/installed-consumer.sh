#!/usr/bin/env bash
# L2 installed-artifact consumer smoke. Forge remains the build/package authority.
# Installs one packed tarball per rig runtime dependency (development, coordination) plus the rig itself.
# scripts/check-structure.ts (INSTALLED_CONSUMER_SMOKE_STALE) keeps this tarball set equal to the rig manifest.
set -euo pipefail
repo="$(cd "$(dirname "$0")/../.." && pwd -P)"
members=(
  "packages/development/mechanical-workflows-development-0.1.0.tgz"
  "packages/coordination/mechanical-workflows-coordination-0.1.0.tgz"
  "apps/development-rig/mechanical-development-rig-0.1.0.tgz"
)
missing=()
for member in "${members[@]}"; do
  [ -f "$repo/$member" ] || missing+=("$member")
done
if [ "${#missing[@]}" -gt 0 ]; then
  echo "PACKAGE_TARBALLS_MISSING: forge package each member first; absent: ${missing[*]}" >&2
  exit 2
fi
consumer="$(mktemp -d)"
trap 'rm -rf "$consumer"' EXIT
installs=()
for member in "${members[@]}"; do
  cp "$repo/$member" "$consumer/"
  installs+=("./$(basename "$member")")
done
printf '{"name":"mw-external-consumer","private":true,"type":"module"}\n' > "$consumer/package.json"
(cd "$consumer" && npm install --ignore-scripts --no-audit --no-fund "${installs[@]}" >/dev/null)
node "$repo/qa/integration/installed-consumer.ts" "$consumer" "${MW_CLEAN_FORGE_PACKAGE:-$repo}" "$repo"
