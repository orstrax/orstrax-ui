# Orstrax engineering and product standards

Canonical standard for Orstrax-owned software. Any coding agent, developer, or new repository MUST follow this file unless a project documents an explicit exception.

**Location:** `orstrax-ui/ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md`  
**GitHub:** https://github.com/orstrax/orstrax-ui/blob/main/ORSTRAX_ENGINEERING_AND_PRODUCT_STANDARDS.md

Do not copy this file into every repo. Point at it. Update **this file** when a cross-product convention changes.

Labels used below:

| Label | Meaning |
|---|---|
| **VERIFIED** | Observed in current Orstrax implementations |
| **STANDARD** | Binding rule defined here |
| **EXCEPTION** | Documented, deliberate divergence |
| **DECISION** | Owner must choose; do not guess |

Language: **MUST** / **MUST NOT** / **SHOULD** / **MAY**.

---

## 1. How to use this document

1. Read this file before changing an Orstrax project.
2. Read that project's root `AGENTS.md` addendum for product facts and exceptions.
3. If a new convention is cross-product, update **this** file. Do not quietly invent a second standard in one repo.
4. If a canonical URL, asset path, or theme version changes, update **this** file in the same change.

Ask on every new shared pattern: *Is this product-specific, or should it become an Orstrax standard?*

---

## 2. Portfolio (VERIFIED)

| Name | Role | Brand type |
|---|---|---|
| Orstrax | Company / product studio | Company |
| Orstrax Orderflow | Shopify smart order management / post-checkout workflow | Orstrax-branded product |
| Orstrax Desk | Multi-tenant help center / knowledge base / tickets | Orstrax-branded product |
| Orstrax Admin | Orstrax-wide control plane | Orstrax-branded product |
| Orstrax Product Hub | Product directory + Resources on orstrax.io | Orstrax-branded product |
| Orstrax Print Manager | macOS printer page / ink / cost tracking | Orstrax-branded product |
| Ecloras | Independent portfolio product | Independent brand |
| Financial Fern | Independent portfolio product | Independent brand |
| Sunday Maker | Independent portfolio product | Independent brand |

Orstrax is the company. Orderflow, Desk, Admin, and Print Manager are products.

**STANDARD:** In product-facing prose, once context is set, use the product name.

- GOOD: "Orderflow will send the customer…"
- BAD: "Orstrax will send the customer…" (unless you mean the company)

**STANDARD:** Do not rename infrastructure merely to match marketing terms. Repository names, legacy hostnames, and stable identifiers MAY remain.

---

## 3. Public URLs (VERIFIED)

| Surface | Canonical URL |
|---|---|
| Company | https://www.orstrax.com (also https://orstrax.com) |
| Product Hub / Resources | https://www.orstrax.io |
| Orderflow | https://orderflow.orstrax.io |
| Orderflow legacy host | https://orders.orstrax.io (redirects to Orderflow) |
| Desk app | https://desk.orstrax.io |
| Desk Help (Desk product) | https://desk.orstrax.io/help (also https://help.orstrax.io) |
| Orderflow Help | https://desk.orstrax.io/orderflow |
| Admin | https://admin.orstrax.io |
| Print Manager | https://printmanager.orstrax.io |
| Print Manager Help | https://desk.orstrax.io/print-manager |
| Shared UI | https://ui.orstrax.io |
| Desk custom-domain CNAME | `cname.desk.orstrax.io` |
| Desk inbound mail | `inbound.desk.orstrax.io` |
| Sunday Maker | https://sundaymaker.com |
| Ecloras | https://www.ecloras.com |
| Financial Fern | https://www.financialfern.com |

Desk also redirects Help slug `orders` → `orderflow`. Public copy SHOULD use `/orderflow`.

**STANDARD:** Customer-facing links MUST use these production URLs, not localhost, ngrok, Vercel preview URLs, or retired hosts such as `orders-help.orstrax.io`.

---

## 4. Shared UI / theme

