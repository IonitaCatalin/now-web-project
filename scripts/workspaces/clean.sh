#!/usr/bin/env bash

set -e

rm -rf dist $1

for i in `ls -d ./libs/*/`
do
 (cd "$i" && rm -rf dist $1)
done

for i in `ls -d ./apps/api/*/`
do
 (cd "$i" && rm -rf dist $1)
done

for i in `ls -d ./apps/daemons/*/`
do
 (cd "$i" && rm -rf dist $1)
done

for i in `ls -d ./apps/*/ | grep -v 'apps/daemons' | grep -v 'apps/api'`
do
 (cd "$i" && rm -rf dist $1)
done
