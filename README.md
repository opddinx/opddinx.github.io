# opddinx.github.io

Personal portfolio of Kohei Miura, built with Gatsby and TypeScript and deployed to GitHub Pages.

## Development

The project uses Yarn 4 through Corepack and Node.js 20.

```sh
corepack enable
yarn install --immutable
yarn develop
```

The development server is available at `http://localhost:8000`.

## Validation

```sh
yarn typecheck
yarn build
yarn serve
```

## Structure

- `src/components`: reusable rendering components
- `src/contexts`: application-wide language and theme state
- `src/data`: portfolio content grouped by page domain
- `src/pages`: Gatsby routes and page composition
- `src/styles`: global CSS and shared design tokens
- `static`: fonts, icons, project teasers, and the fluid-circle WebGL element

## Deployment

Pushes to `main` are type-checked, built, and deployed by the GitHub Pages workflow. Generated `public` output is not committed.
