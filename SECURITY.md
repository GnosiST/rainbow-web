# Security Policy

## Reporting A Vulnerability

Please do not open a public issue for security vulnerabilities.

Report privately by emailing the maintainer:

```text
tianxiaochung@gmail.com
```

Include:

- affected files or routes
- reproduction steps
- expected impact
- any suggested mitigation

I will acknowledge valid reports as soon as practical and prioritize fixes based on severity.

## Current Security Boundaries

- `OPENAI_API_KEY` must only be configured on the server.
- The AI Guide API uses public project metadata and does not collect visitor input.
- AI service failures return fallback content instead of exposing internal errors.
- Docker and Nginx deployment files are part of the reviewed surface.

## Supported Versions

This repository is early-stage. Security fixes target the `main` branch.
