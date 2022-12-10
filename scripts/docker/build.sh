#!/usr/bin/env bash

# Exit in case any command fails
set -e

docker build -t $1 -f $2 --build-arg VERSION=$VERSION .

TODO: Add here push to private repository