# 部署指南

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 生产构建

### 1. 构建镜像

```bash
docker compose build
```

### 2. 启动服务

```bash
docker compose up -d
```

### 3. 查看日志

```bash
docker compose logs -f
```

### 4. 健康检查

```bash
curl http://localhost/api/health
```

## 更新部署

```bash
git pull
docker compose build
docker compose up -d
```

## 回滚

```bash
# 查看历史镜像
docker images rainbow-web-app

# 回滚到指定版本
docker compose down
docker tag rainbow-web-app:previous rainbow-web-app:latest
docker compose up -d
```

## 服务器初始化（首次部署）

1. 安装 Docker 和 Docker Compose
2. 配置防火墙：仅开放 80/443/22
3. 配置 SSH 密钥登录
4. 克隆代码并执行构建

## HTTPS 配置（可选）

使用 certbot 获取 SSL 证书后，更新 nginx 配置添加 443 端口监听。
