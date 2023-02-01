#!/usr/bin/env bash

# Exit in case any command fails
set -e

# Enable BuildKit builds
export DOCKER_BUILDKIT=1

# Get services version
# export VERSION=$(node -p -e "JSON.stringify(require('./package.json').version)" | tr -d '"')
export VERSION=1.8.0

#Login to DockerHub
# docker login -u khonsu03 -p $DOCKERHUB_TOKEN

# Install & build all workspaces
sh /home/khonsu/Documents/wade/now-web-project/scripts/docker/build.sh "now-services-core-builder" "scripts/semantic-release/docker/Dockerfile" 

# Build & push now-services-daemon-sync image
./scripts/docker/build.sh "now-services-api-client" "apps/api/client/Dockerfile" &

# Build & push now-services-api-sparql image
./scripts/docker/build.sh "now-services-api-now" "apps/api/sparql/Dockerfile" &

# Build & push now-services-api-sparql image
./scripts/docker/build.sh "now-services-daemon-email" "apps/daemons/email/Dockerfile" 


