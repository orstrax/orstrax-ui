# Orstrax UI

Central **runtime theme** for Orstrax-branded software.

This is not “install a package and copy styles at build time.” Consumer apps load the hosted stylesheet and canonical brand assets from one deployed origin. Changing the promoted theme or the wordmark file here is how every Orstrax-branded app receives the visual change.

Independent brands (Ecloras, Financial Fern, Sunday Maker) must not load this theme.

## Canonical host

Production origin: `https://ui.orstrax.io`

Until DNS is attached, the Vercel deployment for this repo is the asset origin. Apps override with `NEXT_PUBLIC_ORSTRAX_UI_ORIGIN`.

| Resource | URL |
|---|---|
| Pinned theme | `https://ui.orstrax.io/theme/v1.0.0/orstrax.css` |
| Promoted current | `https://ui.orstrax.io/theme/current/orstrax.css` |
| Wordmark | `https://ui.orstrax.io/assets/orstrax-wordmark.png` |
| Mark | `https://ui.orstrax.io/assets/orstrax-mark.png` |

Production apps should pin a **versioned** CSS URL (`/theme/v1.0.0/...`). `/theme/current/` only moves after a version is validated.

## Consumer apps

In the root layout:

```tsx
<link rel="stylesheet" href="https://ui.orstrax.io/theme/v1.0.0/orstrax.css" />
```

Set Inter (`--font-inter`), Nunito (`--font-nunito`), and Source Serif 4 (`--font-source-serif`) on `<html>`. Product names in lockups use Nunito. Put `data-orstrax-theme` on `<html>` so shadcn/Tailwind tokens map onto Desk values.

Lockup pattern: canonical wordmark image + product name as text.

```tsx
<img src="https://ui.orstrax.io/assets/orstrax-wordmark.png" alt="Orstrax" />
Desk
```

`OrstraxProductBrand` in this package does that and reads the same asset URL.

## Layers

1. **Runtime theme (this host)** — tokens, CSS, wordmark, mark
2. **Optional React package** — AuthLayout, product brand, app shell markup
3. **Local app** — auth logic, routes, data, product UI

Do not recreate Desk CSS in Orders, Admin, or Hub.

## Releases

1. Edit `theme/orstrax.css` and/or `public/assets/`
2. Bump `package.json` version
3. `npm run publish-theme` (copies CSS to `public/theme/vX.Y.Z` and `public/theme/current`)
4. Merge to `main` — Vercel serves the files; GitHub Release tags the package for optional React consumers

Versioned CSS is immutable. Rollback: point apps at the previous `/theme/v…` URL, or revert `current` by republishing a known-good file.

Production CSS is served from Vercel, not GitHub raw.
