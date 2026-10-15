#!/usr/bin/env bash
# Native read-only integration runs only when a Forge binary is explicitly available.
set -euo pipefail
node qa/workbench/native-forge.mjs "${1:-$PWD}"