**STANDARD:** Orstrax-branded products MUST use the centrally hosted theme. MUST NOT recreate, copy/paste, or locally fork the Orstrax design system.

Architecture:

```
Orstrax app → https://ui.orstrax.io → shared visual updates propagate
```

**VERIFIED canonical resources** (pin CSS; do not invent new paths):

| Resource | URL |
|---|---|
| Pinned theme (current apps) | `https://ui.orstrax.io/theme/v1.0.9/orstrax.css` |
| Promoted current | `https://ui.orstrax.io/theme/current/orstrax.css` |
| Family X | `https://ui.orstrax.io/assets/orstrax-x.png` |
| Wordmark | `https://ui.orstrax.io/assets/orstrax-wordmark.png` |
| App-icon mark | `https://ui.orstrax.io/assets/orstrax-mark.png` |
| Product-name font | `https://ui.orstrax.io/fonts/Semplicita-Bold.woff2` |

**VERIFIED env:** `NEXT_PUBLIC_ORSTRAX_UI_ORIGIN` (default `https://ui.orstrax.io`). Theme **version** is pinned in code (`ORSTRAX_THEME_VERSION = "v1.0.9"`). MUST NOT set `NEXT_PUBLIC_ORSTRAX_THEME_VERSION` in Vercel — stale env kept apps on old CSS.

**STANDARD:** Production apps MUST pin a versioned CSS URL (`/theme/vX.Y.Z/orstrax.css`). `/theme/current/` MAY be used for staging only. Bump the pin when promoting a validated orstrax-ui release.

**VERIFIED consumer pattern:** `<link rel="stylesheet" href={ORSTRAX_THEME_HREF} />`, Inter / Source Serif 4 on `<html>`, `data-orstrax-theme` on `<html>`. Product names load Semplicita Bold from the hosted theme. Nunito MAY remain for Desk tenant Help themes. Optional package: `@orstrax/ui` (`github:orstrax/orstrax-ui#v1.0.9`). Runtime CSS from the host is the source of truth; the npm package is optional React primitives.

**STANDARD:** Product-specific UI MAY stay local (Orderflow order table, Desk editor). MUST NOT invent a second Orstrax color/type/button/auth system.

**VERIFIED tokens** (from orstrax-ui `TOKENS.md`): cream `--orx-bg #f4efe6`, surface `#fffcf7`, ink `#1c1915`, muted `#6f675c`, line `#e4dcd0`, navy `#1f2a37`, accent `#2f5da8`, product name `#13293d`. UI font Inter; product-name lockups Semplicita Bold; display Source Serif 4.

---

## 5. Canonical brand assets

**STANDARD:** Orstrax products use `[hosted Orstrax X] + [product name as text]`. The X is the shared family mark. The product name identifies the product (Orderflow, Desk, Admin, Print Manager).

**STANDARD:** MUST consume the hosted X (`orstrax-x.png`) and `OrstraxProductBrand` (or the hosted `.orstrax-lockup` classes). MUST NOT redraw the X in CSS, SVG, text, or an icon library. MUST NOT create a combined logo file per product unless the owner explicitly requests it. MUST NOT recolor the X to match the product name.

**STANDARD:** Product name color is `#13293d`. Product-name font is Semplicita Bold from the hosted theme. MUST NOT put “Orstrax” beside the X in the product lockup.

The full wordmark (`orstrax-wordmark.png`) remains for company attribution (legal, email from Orstrax). The rounded mark (`orstrax-mark.png`) remains for square app icons and favicons — MUST NOT replace those with the horizontal product lockup.

Changing `public/assets/orstrax-x.png` on ui.orstrax.io SHOULD update Orstrax-branded product lockups without replacing five logos.

**EXCEPTION (current):** `orstrax.com` serves local `/orstrax%20logo%20new.png` and `/orstrax-mark.png` and uses Nunito + Newsreader, not the hosted theme. See §21.

---

## 6. Independent brands

