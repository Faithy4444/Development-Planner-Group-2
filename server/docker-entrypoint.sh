#!/bin/sh
set -e

npm run migrate up -- --no-check-order

node worker.js &
node src/server.js &

wait -n