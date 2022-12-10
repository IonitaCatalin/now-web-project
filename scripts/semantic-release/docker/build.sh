#!/usr/bin/env bash

# Exit in case any command fails
set -e

# Enable BuildKit builds
export DOCKER_BUILDKIT=1

# Get services version
export VERSION=$(node -p -e "require('./package.json').version")

# Install & build all workspaces
./scripts/docker/build.sh "services-core-builder" "scripts/semantic-release/docker/Dockerfile"

# Build & push api-graphql-gateway image
./scripts/docker/build.sh "services-daemon-sync" "apps/daemons/sync/Dockerfile" 

