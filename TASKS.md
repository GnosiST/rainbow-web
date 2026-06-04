# Tasks

## Milestones

- M0: Project and deployment skeleton.
- M1: Desktop Shell.
- M2: Window Manager.
- M3: Projects and ProjectWindow.
- M4: Settings.
- M5: Slideshow and Photos/Gallery.
- M6: SEO, performance, tests, and production acceptance.
- M7: AI-assisted content tools.
- M8: Open-source readiness and security automation.

## M0: Project And Deployment Skeleton

- [x] Create Next.js App Router project.
- [x] Configure Tailwind CSS.
- [x] Add `/api/health`.
- [x] Add Dockerfile.
- [x] Add Docker Compose.
- [x] Add Nginx reverse proxy config.

Acceptance:

- `npm run dev` starts locally.
- `GET /api/health` returns JSON.
- Docker deployment path is documented.

## M1: Desktop Shell

- [x] Add top bar.
- [x] Add desktop icons.
- [x] Add Dock / Taskbar.
- [x] Wire app icons to `windowStore.open(type)`.

Acceptance:

- Core app windows can be opened from desktop UI.

## M2: Window Manager

- [x] Define `WindowType` and `WindowState`.
- [x] Add `windowStore`.
- [x] Add `WindowLayer`.
- [x] Add `WindowFrame`.
- [x] Support focus, close, maximize, and rect updates.

Acceptance:

- Multiple windows can be opened and focused.

## M3: Projects And ProjectWindow

- [x] Add build-time project index generation.
- [x] Add project list window.
- [x] Add project detail window.
- [x] Open project detail windows from project cards.

Acceptance:

- Project entries render from generated project data.

## M4: Settings

- [x] Add global UI store with persistence.
- [x] Add background theme controls.
- [x] Add brightness controls.
- [x] Add filter controls.
- [x] Add screen area controls.
- [x] Add reset behavior.

Acceptance:

- Visual settings update immediately and persist after refresh.

## M5: Slideshow And Photos

- [x] Add slideshow for featured projects.
- [x] Add photo gallery data and window.
- [x] Open external links in a new tab.

Acceptance:

- Featured projects and gallery entries are browsable.

## M6: SEO, Performance, Tests, Production

- [x] Add site metadata.
- [x] Add health endpoint.
- [x] Add production Docker path.
- [x] Add lint/build/audit CI.
- [ ] Add `/p/[slug]` SEO landing pages.
- [ ] Add sitemap and robots.
- [ ] Add Playwright smoke coverage.

Acceptance:

- CI passes on push and pull request.

## M7: AI-Assisted Content Tools

### AI Guide

- [x] Add `/api/ai/project-guide`.
- [x] Generate guide text from public project metadata.
- [x] Add AI Guide panel to Projects window.
- [x] Add fallback behavior when `OPENAI_API_KEY` is missing.
- [x] Keep route dynamic.

Acceptance:

- `GET /api/ai/project-guide` returns fallback JSON without an API key.

### Image Studio

- [x] Add `image-studio` window type.
- [x] Add `ImageStudioWindow`.
- [x] Add `/api/ai/image-generate`.
- [x] Wire desktop, dock, taskbar, and illustration desktop entry points.
- [x] Support prompt input, loading state, error state, and image preview.
- [x] Keep generated images preview-only.

Acceptance:

- `POST /api/ai/image-generate` returns a configuration message without an API key instead of a 500.
- `npm run build` shows `/api/ai/image-generate` as dynamic.

### Future AI Work

- [ ] Add image-to-image editing with strict upload limits.
- [ ] Add generated asset persistence after explicit approval.
- [ ] Track prompt, model, source, and createdAt metadata.
- [ ] Add content QA helpers for MDX project entries.

## M8: Open-Source Readiness And Security Automation

- [x] Rewrite README for open-source use.
- [x] Add CHANGELOG.
- [x] Add LICENSE.
- [x] Add CONTRIBUTING.
- [x] Add SECURITY.
- [x] Add `.env.example`.
- [x] Add package metadata.
- [x] Add GitHub Actions CI.
- [x] Add issue templates.
- [x] Add PR template.
- [x] Upgrade Next.js / ESLint security tooling.
- [x] Clear `npm audit --audit-level=moderate`.

Acceptance:

- `npm run lint` passes.
- `npm run build` passes.
- `npm audit --audit-level=moderate` reports zero vulnerabilities.
