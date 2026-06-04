# Rainbow Web

Rainbow Web is an open-source portfolio starter that turns a personal creative site into an interactive desktop OS. Visitors can open draggable windows, browse MDX-powered projects, explore a photo gallery, switch visual themes, and get an AI-generated guide through the portfolio.

The project is built for designers, developers, and independent creators who want a self-hosted portfolio that feels more like an interface than a static landing page.

## Highlights

- **Desktop-style experience**: top bar, desktop icons, dock/taskbar, stacked windows, drag movement, focus, maximize, and close.
- **Mobile-ready shell**: responsive mobile views for About, Projects, Photos, and Settings.
- **Content-driven projects**: project entries live in `content/projects` as MDX and are indexed at build time.
- **Photo gallery data**: gallery entries are maintained in `content/photos.json` and exported to public data.
- **AI portfolio guide**: `/api/ai/project-guide` can use OpenAI to recommend a visitor path through the project list.
- **Image Studio**: `/api/ai/image-generate` can generate text-to-image previews for portfolio art direction.
- **Graceful no-key mode**: the AI guide falls back to deterministic local recommendations when `OPENAI_API_KEY` is not configured.
- **Self-hostable deployment**: Docker, Docker Compose, Nginx reverse proxy, and `/api/health` are included.
- **Maintainer-ready automation**: GitHub Actions run lint, build, and dependency audit checks on pushes and pull requests.

## Why This Is Open Source

Most portfolio sites are either static galleries or marketing pages. Rainbow Web explores a different pattern: a personal site as a small operating environment. The goal is to make the codebase reusable for other creators while keeping the content layer simple enough to maintain with Git.

The current repository is early-stage and intentionally small. The focus is maintainability, security, documentation quality, and practical deployment rather than inflated project metrics.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- OpenAI Responses API
- Docker and Nginx
- GitHub Actions

## Project Structure

```text
app/                  Next.js routes, layout, and API endpoints
components/           Desktop, mobile, window, and content UI components
content/              MDX project files and photo source data
lib/                  Stores, theme configuration, and shared types
public/data/          Build-generated public indexes
scripts/              Build-time indexing scripts
nginx/                Nginx reverse proxy configuration
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file if you want AI recommendations:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

```text
OPENAI_API_KEY       Optional. Enables generated AI portfolio guide responses.
OPENAI_MODEL         Optional. Defaults to gpt-4.1-mini.
OPENAI_IMAGE_MODEL   Optional. Defaults to gpt-image-2.
```

If `OPENAI_API_KEY` is missing, the site still works. The AI Guide panel shows a local fallback recommendation, and Image Studio shows a configuration message instead of calling OpenAI.

## Common Commands

```bash
npm run dev          # Start local development
npm run build:index  # Generate project and photo indexes
npm run build        # Build for production
npm run start        # Start the production server
npm run lint         # Run Next.js lint checks
npm audit --audit-level=moderate
```

`npm run build` automatically runs `scripts/build-index.js` before building the Next.js app.

## Content Workflow

Add or edit projects:

1. Create or update an MDX file in `content/projects`.
2. Keep the frontmatter fields aligned with `lib/types/project.ts`.
3. Run `npm run build:index` or `npm run build`.

Update the photo gallery:

1. Edit `content/photos.json`.
2. Run `npm run build:index` to sync `public/data/photos.json`.

## AI Guide

The Projects window includes an AI Guide panel. It requests `/api/ai/project-guide`, which reads the generated project index and asks OpenAI for a concise visitor recommendation.

Design constraints:

- The prompt only uses public project metadata from this repository.
- The route does not store visitor input.
- The route is dynamic so production deployments read the current environment variables.
- API failures return a normal fallback response instead of breaking the page.

## Image Studio

Image Studio is a maintainer-facing text-to-image preview tool. It requests `/api/ai/image-generate`, sends a prompt to OpenAI, and renders the returned image in the browser.

Design constraints:

- Generated images are preview-only and are not saved to disk.
- The route does not accept file uploads.
- The browser never receives `OPENAI_API_KEY`.
- Missing configuration or API failures return user-facing error messages.

## Production Deployment

Build and start with Docker Compose:

```bash
docker compose build
docker compose up -d
```

Check logs:

```bash
docker compose logs -f
```

Health check:

```bash
curl http://localhost/api/health
```

Update an existing deployment:

```bash
git pull
docker compose build
docker compose up -d
```

See `DEPLOY.md` for more deployment notes.

## Security

Please report security issues privately. See `SECURITY.md`.

The current security focus areas are:

- dependency updates
- automated dependency auditing in CI
- Docker and Nginx deployment hardening
- safe handling of OpenAI API keys
- clear fallback behavior when AI services are unavailable
- review of public content indexing and external links

## Roadmap

- Add project SEO landing pages at `/p/[slug]`.
- Add image optimization workflows for real project assets.
- Add automated checks for project MDX frontmatter.
- Expand the AI Guide into optional project summaries and content QA helpers.
- Improve accessibility coverage for window controls and mobile navigation.

## Contributing

Contributions are welcome while the project is still small and easy to understand. Start with `CONTRIBUTING.md` for local setup, issue scope, and pull request expectations.

## Repository

```text
https://github.com/GnosiST/rainbow-web.git
```

Check whether local and remote are aligned:

```bash
git fetch origin
git status --short --branch
```

If the branch shows no ahead/behind count and there are no changed files, the local checkout is aligned with the remote branch.

## License

MIT. See `LICENSE`.
