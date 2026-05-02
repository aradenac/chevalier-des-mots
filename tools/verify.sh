#!/usr/bin/env bash
# [impl->req~verify.single-command~1]
# [impl->req~verify.unit-tests-pass~1]
# [impl->req~verify.build-pass~1]
# [impl->req~verify.traceability-validation~1]
# [impl->req~verify.docs-build-pass~1]
set -euo pipefail

echo "Lancement de la vérification du dépôt..."
npm run test:report
npm run build
npm run trace
npm run docs:build
