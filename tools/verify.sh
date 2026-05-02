#!/usr/bin/env bash
# [impl->verreq~verify.single-command~1]
# [impl->verreq~test.unit-tests-pass~1]
# [impl->verreq~test.build-pass~1]
# [impl->verreq~test.execution-results-produced~1]
# [impl->verreq~docs.mkdocs-build-pass~1]
set -euo pipefail

echo "Lancement de la vérification du dépôt..."
exec npm run verify
