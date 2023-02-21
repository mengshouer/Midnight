#!/bin/sh

cd /app
echo n | cp -i examples/.example.env data/.env
echo n | cp -i examples/notice_example.md data/notice.md
mkdir -p data/prisma
echo n | cp -irp backup/prisma/* data/prisma/