**STANDARD:** Ecloras, Financial Fern, and Sunday Maker MUST NOT automatically inherit Orstrax typography, colors, logo, or `ui.orstrax.io` CSS.

A "A product by Orstrax" line MAY appear where intentionally designed.

**VERIFIED:** Sunday Maker app (`sunday-pour` → `sundaymaker.com`) does not load ui.orstrax.io. Ecloras and Financial Fern app repos are not on this machine.

**DECISION:** Desk tenant catalog currently applies `ORSTRAX_HELP_THEME` (Orstrax cream/navy) to Sunday Maker, Ecloras, and Financial Fern Help Centers, with tenant logos. Do not "fix" that to a different palette without owner approval.

---

## 7. Documentation: Desk vs Resources

**STANDARD:** For Orstrax-hosted products, customer Help / knowledge-base documentation belongs in **Orstrax Desk**. MUST NOT add a parallel `/docs` app or another docs SaaS unless the owner explicitly approves it.

Help answers: *How do I use this product?*  
Resources (orstrax.io) answer: *How should I solve this business problem?*

MUST NOT turn Desk into an SEO article farm. MUST NOT turn Resources into product manuals. Cross-link when genuinely useful.

**STANDARD:** A meaningful feature change is not done until documentation impact is checked:

1. Existing Desk article update?
2. New Desk article needed?
3. Screenshots?
4. UI terminology change?
5. Limitation / setting / workflow made old Help wrong?
6. Product Hub Resource update?
7. Product page or App Store copy?

For **Print Manager**, Desk articles live in `orstrax-desk/content/import/hub/print-manager/`. Changing app UX without updating those articles (and bumping `SEED_VERSION` with a migration that upserts them) leaves Help empty or stale for existing installs.

**VERIFIED Orderflow Help path:** Desk repo `content/import/hub/orders/`.  
**VERIFIED Print Manager Help path:** Desk repo `content/import/hub/print-manager/`.  
Production republish requires bumping `SEED_VERSION` in `orstrax-desk/src/lib/store/firestore.ts`.

**VERIFIED Help URLs:** Orderflow `https://desk.orstrax.io/orderflow`; Desk product `https://desk.orstrax.io/help`; Print Manager `https://desk.orstrax.io/print-manager`.

---

## 8. Documentation voice (STANDARD)

Public docs MUST sound like a helpful product team, not an engineering spec.

Prefer: "Open **Status Actions** from the sidebar."  
Not: "Navigate to the Status Actions interface."

MUST keep facts, limitations, and prerequisites. MUST NOT expose internals unless the reader needs them.

Voice: clear, practical, friendly, concise, slightly conversational, confident, factual.

MUST NOT: AI fluff, emoji spam, corporate jargon, hype, engineering commentary, database terminology.

Orderflow Help MUST call the product **Orderflow** in instructional prose; **Orstrax Orderflow** for brand identification (titles, install, SEO). Keep Shopify UI labels that still say Orstrax (for example Orstrax Order Lookup, Orstrax built-in, Orstrax status).

---

## 9. Public claims (STANDARD)

MUST verify current implementation before a public claim.

Classify uncertain capabilities: **VERIFIED** / **PARTIAL** / **PLANNED** / **INTERNAL** / **UNKNOWN**.

Only **VERIFIED** functionality SHOULD be presented as available. Conditional and third-party-dependent behavior MUST be stated as such.

MUST NOT document a feature because it is on a roadmap, in a TODO, in another product, half-built, or in an old README.

---

## 10. Third-party platform facts (STANDARD)

For Shopify, Etsy, Amazon, Walmart, eBay, Square, Firebase, Vercel, Resend, and similar: if the statement is about current external behavior, permissions, pricing, availability, limitations, or integrations, VERIFY against official docs / App Store / announcements before publishing.

MUST NOT rely on memory, blogs, or stale Help.

**VERIFIED Orderflow constraint (do not contradict without re-verifying):** Orderflow does not import marketplace orders. A connector brings compatible orders into Shopify; Orderflow then manages the post-checkout Shopify workflow to the extent the implementation supports.

