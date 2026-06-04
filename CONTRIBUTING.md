# Contributing

Thanks for taking the time to improve Rainbow Web. This project is intentionally small, so the best contributions are focused, easy to review, and tied to a visible user or maintainer benefit.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

`OPENAI_API_KEY` is optional. Without it, the AI Guide uses a local fallback.

## Before Opening A Pull Request

Run the relevant checks:

```bash
npm run build
```

If you change project MDX files or photo data, make sure generated public data is up to date:

```bash
npm run build:index
```

## Contribution Scope

Good first areas:

- documentation improvements
- accessibility fixes
- mobile layout refinements
- MDX content validation
- deployment hardening
- tests or automation for existing behavior

Please keep pull requests small. Avoid broad rewrites unless an issue already explains the tradeoff.

## AI Features

AI-backed features must keep these boundaries:

- do not expose API keys to the browser
- do not require AI services for basic site browsing
- provide fallback behavior when API calls fail
- use only public repository content unless a future feature explicitly documents otherwise

## Pull Request Checklist

- The change is limited to the requested behavior.
- The app builds successfully.
- New environment variables are documented in `.env.example` and `README.md`.
- Security-sensitive changes are called out clearly in the PR description.
