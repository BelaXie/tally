#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:BelaXie/tally.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# github上：
# git push -f git@github.com:BelaXie/tally-test-1.git master:gh-pages
# 码云上：
# git push -f git@gitee.com:belaxie/tally.git master:gh-pages

cd -