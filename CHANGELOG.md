# Changelog

All notable changes to Rainbow Web are documented here.

## 0.1.0 - 2026-06-04

### Added

- Added an AI Guide panel to the Projects window.
- Added `/api/ai/project-guide` with OpenAI-backed recommendations and fallback behavior when no API key is configured.
- Added Image Studio for text-to-image previews without saving generated assets.
- Added `/api/ai/image-generate` for server-side image generation requests.
- Added `.env.example` for optional AI configuration.
- Added MIT license, contribution guide, and security policy.
- Added GitHub Actions CI for lint, build, and dependency audit checks.
- Added GitHub issue templates and a pull request template.

### Changed

- Reworked the README into an open-source project homepage with setup, deployment, AI, security, and roadmap sections.
- Marked the package as public and added repository, description, and license metadata.
- Upgraded Next.js and ESLint tooling to current security-focused versions.
- Migrated ESLint to flat config.

### Security

- Reduced dependency audit findings to zero at the moderate-or-higher audit level.
- Added server-only AI API key documentation and fallback behavior for failed AI calls.
- Kept generated images preview-only to avoid upload, storage, and asset persistence risks.
