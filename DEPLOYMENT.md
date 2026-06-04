# Deployment

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

Build the image:

```bash
docker compose build
```

Start services:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

Health check:

```bash
curl http://localhost/api/health
```

## Updating A Server

```bash
git pull
docker compose build
docker compose up -d
```

## Rollback

```bash
docker images rainbow-web-app
docker compose down
docker tag rainbow-web-app:previous rainbow-web-app:latest
docker compose up -d
```

## Environment Variables

```text
OPENAI_API_KEY       Optional. Enables OpenAI-backed AI routes.
OPENAI_MODEL         Optional. Defaults to gpt-4.1-mini.
OPENAI_IMAGE_MODEL   Optional. Defaults to gpt-image-2.
```

If `OPENAI_API_KEY` is missing, the app remains usable. AI Guide falls back to local recommendations and Image Studio shows a configuration message.

## First Server Setup

1. Install Docker and Docker Compose.
2. Configure the firewall to expose only required ports.
3. Use SSH key authentication.
4. Clone the repository.
5. Configure environment variables.
6. Build and start the app with Docker Compose.

## HTTPS

Use certbot or your preferred certificate automation, then update the Nginx configuration for port 443.
