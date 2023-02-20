# How to use

## Docker

```bash
docker run -itd --name midnight -p 12305:3000 -v "$(pwd)"/midnight/:/app/data/ --restart always mengshouer/midnight:latest
# 只有首次才需要初始化数据
docker exec -it midnight sh docker/initdata.sh
# 修改配置文件，.env 修改都需要重启
cd midnight
# vim .env
# vim notice.md
docker restart midnight
```

## Dev

Install the pnpm

```bash
npm install -g pnpm
```

```bash
git clone https://github.com/mengshouer/Midnight.git
cd Midnight
pnpm i
cp examples/.example.env .env
cp examples/notice_example.md notice.md
# 修改 .env 文件中的配置
npx prisma migrate dev --name init

# 使用 -p 参数指定端口
# dev
pnpm dev
# production
# pnpm build
# pnpm start
```
