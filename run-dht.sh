#!/bin/bash

set -e

UTIL="${HOLOCHAIN_DNA_UTIL_PATH:-hc}"
APP="${HOLOCHAIN_APP_PORT:-4000}"
# ADM="${HOLOCHAIN_ADMIN_PORT:-4001}"

"$UTIL" s clean
"$UTIL" s create -n 1 -d hrea_tester network quic
"$UTIL" s call install-app ./web-happ/hrea_suite.happ
"$UTIL" s run --all -p $APP