---

## 11. Email

**STANDARD:** MUST use **Resend** for application/transactional email unless the project documents an approved exception.

Covers: customer notifications, verification (when app-managed), workflow, support, proof, system, transactional messages.

MUST NOT introduce SendGrid, Mailgun, Postmark, AWS SES, or custom SMTP as the **new default** because an agent prefers it.

**VERIFIED implementations:**

| Project | Pattern |
|---|---|
| Orderflow | Resend SDK + optional **merchant** SMTP (`emailProvider`: `orstrax` \| `resend` \| `smtp`). Platform from: `Orstrax Orderflow <hello@orstrax.io>`. Env: `RESEND_API_KEY`, `SMTP_*`, `FROM_EMAIL`. |
| Desk | Resend only. Env: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_INBOUND_DOMAIN`, `RESEND_WEBHOOK_SECRET`. |
| Admin | Same Resend + SMTP helper pattern as Orderflow (split leftover; confirm before changing). |
| orstrax.com | Resend HTTP API. From/to `hello@orstrax.io`. Env: `RESEND_API_KEY`. |
| Sunday Maker | Resend primary; admin UI also allows SendGrid/Postmark. **EXCEPTION.** |

**STANDARD:** Credentials MUST be environment variables. MUST NOT commit API keys. Follow the existing product's Resend module instead of rewriting a new integration.

Email provider **changes** require owner approval.

**EXCEPTION:** Orderflow merchant-configurable SMTP is a product feature, not an agent default for new apps.

---

## 12. Email content (STANDARD)

MUST: product branding, verified terminology, mobile-safe layout, sensible plain-text where the product already supports it, clear links/buttons, canonical support/help destination, canonical naming.

MUST NOT: engineering terms, stack traces, unnecessary database IDs, auth tokens, internal links, preview/dev URLs, heavy marketing in transactional mail.

---

## 13. Customer-facing copy (STANDARD)

MUST NOT expose engineering commentary to ordinary customers (Firestore listener, GraphQL mutation, tenant namespace, Firebase UID, REST endpoint, webhook worker) unless required for support/debug.

User-facing copy MUST answer: What happened? What can I do? What happens next?

Internal logs MAY stay technical.

---

## 14. URL and environment hygiene (STANDARD)

MUST NOT ship customer-facing references to localhost, ngrok, Vercel preview URLs, temporary domains, stale app names, or abandoned routes.

Production URLs SHOULD come from established constants (`orstrax-urls.ts` / `orstrax-theme.ts` / `brand.ts`) or env (`NEXT_PUBLIC_APP_URL`, `SHOPIFY_APP_URL`).

---

## 15. Do not fork shared behavior (STANDARD)

Before creating a local copy, ask whether Orstrax already has a canonical implementation: branding, theme, email, documentation, auth layout, telemetry, support/legal links, common navigation.

MUST NOT duplicate shared infrastructure just because a local copy is faster in the moment.

**STANDARD:** Shared layer MUST NOT absorb product business logic. Orderflow owns Shopify order workflows, statuses, proofs, Collect Info. Desk owns KBs, articles, tickets. Admin owns Orstrax-wide operational control.

---

## 16. Design and UX (STANDARD, Orstrax-branded)

Prefer: editorial, restrained, premium, calm, readable, functional, intentional hierarchy, cream/navy from the shared theme, serif display + sans UI as defined centrally, excellent mobile, accessible contrast, clear state.

MUST NOT: generic AI/SaaS aesthetics (gradient/glass/glow blobs, random purple, fake dashboards, decorative networks, animation without purpose). MUST NOT redesign for novelty.

UX MUST make obvious: where the user is, what happened, what needs attention, what to do next. Prefer ordinary words (Save, Cancel, Settings, Orders, Status, Customer, Search, Filter) unless a branded term is a real product concept (Update Order, Collect Info, Ship by).

---

## 17. Accessibility and mobile (STANDARD)

New UI MUST account for keyboard, focus, semantic labels, accessible controls, contrast, responsive layouts, screen-reader context where needed.

MUST NOT rely only on color for critical state. Icons MUST NOT replace labels when meaning would be ambiguous.

Every major merchant/customer flow SHOULD be checked on mobile. MUST NOT merely squeeze a desktop table. MUST NOT change business logic just to fix layout. Responsive changes MUST preserve functionality.

---

## 18. Auth, hosting, env, tests (VERIFIED)

| Concern | Current Orstrax-branded pattern |
|---|---|
| Auth | Firebase Auth; Shopify OAuth where the product is a Shopify app. No Clerk/NextAuth in these repos. |
| App hosting | Vercel |
| Data | Firebase (project `orstrax-app` for Orderflow/Admin/Hub; `orstrax-desk` for Desk) |
| Files (Orderflow) | AWS S3 (`AWS_*`) |
| Session | `SESSION_SECRET` |
| Tests | `vitest run` on Orderflow, Desk, Admin, Hub. orstrax.com and orstrax-ui: no test scripts. Sunday Maker: unit + Playwright. |
| Analytics | No GA/PostHog/Mixpanel in Orstrax app source. **UNKNOWN** whether Vercel dashboard analytics is enabled. |
| Support (Orstrax products) | `hello@orstrax.io` |
| Independent support | Sunday Maker `hello@sundaymaker.com`; Ecloras `support@ecloras.com`; Financial Fern `fern@financialfern.com` |

**STANDARD:** New Orstrax-branded apps SHOULD follow Firebase + Vercel + Resend + vitest unless the owner specifies otherwise. MUST NOT introduce a new auth/email/hosting vendor as a silent default.

Secrets MUST stay out of git. Use `.env.example` with names only.

---

## 19. New Orstrax project checklist (STANDARD)

Copy `templates/new-orstrax-project/` from this repository.

### Branding

- [ ] Orstrax-branded or independent portfolio brand?
- [ ] Canonical logo/assets (hosted wordmark for Orstrax-branded)?
- [ ] Shared theme loaded if Orstrax-branded?
- [ ] Independent brands do **not** load ui.orstrax.io?
- [ ] Product vs company naming correct?

### Infrastructure

- [ ] Production domain identified and documented?
- [ ] Env var strategy (`.env.example`, no secrets in git)?
- [ ] No temporary URLs in customer-facing copy/code?
- [ ] Hosting/deployment documented?

### Email

- [ ] Does this project send email?
- [ ] If yes: Resend unless an approved exception is written in AGENTS.md
- [ ] Sender/domain documented?

### Documentation

- [ ] Desk tenant / Help strategy?
- [ ] Help link is a production Desk URL?
- [ ] Resources impact considered?
- [ ] Support email set?

### Public content

- [ ] Product description verified against the implementation?
- [ ] SEO metadata?
- [ ] Privacy / legal / help links?
- [ ] No unsupported claims?

### UI

- [ ] Shared Orstrax CSS if applicable?
- [ ] Canonical assets?
- [ ] Mobile verified?
- [ ] Accessibility verified?

### Engineering

- [ ] Test command documented and used?
- [ ] Errors: logs technical, UI human?
- [ ] Security/secrets review?
- [ ] Root AGENTS.md with pointer to this file + addendum?

---

## 20. Repository AGENTS.md addendum (STANDARD)

Every active Orstrax-owned repo MUST have root `AGENTS.md`. Keep it short. MUST point here. MUST include:

```
PROJECT:
PRODUCT:
PRODUCTION URL:
HELP CENTER:
BRAND TYPE:           orstrax-branded | independent | company-site
SHARED UI:            yes (pinned version) | no (reason)
EMAIL:
DEPLOYMENT:
IMPORTANT INTEGRATIONS:
PROJECT-SPECIFIC EXCEPTIONS:
```

Populate from verified configuration. MUST NOT guess missing fields — write UNKNOWN.

Next.js apps MUST keep the `<!-- BEGIN:nextjs-agent-rules -->` block; `next dev` re-adds it.

---

## 21. Project-specific exceptions (VERIFIED)

| Project | Exception |
|---|---|
| Ecloras, Financial Fern, Sunday Maker | Independent brands. MUST NOT load Orstrax theme/wordmark as the product UI. |
| Sunday Maker (`sunday-pour`) | Own visual identity; Resend plus optional SendGrid/Postmark in admin; Firebase project id `sundaypour-3fb3b` (legacy, cannot rename); changelog rule in `.cursorrules`. |
| Orderflow | Merchant SMTP remains a product option. Legacy hostname `orders.orstrax.io`. Help source path still `content/import/hub/orders/`. |
| Desk | Resend-only (no SMTP). Independent-brand tenants. `help.orstrax.io` is Desk Help, not Orderflow. |
| orstrax.com | Company site; local wordmark/mark; Newsreader display font; contact via Resend; no ui.orstrax.io. **DECISION:** whether to migrate to hosted theme. |
| Hub (`orstrax/orstrax`) | Public hub/resources. Some older files still mention `orders.orstrax.io`. |
| Orderflow README | Still describes older stack in places (Next 14 / metafields / SMTP-first). Code is the source of truth until README is audited. |

---

## 22. Conflicting conventions (do not silently pick)

| Topic | A | B | What to do |
|---|---|---|
| Orderflow public host | `orderflow.orstrax.io` (current app, Shopify app URL) | `orders.orstrax.io` in older hub/monolith/firebase authorizedDomains | Use **orderflow.orstrax.io** in new copy. Keep legacy redirect. Do not delete legacy without owner approval. |
| Orderflow Help URL | `https://desk.orstrax.io/orderflow` (Orderflow, Desk, ui runtime) | Admin historically `https://desk.orstrax.io/orders` | Desk redirects `orders` → `orderflow`. New links MUST use `/orderflow`. |
| Independent Help URLs on orstrax.com | Desk: `desk.orstrax.io/ecloras`, `/financial-fern`, `/sunday-maker` | orstrax.com historically linked some Help at `orstrax.io/help/...` and Sunday Maker `/resources` | **DECISION** before changing company-site links. Sunday Maker Help chrome is `/resources` on Desk. |
| Shared CSS | Apps pin `v1.0.9` | Hub monolith checkout may not load ui.orstrax.io | Orstrax-branded surfaces SHOULD pin `v1.0.9`. |
| Email | Resend default | Orderflow SMTP option; Sunday Maker extra providers | Document; do not rip out. |

