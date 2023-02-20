#!/bin/sh

cd /app
echo n | cp -i examples/.example.env data/.env
echo n | cp -i examples/notice_example.md data/notice.md
rm -f .env notice.md
mv prisma data/prisma