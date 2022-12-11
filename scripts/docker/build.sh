#!/usr/bin/env bash

# Exit in case any command fails
set -e

docker build -t $1 -f $2 --build-arg VERSION=$VERSION .
docker tag $1 "khonsu03/$1:$VERSION"
docker tag "khonsu03/$1:$VERSION" "khonsu03/$1:$LATEST_VERSION"
docker push "khonsu03/$1:$VERSION"
docker push "khonsu03/$1:$LATEST_VERSION"