---

## 23. Owner decisions still needed

1. Should **orstrax.com** switch to hosted ui.orstrax.io theme + wordmark?
2. Should independent-brand **Desk Help** chrome keep Orstrax cream tokens or use each product's own visual identity?
3. Canonical company Help links for Ecloras / Financial Fern / Sunday Maker on orstrax.com vs Desk paths.
4. Whether production **analytics** should be standardized (none in app source today).
5. Whether Hub `orstrax/orstrax` `main` is the live hub deploy vs worktree/branch (`orstrax-hub-resources`).
6. Whether ui.orstrax.io README "until DNS is attached" is still accurate (apps already default to that origin).

---

## 24. Support and legal (VERIFIED)

| Brand | Support |
|---|---|
| Orstrax products | hello@orstrax.io |
| Sunday Maker | hello@sundaymaker.com |
| Ecloras | support@ecloras.com |
| Financial Fern | fern@financialfern.com |

Orderflow legal pages exist at `https://orderflow.orstrax.io/privacy` and `/terms`, and also link `https://orstrax.com/privacy` and `/terms`.

**STANDARD:** Use the product's documented support address. MUST NOT use `support@example.com` except in non-shipped template previews.

---

## 25. Starter

Reusable files (not an application framework): `templates/new-orstrax-project/` in this repo.
