#!/bin/sh

cd /app
ln -fs data/prisma prisma
ln -fs data/.env .env
ln -fs data/notice.md notice.md

# start server
node server.js
node
