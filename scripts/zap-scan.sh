#!/usr/bin/env bash
# OWASP ZAP baseline scan for Orisun platform
# Requires Docker to be installed.
# Scans the dev server running on http://localhost:3000 and outputs HTML report.

docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t http://host.docker.internal:3000 \
  -r security-reports/zap-report.html
