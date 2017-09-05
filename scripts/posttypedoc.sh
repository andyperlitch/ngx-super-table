#!/usr/bin/env bash
set -exu

echo '#nojekyll' > doc/.nojekyll

for i in doc/* # iterate over all files in current dir
do
    if [ -d "$i" ] # if it's a directory
    then
        echo '#nojekyll' > "$i/.nojekyll"
    fi
done
