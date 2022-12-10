#!/usr/bin/env bash

set -e

npm version --no-git-tag-version $1

for i in `ls -d ./libs/*/`
do
 (cd "$i" && npm version --no-git-tag-version $1)
done

for i in `ls -d ./apps/api/*/`
do
 (cd "$i" && npm version --no-git-tag-version $1)
done

for i in `ls -d ./apps/daemons/*/`
do
 (cd "$i" && npm version --no-git-tag-version $1)
done

for i in `ls -d ./apps/*/ | grep -v 'apps/daemons' | grep -v 'apps/api'`
do
 (cd "$i" && npm version --no-git-tag-version $1)
done