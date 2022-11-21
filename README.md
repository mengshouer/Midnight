## How to use

Install the pnpm

```bash
npm install -g pnpm
```

```bash
git clone https://github.com/mengshouer/Midnight.git
cd Midnight
pnpm i
cp .example.env .env
# 修改 .env 文件中的配置
npx prisma migrate dev --name init

# 使用 -p 参数指定端口
# dev
pnpm dev
# production
# pnpm build
# pnpm start
```
