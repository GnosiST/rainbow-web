# Design

## 1. Architecture

- Framework: Next.js App Router + React.
- State: Zustand stores for windows, UI, themes, loading, screensaver, and device detection.
- Styling: Tailwind CSS and global CSS for desktop effects.
- Motion: Framer Motion.
- Content: MDX project files and generated JSON indexes.
- AI: Next.js API routes call OpenAI; the browser only calls first-party routes.
- Deployment: Docker, Docker Compose, Nginx, and Next.js standalone output.
- Maintenance: GitHub Actions run lint, build, and dependency audit checks.

## 2. Key Directories

```text
app/                         Next.js pages and API routes
app/api/ai/project-guide     AI Guide route
app/api/ai/image-generate    Image Studio text-to-image route
components/desktop           Desktop shells, dock, taskbar, icons
components/windows           Window frame, layer, and app content
content/projects             MDX project source files
content/photos.json          Photo gallery source data
lib/stores                   Zustand stores
public/data                  Generated public JSON data
scripts/build-index.js       Build-time data index generation
.github                      CI and contribution templates
```

Chinese-language planning documents are kept as `*.zh-CN.md` mirrors for local planning.

## 3. Window System

`WindowType` currently includes:

```ts
"about" | "projects" | "project" | "photos" | "slideshow" | "settings" | "image-studio"
```

`windowStore` owns:

- `windows`
- `activeId`
- `zCounter`
- `open`
- `close`
- `focus`
- `toggleMax`
- `updateRect`
- `setTitle`

`WindowFrame` maps each window type to a content component. `image-studio` maps to `ImageStudioWindow`.

## 4. Content Data

Projects are authored as MDX files in `content/projects`. `scripts/build-index.js` generates `public/data/projects.index.json`, which is used by Projects, Slideshow, and AI Guide.

Photos are maintained in `content/photos.json` and exposed through `public/data/photos.json`.

## 5. AI Guide

Route:

```text
GET /api/ai/project-guide
```

Data flow:

1. Server reads `public/data/projects.index.json`.
2. Server builds a short curator prompt from public project metadata.
3. Server calls OpenAI Responses API when `OPENAI_API_KEY` is configured.
4. Server returns `{ guide, source }`.
5. Projects window displays generated or fallback guide text.

Failure behavior:

- Missing key returns deterministic fallback.
- API failure returns fallback and an error message.
- Route is dynamic so runtime environment variables are respected.

## 6. Image Studio

Route:

```text
POST /api/ai/image-generate
```

Component:

```text
components/windows/content/ImageStudioWindow.tsx
```

Data flow:

1. Maintainer enters a prompt in Image Studio.
2. Browser posts `{ prompt }` to `/api/ai/image-generate`.
3. Server validates the prompt.
4. Server calls OpenAI Images API `/v1/images/generations`.
5. Server returns a PNG data URL.
6. Browser displays the image preview.

MVP boundaries:

- no file upload
- no image-to-image editing
- no generated asset persistence
- no automatic MDX writes
- no API key exposure to the browser

## 7. Environment Variables

```text
OPENAI_API_KEY       Optional. Enables OpenAI-backed AI routes.
OPENAI_MODEL         Optional. Defaults to gpt-4.1-mini for AI Guide.
OPENAI_IMAGE_MODEL   Optional. Defaults to gpt-image-2 for Image Studio.
```

## 8. Security Design

- API keys are read only in server routes.
- AI routes convert errors into user-facing messages.
- Image Studio previews images only; it does not persist generated data.
- CI runs dependency audit at moderate-or-higher severity.
- Security reports are handled through `SECURITY.md`.

## 9. CI Design

GitHub Actions run on pushes and pull requests to `main`:

```text
npm ci
npm run lint
npm run build
npm audit --audit-level=moderate
```

## 10. Future Design Work

- `/p/[slug]` SEO project landing pages.
- Real image asset pipeline with generated thumbnails.
- Image-to-image workflow with upload limits and metadata tracking.
- Persistent generated asset storage after explicit maintainer approval.
- Accessibility improvements for all window controls.
