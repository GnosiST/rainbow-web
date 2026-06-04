# Requirements

## 1. Goal

Rainbow Web is a desktop OS style portfolio site. It should make creative work easy to browse, feel interactive, remain maintainable through Git-based content updates, and support self-hosted deployment.

## 2. MVP Scope

### Required

- Desktop Shell
  - top bar
  - desktop icons
  - dock or taskbar
- Window Manager
  - open multiple windows
  - drag windows
  - focus and z-index management
  - maximize and restore
  - close
  - animated open and close transitions
- Apps
  - About
  - Projects
  - Project detail
  - Photos / Gallery
  - Slideshow
  - Settings
  - AI Guide in Projects
  - Image Studio for maintainer text-to-image previews
- Settings
  - background themes
  - brightness
  - visual filters
  - safe/full screen area
  - localStorage persistence
  - reset
- Content system
  - MDX project content
  - generated project index
  - JSON photo data
- Deployment
  - Docker
  - Nginx reverse proxy
  - `/api/health`
- Open-source readiness
  - README
  - CHANGELOG
  - MIT license
  - contribution guide
  - security policy
  - GitHub Actions CI

### Explicitly Out Of Scope For MVP

- account system
- CMS or online editing
- public unrestricted image generation
- image-to-image upload editing
- automatic persistence of generated images
- automatic edits to project MDX from AI output
- MinIO/object storage
- asynchronous thumbnail worker
- complex window resizing beyond the existing implementation

## 3. User Roles

- Visitor: browses projects, reads project details, opens gallery links, and uses AI Guide to understand the portfolio faster.
- Maintainer: updates content through Git, uses Image Studio for visual concept previews, and deploys the site.
- Contributor: submits focused improvements through issues and pull requests.

## 4. User Stories

1. A visitor opens the home page and sees a desktop interface.
2. A visitor opens Projects and launches a project detail window.
3. A visitor uses AI Guide to get a recommended browsing path.
4. A visitor changes visual settings and sees them persist after refresh.
5. A visitor opens Slideshow, moves between featured projects, and opens the current project.
6. A visitor opens Photos and follows external purchase/contact links.
7. A maintainer opens Image Studio, enters a prompt, and previews an AI-generated visual concept.
8. A maintainer can run lint, build, and audit checks locally and in CI.

## 5. Functional Requirements

### Desktop Shell

- Desktop icons must open apps through `windowStore.open(type)`.
- External links must open in a new browser tab.
- macOS, Windows, and illustration desktop styles should expose the same core apps.

### Window Manager

- `open(type, payload?)` opens a window and returns its id.
- `close(id)` removes a window.
- `focus(id)` brings a window to the front.
- `toggleMax(id)` maximizes/restores a window.
- `updateRect(id, rect)` changes window position or size.

### Projects

- Load `public/data/projects.index.json`.
- Render project cards.
- Open `ProjectWindow` with project payload.
- Show AI Guide without blocking the project list.

### AI Guide

- Route: `GET /api/ai/project-guide`.
- Use public project metadata only.
- Return fallback content when `OPENAI_API_KEY` is missing or the API call fails.
- Never expose the API key to the browser.

### Image Studio

- Route: `POST /api/ai/image-generate`.
- Window type: `image-studio`.
- Input: text prompt, max 1200 characters.
- Output: base64 image data URL for preview.
- No upload support in MVP.
- No generated image persistence in MVP.
- Show a clear configuration message when `OPENAI_API_KEY` is missing.

### Open-Source Maintenance

- CI must run:
  - `npm run lint`
  - `npm run build`
  - `npm audit --audit-level=moderate`
- Documentation must describe AI features, environment variables, security boundaries, and deployment.

## 6. Non-Functional Requirements

- Performance: initial experience should remain responsive on normal desktop/mobile networks.
- Maintainability: new projects should not require business logic changes.
- Security: API keys remain server-side only.
- Reliability: AI failures should return user-facing errors instead of breaking the page.
- Observability: `/api/health` must remain available.
- Open-source quality: repo metadata, license, contribution guide, security policy, and changelog must stay current.

## 7. Definition Of Done

- Window interactions work: open, drag, focus, maximize, close.
- Projects open detail windows.
- Settings persist and reset.
- Slideshow and Photos remain usable.
- AI Guide works with fallback and configured API paths.
- Image Studio returns configuration errors without 500s when no key is configured.
- `npm run lint` passes.
- `npm run build` passes.
- `npm audit --audit-level=moderate` reports zero vulnerabilities.
