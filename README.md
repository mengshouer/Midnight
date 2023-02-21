# How to use

## Docker

### 拉取 docker 镜像

```bash
# 修改外部端口为你想要的端口号
docker run -itd -p 外部端口:3000 --name midnight -v "$(pwd)"/midnight/:/app/data/ --restart always mengshouer/midnight:latest
# 只有 amd64 有 alpine 版本，更小的体积
# docker run -itd -p 外部端口:3000 --name midnight -v "$(pwd)"/midnight/:/app/data/ --restart always mengshouer/midnight:alpine
```

### 初始化数据

```bash
# 只有首次才需要初始化数据
docker exec -it midnight sh docker/initdata.sh
# 修改配置文件，.env 想要新数据生效，都需要重启容器
cd midnight
# vim .env
# vim notice.md
# 重启容器
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
