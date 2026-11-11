#!/usr/bin/env bash
# Offline OCI smoke of a Forge-produced library tarball, never a publish.
set -euo pipefail
repo="$(cd "$(dirname "$0")/../.." && pwd -P)"
packdir="$(mktemp -d)"
artifact="$packdir/$(cd "$repo/packages/development" && npm pack --ignore-scripts --json --pack-destination "$packdir" | sed -n 's/.*"filename": *"\([^"]*\)".*/\1/p' | head -1)"
entry="$repo/qa/integration/container-worker-smoke.ts"
node_binary="${MW_NODE_BINARY:-/home/jehallad/.local/share/mise/installs/node/22.23.2/bin/node_real}"
image="${MW_CONTAINER_IMAGE:-public.ecr.aws/amazonlinux/amazonlinux:latest}"
[[ -f "$artifact" && -f "$entry" && -x "$node_binary" ]] || { echo 'CONTAINER_WORKER_INPUT_MISSING' >&2; exit 2; }
digest="sha256:$(sha256sum "$artifact" | cut -d ' ' -f1)"
docker run --rm --network none --read-only --tmpfs /tmp:rw,nosuid,size=16m \
  -v "$node_binary:/usr/local/bin/node:ro" \
  -v "$artifact:/artifact/library.tgz:ro" \
  -v "$entry:/worker/entry.ts:ro" \
  --entrypoint /usr/local/bin/node "$image" \
  /worker/entry.ts /artifact/library.tgz "$digest"
