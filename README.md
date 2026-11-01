# GitHub interface

Personal rework of GitHub's landing page and app interface, backed by a Cloudflare Worker and Turso. This is an independent project and is not affiliated with GitHub.

## Run locally

```sh
bun install
cp .dev.vars.example .dev.vars
bun run dev
```

Fill in the local values in `.dev.vars` before using database-backed pages. To run the Worker locally, use `bun run worker:dev`.
