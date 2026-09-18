# Orstrax agent rules

MUST: Before changing this project, read the canonical Orstrax standards in this repository:

- `./ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md`
- https://github.com/orstrax/orstrax-ui/blob/main/ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md

This repo **is** the source of truth for hosted theme, wordmark, mark, and cross-product standards.

Highest-risk rules:

- Orstrax-branded apps consume hosted CSS from this origin. Do not tell apps to copy CSS locally.
- Production apps pin a **versioned** theme URL. `/theme/current/` is not the production pin.
- Independent brands MUST NOT load this theme.
- Changing `public/assets/orstrax-wordmark.png` or a promoted theme version requires updating the canonical standards if paths/versions change.
- New cross-product conventions MUST be written into `ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md`, not only into consumer apps.

## Project addendum

```
PROJECT:              orstrax-ui (@orstrax/ui)
PRODUCT:              Orstrax UI (runtime theme + optional React primitives)
PRODUCTION URL:       https://ui.orstrax.io
HELP CENTER:          https://desk.orstrax.io/help (Desk product; this repo is not a Help Center)
BRAND TYPE:           orstrax-branded (shared infrastructure)
SHARED UI:            this repo hosts it; pinned consumer version v1.0.8
EMAIL:                none
DEPLOYMENT:           Vercel project orstrax-ui
IMPORTANT INTEGRATIONS: none (static theme/assets)
PROJECT-SPECIFIC EXCEPTIONS:
  - Not a Next.js app; no Next.js AGENTS block.
  - Optional npm package is secondary to the hosted CSS/assets.
```
