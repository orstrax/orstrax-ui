# Orstrax agent rules

MUST: Before changing this project, read the canonical Orstrax standards:

- https://github.com/orstrax/orstrax-ui/blob/main/ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md
- Local sibling (if present): `../orstrax-ui/ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md`

Keep this file short. Product exceptions belong in the addendum below, not as a second copy of the standard.

Highest-risk rules:

- Orstrax-branded products MUST load hosted `ui.orstrax.io` CSS. MUST NOT copy or fork the theme.
- MUST use the hosted wordmark/mark. Lockup = wordmark image + product name text.
- Independent brands (Ecloras, Financial Fern, Sunday Maker) MUST NOT load the Orstrax theme.
- Customer Help belongs in Orstrax Desk. Feature work is not done until Help/Resources/marketing impact is checked.
- MUST use Resend for application email unless this addendum documents an approved exception.
- Public claims MUST match verified product behavior.
- Customer-facing copy MUST NOT expose engineering internals.

<!-- If this is a Next.js app, keep the nextjs-agent-rules block that `next dev` manages. -->

## Project addendum

```
PROJECT:
PRODUCT:
PRODUCTION URL:
HELP CENTER:
BRAND TYPE:           orstrax-branded | independent | company-site
SHARED UI:
EMAIL:
DEPLOYMENT:
IMPORTANT INTEGRATIONS:
PROJECT-SPECIFIC EXCEPTIONS:
```
