#!/usr/bin/env bash

# Exit in case any command fails
set -e

# Enable BuildKit builds
export DOCKER_BUILDKIT=1

# Get services version
export VERSION=$(node -p -e "require('../../../package.json').version")

#Login to DockerHub
docker login -u khonsu03 -p $DOCKERHUB_TOKEN

# Install & build all workspaces
sh ./scripts/docker/build.sh "now-services-core-builder" "scripts/semantic-release/docker/Dockerfile" &

# Build & push now-services-daemon-sync image
sh ./scripts/docker/build.sh "now-services-daemon-sync" "apps/daemons/sync/Dockerfile" &

# Build & push now-services-daemon-geolocation image
sh ./scripts/docker/build.sh "now-services-daemon-geolocation" "apps/daemons/geolocation/Dockerfile" &

# Build & push now-services-api-sparql image
sh ./scripts/docker/build.sh "now-services-api-sparql" "apps/api/sparql/Dockerfile" &

# Build & push now-services-api-mgt image
sh ./scripts/docker/build.sh"now-services-api-mgt" "apps/api/mgt/Dockerfile" &

# Build & push now-services-cli image
sh ./scripts/docker/build.sh "now-services-cli" "apps/cli/Dockerfile" &


