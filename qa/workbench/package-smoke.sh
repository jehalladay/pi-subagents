#!/usr/bin/env bash
# External consumer: inspect packed contents without installing into the developer tree.
set -euo pipefail
node qa/workbench/package-smoke.mjs
