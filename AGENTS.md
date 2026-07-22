# Agent Guidelines

## Project Context

- This repository publishes `@querry-kit/nuxt-ui`, customizable Nuxt UI table controls for Query Kit applications.
- Keep the module framework-neutral beyond its declared Nuxt UI peers. Do not import CRM code, application stores, runtime configuration, or layouts.
- Public component names must keep the `QuerryKit` prefix and user-visible messages must remain under `querryKit`.
- Applications own their table data, state, routes, and translations; this package provides reusable controls and namespaced locale payloads.

## Change Management

- Create a Changeset for every commit, including maintenance and documentation commits.
- Use the smallest correct SemVer bump: `patch` for fixes or documentation improvements, `minor` for backwards-compatible additions, and `major` for breaking changes.
- Keep Changeset summaries short and user-facing.
- Do not revert unrelated user changes or commit generated output.

## Public API and TypeScript

- Everything exported from `src/index.ts` and configured package subpaths is public API.
- Preserve both ESM and CommonJS compatibility.
- Use strict TypeScript, named exports, and `unknown` for unconstrained values.
- Add or change public exports only with matching JSDoc, tests, README, and VitePress updates.
- Keep components independent of application stores, authentication state, runtime configuration, and layouts.

## Testing and Verification

- Aim for 100% runtime line coverage; exclude only type-only and generated modules, never executable runtime code.
- For code changes, run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test:coverage`.
- For documentation changes, run `pnpm docs:build`.
- For visual component changes, run `pnpm screenshots:check`; update baselines only after reviewing the changed PNG files.
- For package export changes, verify the built ESM and CommonJS entrypoints.
- If a verification command cannot be run, report that explicitly.

## Git Workflow

- Keep commits scoped and intentional.
- Do not push without explicit user authorization.
- Check `git status --short --branch` before committing or pushing.
- When pushing a feature branch, open a draft pull request against the default branch and assign `@tobiaswaelde`.

## Release Workflow

- Develop on feature branches or `dev`, not directly on `main`.
- Changesets creates or updates release pull requests for versioning and changelog updates.
- Publishing uses the repository's npm Trusted Publishing workflow; do not publish manually unless explicitly requested.

## Documentation

- Keep the English README and VitePress documentation aligned with public APIs, components, installation, examples, and the release workflow.
- Keep navigation, sidebar entries, and linked pages in sync for VitePress changes.
- Documentation examples must use the published `@querry-kit/nuxt-ui` package name and remain practical.
