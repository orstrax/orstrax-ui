# Orstrax Monorepo Audit Report

**Repository:** `orstrax/orstrax`  
**Audit Date:** September 6, 2026  
**Current State:** Single monolithic Next.js app serving three distinct surfaces

---

## Executive Summary

The `orstrax/orstrax` repository currently contains **THREE distinct product surfaces** that should be split into independent repositories:

1. **Orstrax Orders** (Shopify app) → `orstrax/orstrax-orders`
2. **Orstrax Admin** (company control plane) → `orstrax/orstrax-admin`  
3. **Orstrax Product Hub** (public hub) → `orstrax/orstrax` (keep name)

**Current Issues:**
- Single Vercel deployment for all three surfaces
- Shared environment variables (security concern)
- Monolithic build (Orders change triggers Hub rebuild)
- Mixed authentication boundaries
- Unclear ownership
- Deploy coupling

---

## Current Repository Structure

### Root Files
```
orstrax/
├── package.json           # Single package.json for all surfaces
├── next.config.ts         # Shared Next.js config
├── shopify.app.toml       # Shopify Orders app config
├── shopify.app.iu.toml    # Shopify theme extension
├── firebase.json          # Firebase config (Orders)
├── firestore.rules        # Firestore security rules (Orders)
├── firestore.indexes.json # Firestore indexes (Orders)
├── storage.rules          # Firebase Storage rules (Orders)
├── prisma/                # Database schema (if used)
├── extensions/            # Shopify Theme App Extension
└── src/
    ├── app/
    │   ├── dashboard/     # Orders merchant dashboard
    │   ├── hub/           # Product Hub routes
    │   ├── orstrax-admin/ # Orders-specific admin (OLD)
    │   ├── platform/      # Company control plane (NEW)
    │   ├── api/
    │   │   ├── orders/    # Orders APIs
    │   │   ├── shopify/   # Shopify APIs
    │   │   ├── orstrax-admin/ # Orders admin APIs
    │   │   ├── platform/  # Platform admin APIs
    │   │   └── hub/       # Hub APIs
    │   └── ...
    ├── components/
    │   ├── dashboard/     # Orders components
    │   ├── platform-admin/ # Platform admin components
    │   ├── hub/           # Hub components
    │   └── ...
    └── lib/
        ├── platform/      # Platform logic
        ├── hub/           # Hub logic
        └── ...
```

---

## Surface #1: ORSTRAX ORDERS (Shopify App)

### Target Repository
**`orstrax/orstrax-orders`**

### Target Domain
**`orders.orstrax.io`**

### Description
Shopify-connected order management app for merchants. Handles custom statuses, templates, proofs, files, team, billing, webhooks.

### Current Routes

#### Public Routes
- `/` - Auth/login (Shopify OAuth entry)
- `/api/auth/*` - Shopify OAuth callback
- `/api/webhooks/*` - Shopify webhooks
- `/order-lookup` - Public order status lookup
- `/widget` - Embeddable widget
- `/proof/[token]` - Customer proof viewing
- `/info/[token]` - Information request viewing  
- `/m/[id]` - Short link redirects

#### Merchant Dashboard
- `/dashboard` - Orders dashboard (main app)
- `/dashboard/orders` - Order management
- `/dashboard/orders/[id]` - Order detail
- `/dashboard/statuses` - Status configuration
- `/dashboard/status-actions` - Status action configuration
- `/dashboard/templates` - Email template management
- `/dashboard/forms` - Form builder
- `/dashboard/website-form` - Website form designer
- `/dashboard/widget` - Widget designer
- `/dashboard/automations` - Automation rules
- `/dashboard/activity` - Activity log
- `/dashboard/settings` - Merchant settings

#### Orders Admin (DEPRECATED - to remove)
- `/orstrax-admin` - Orders-specific super admin
- `/orstrax-admin/login` - Admin login
- `/orstrax-admin/(console)/*` - Admin console
  - `/stores` - Store list
  - `/analytics` - Orders analytics
  - `/health` - Health monitoring
  - `/audit` - Audit log
  - `/admins` - Admin user management

### API Routes (Orders)
- `/api/orders/*` - Order CRUD
- `/api/statuses/*` - Status management
- `/api/templates/*` - Template management
- `/api/form-config/*` - Form configuration
- `/api/shortcodes/*` - Shortcode rendering
- `/api/proofs/*` - Proof management
- `/api/information-requests/*` - Info request management
- `/api/media/*` - File/image uploads
- `/api/upload-image/*` - Image uploads
- `/api/upload-logo/*` - Logo uploads
- `/api/widget/*` - Widget configuration
- `/api/widget-test/*` - Widget testing
- `/api/lookup-order/*` - Order lookup
- `/api/automations/*` - Automation rules
- `/api/activity/*` - Activity tracking
- `/api/settings/*` - Merchant settings
- `/api/saved-views/*` - Saved view configuration
- `/api/team/*` - Team management
- `/api/roles/*` - Role management
- `/api/billing/*` - Billing/subscription
- `/api/sync/*` - Shopify sync
- `/api/stores/*` - Store management
- `/api/onboarding/*` - Onboarding flow
- `/api/shopify/*` - Shopify API proxy
- `/api/app-embed/*` - App embed configuration
- `/api/auth/*` - Authentication
- `/api/email/*` - Email sending
- `/api/test-connection/*` - Connection testing
- `/api/webhooks/*` - Webhook handlers
- `/api/orstrax-admin/*` - Orders admin APIs (to remove)

### Components (Orders)
- `/components/dashboard/*` - Dashboard UI
- `/components/proofs/*` - Proof components
- `/components/status-actions/*` - Status action components  
- `/components/settings/*` - Settings components
- `/components/activity/*` - Activity components
- `/components/onboarding/*` - Onboarding components

### Dependencies (Orders-Specific)
- Firebase (firestore, auth, storage)
- Firebase Admin SDK
- AWS S3 (file storage)
- Nodemailer / Resend (email)
- Shopify API libraries
- TipTap (rich text editor)

### Configuration Files
- `shopify.app.toml` - Shopify app config
- `shopify.app.iu.toml` - Theme extension config
- `firebase.json` - Firebase config
- `firestore.rules` - Security rules
- `firestore.indexes.json` - Firestore indexes
- `storage.rules` - Storage rules
- `extensions/` - Theme App Extension

### Environment Variables (Orders)
```bash
# Shopify
SHOPIFY_API_KEY
SHOPIFY_API_SECRET
SHOPIFY_APP_URL=https://orders.orstrax.io

# Firebase
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_STORAGE_BUCKET

# AWS S3
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET

# Email
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
FROM_EMAIL
# OR
RESEND_API_KEY

# Auth
NEXTAUTH_SECRET
NEXTAUTH_URL
```

---

## Surface #2: ORSTRAX ADMIN (Company Control Plane)

### Target Repository
**`orstrax/orstrax-admin`**

### Target Domain
**`admin.orstrax.io`**

### Description
Company-wide super-admin control plane. Multi-product health monitoring, user activity, analytics across Desk, Orders, etc. **NOT Orders-specific.**

### Current Routes
- `/platform` - Platform overview (company dashboard)
- `/platform/login` - Platform admin login
- `/platform/(console)/*` - Admin console
  - `/` - Company overview
  - `/products` - All products
  - `/products/[product]` - Product detail (Desk, Orders, etc.)
  - `/products/desk/tenants/[id]` - Desk tenant detail
  - `/analytics` - Cross-product analytics
  - `/health` - Cross-product health
  - `/users` - Cross-product user management

### API Routes (Platform)
- `/api/platform/*` - Platform APIs
  - `/api/platform/overview` - Company overview data
  - (other platform endpoints)

### Components (Platform)
- `/components/platform-admin/*` - Platform admin UI
  - Health badges
  - Product cards
  - KPI cards
  - Help tips
  - Activity charts

### Configuration
This surface reads from other products via **secure backend APIs** (adapters). It does not directly query Orders or Desk databases from the browser.

### Dependencies (Platform-Specific)
- Firebase Admin SDK (for auth verification)
- Adapter libraries for each product

### Environment Variables (Platform)
```bash
# Platform Admin Auth
PLATFORM_ADMIN_AUTH_SECRET
FIREBASE_PROJECT_ID       # For verifying admin tokens
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY

# Product Adapter Credentials
# (Service account keys for querying Orders, Desk, etc. via backend)
ORDERS_SERVICE_ACCOUNT_KEY
DESK_SERVICE_ACCOUNT_KEY
```

---

## Surface #3: ORSTRAX PRODUCT HUB

### Target Repository
**`orstrax/orstrax`** (keep this name)

### Target Domain
**`orstrax.io`**

### Description
Public product directory. Lists Orstrax products (Desk, Orders, Ecloras, Financial Fern, Sunday Maker), help resources, docs, changelog, contact.

### Current Routes
- `/hub` - Product Hub homepage
- `/hub/products` - Product directory
- `/hub/docs` - Documentation
- `/hub/help` - Help resources
- `/hub/changelog` - Product changelog
- `/hub/contact` - Contact form
- `/hub/privacy` - Privacy policy
- `/hub/terms` - Terms of service
- `/hub/search` - Search functionality

### API Routes (Hub)
- `/api/hub/*` - Hub-specific APIs (if any)
- `/api/public/*` - Public APIs

### Components (Hub)
- `/components/hub/*` - Hub UI components
- `/components/brand/*` - Shared branding (migrate to `@orstrax/ui`)

### Dependencies (Hub-Specific)
- Minimal backend dependencies
- Content management (MDX or CMS)

### Environment Variables (Hub)
```bash
# Minimal - mostly public content
NEXT_PUBLIC_HUB_API_URL (if needed)
```

---

## Shared Code Analysis

### Candidates for `@orstrax/ui` Package

These components should be extracted to the shared `@orstrax/ui` package:

1. **Branding**
   - `/components/brand/*` - Orstrax wordmark, product brand treatment
   - Already exists in `@orstrax/ui` ✅

2. **Layout**
   - Auth layout patterns (if reusable)
   - Common page shells

3. **UI Components**
   - Buttons, inputs, forms (already using Radix/ShadCN)
   - Consider: Are these generic enough or product-specific?

### DO NOT Move to Shared Package

- Business logic (order management, status workflows, etc.)
- Product-specific components (order cards, proof viewers, etc.)
- Database access layers
- API clients
- Authentication logic (product-specific)

---

## Dependency Map

### Orders Dependencies
```
Orders
├── Shopify API (critical)
├── Firebase (firestore, auth, storage)
├── AWS S3 (files)
├── Email service (SMTP/Resend)
├── Theme App Extension
└── OAuth webhooks
```

### Platform Admin Dependencies
```
Platform Admin
├── Firebase Admin SDK (auth verification)
├── Product adapters
│   ├── Orders adapter (backend API)
│   ├── Desk adapter (backend API)
│   └── ... other products
└── Cross-product aggregation logic
```

### Product Hub Dependencies
```
Product Hub
├── Content (MDX, CMS, or static)
├── Public assets
└── Minimal backend
```

### Critical Coupling Points

1. **Shopify OAuth URLs**
   - Currently: `https://orders.orstrax.io/api/auth/callback`
   - Must stay the same after split
   - **Risk**: High - breaks auth if changed

2. **Webhooks**
   - Currently: `https://orders.orstrax.io/api/webhooks/*`
   - Must stay the same
   - **Risk**: High - breaks sync if changed

3. **Theme App Extension**
   - Embedded in Shopify themes
   - Points to Orders URLs
   - **Risk**: Medium - affects customer-facing features

4. **Admin Route Migration**
   - Old: `/orstrax-admin` (Orders-specific, deprecated)
   - New: `/platform` → `admin.orstrax.io`
   - **Action**: Redirect old URLs to new domain

---

## Authentication Boundaries

### Orders Authentication
**Current:**
- Shopify OAuth for merchants
- Firebase auth for standalone users (staff)
- Session-based auth

**After Split:**
- Keep identical
- No changes to merchant auth flow
- Internal session management stays in Orders

### Platform Admin Authentication
**Current:**
- Separate platform admin authentication
- Platform admin role checks
- Independent of Orders merchant auth

**After Split:**
- Stays independent
- Admin users are NOT Orders merchants
- Separate login flow at `admin.orstrax.io/login`

### Product Hub Authentication
**Current:**
- Mostly public
- No authentication required

**After Split:**
- Stays public
- No auth needed

---

## Data/Database Boundaries

### Orders Data
- **Firebase Firestore**: Orders, statuses, templates, forms, proofs, etc.
- **Firebase Storage**: File uploads
- **Shopify Metafields**: Some data persisted in Shopify
- **Shopify Orders**: Source of truth for order data

**After Split:**
- Orders repo owns this data
- Platform Admin reads via backend API (adapter)
- Product Hub has NO access

### Platform Admin Data
- Reads aggregated data from multiple products
- Does NOT own primary data
- Uses secure backend adapters

**After Split:**
- Admin repo queries via service accounts
- No direct database access from browser
- Backend-only data aggregation

### Product Hub Data
- Static content (products, docs, help)
- No private data

**After Split:**
- Static or CMS-based
- No access to Orders or Desk data

---

## Environment Variable Audit

### Current (Mixed)
The current repo likely has a large `.env` with secrets for all three surfaces mixed together.

### After Split

#### Orders (` orders.orstrax.io`)
```bash
SHOPIFY_API_KEY
SHOPIFY_API_SECRET
SHOPIFY_APP_URL
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
SMTP_USER
SMTP_PASS
NEXTAUTH_SECRET
```

#### Platform Admin (`admin.orstrax.io`)
```bash
PLATFORM_ADMIN_AUTH_SECRET
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
ORDERS_SERVICE_ACCOUNT_KEY
DESK_SERVICE_ACCOUNT_KEY
```

#### Product Hub (`orstrax.io`)
```bash
# Minimal - mostly public
NEXT_PUBLIC_CMS_API_URL (if using CMS)
```

**CRITICAL**: Do NOT copy all secrets to all projects. Use least privilege.

---

## Shopify Configuration Impact

### Current Shopify App Settings
- **App Name**: "Orstrax Order Management"
- **Client ID**: `c4348cff07727c74f56b1c32b98f2851`
- **App URL**: `https://orders.orstrax.io`
- **Redirect URLs**: `https://orders.orstrax.io/api/auth/callback`
- **Embedded**: `false`

### After Split: **NO CHANGE REQUIRED**

The public-facing URL stays `orders.orstrax.io`. We're only changing the infrastructure behind it (Vercel project, repo structure).

**Action Items:**
1. ✅ Verify redirect URLs still point to `orders.orstrax.io`
2. ✅ Verify webhook URLs still point to `orders.orstrax.io/api/webhooks/*`
3. ✅ Test OAuth flow after Vercel project switch
4. ✅ Test Theme App Extension still loads correctly
5. ✅ Monitor Shopify App Store listing (should be unaffected)

---

## Vercel Configuration

### Current (Single Project)
One Vercel project serves all three surfaces at different routes.

### After Split (Three Projects)

#### Project 1: `orstrax-orders`
- **Domain**: `orders.orstrax.io`
- **Repo**: `orstrax/orstrax-orders`
- **Build**: `npm run build`
- **Env Vars**: Orders-specific only

#### Project 2: `orstrax-admin`
- **Domain**: `admin.orstrax.io`
- **Repo**: `orstrax/orstrax-admin`
- **Build**: `npm run build`
- **Env Vars**: Platform-specific only

#### Project 3: `orstrax-hub`
- **Domain**: `orstrax.io`
- **Repo**: `orstrax/orstrax`
- **Build**: `npm run build`
- **Env Vars**: Hub-specific only

---

## Risks & Mitigation

### HIGH RISK: Shopify OAuth/Webhooks
**Risk**: Breaking merchant authentication  
**Mitigation**:
- Keep `orders.orstrax.io` domain unchanged
- Test OAuth flow in preview before production
- Monitor webhook deliveries after cutover
- Keep Shopify App Store listing unchanged

### MEDIUM RISK: Theme App Extension
**Risk**: Customer-facing widget breaks  
**Mitigation**:
- Test extension in preview
- Verify embed URLs resolve correctly
- Test on development store before production

### MEDIUM RISK: Data Migration
**Risk**: Accidentally creating new databases  
**Mitigation**:
- **DO NOT** create new Firebase projects
- Use existing Firebase connection strings
- Verify Firestore data accessible after split

### LOW RISK: DNS/SSL
**Risk**: SSL certificate issues during cutover  
**Mitigation**:
- Let Vercel auto-provision certificates
- Test preview URLs first
- Coordinate DNS changes carefully

### LOW RISK: Admin URL Migration
**Risk**: Bookmarked `/orstrax-admin` URLs break  
**Mitigation**:
- Add redirects from old URLs to `admin.orstrax.io`
- Communicate change to admin users
- Keep redirect in Orders repo for transition period

---

## Git History Strategy

### Option A: Preserve Full History (Recommended)
Use `git filter-repo` to extract subdirectories with history.

**Pros:**
- Full commit history preserved
- Git blame works
- Easier to track changes

**Cons:**
- More complex setup
- Larger initial repositories

**Commands:**
```bash
# Extract Orders
git clone orstrax orstrax-orders
cd orstrax-orders
git filter-repo --path src/app/dashboard/ --path src/app/api/orders/ ... (all Orders paths)

# Extract Admin
git clone orstrax orstrax-admin
cd orstrax-admin
git filter-repo --path src/app/platform/ --path src/components/platform-admin/ ...

# Clean Hub (remove Orders and Admin)
cd orstrax
git filter-repo --invert-paths --path src/app/dashboard/ --path src/app/api/orders/ ...
```

### Option B: Clean Slate
Copy files without history, fresh `git init`.

**Pros:**
- Simpler
- Cleaner history
- Smaller repos

**Cons:**
- Lose commit history
- Git blame doesn't work for old code

**Not recommended** for production code with active development.

---

## Migration Plan Overview

### Phase 1: Audit & Planning ✅ (Current)
1. ✅ Audit repository structure
2. ✅ Create boundary map
3. ✅ Identify dependencies
4. ✅ Document risks

### Phase 2: Repository Creation
1. Create `orstrax/orstrax-orders`
2. Create `orstrax/orstrax-admin`
3. Extract code with history preservation
4. Set up independent builds
5. Create PRs for review

### Phase 3: Vercel Setup
1. Create three Vercel projects
2. Configure environment variables (least privilege)
3. Deploy preview builds
4. Test each surface thoroughly

### Phase 4: Testing
1. Test Orders OAuth flow
2. Test Orders webhooks
3. Test Theme App Extension
4. Test Platform Admin authentication
5. Test Product Hub content
6. E2E testing for all surfaces

### Phase 5: Cutover
1. Attach production domains to new Vercel projects
2. Remove domains from old project
3. Monitor for errors
4. Add redirects for old URLs

### Phase 6: Cleanup
1. Remove extracted code from old locations
2. Update documentation
3. Archive old Vercel project
4. Celebrate! 🎉

---

## Estimated Complexity

### Repository Split: **Medium-High**
- Code extraction with history: 2-4 hours
- Testing builds: 1-2 hours

### Vercel Migration: **Medium**
- Project creation: 30 minutes
- Environment variable migration: 1-2 hours
- Domain configuration: 30 minutes

### Testing: **High**
- Orders E2E: 2-3 hours
- Platform Admin E2E: 1-2 hours
- Hub E2E: 30 minutes
- Shopify integration testing: 2-3 hours

### Total Estimated Time: **12-18 hours** of focused work

---

## Next Steps

1. **Review this audit** with stakeholders
2. **Get approval** for repository split
3. **Schedule migration** (low-traffic window)
4. **Execute Phase 2** (repository creation)
5. **Coordinate with team** for Vercel access

---

## Questions for Stakeholders

1. Are there any other surfaces hidden in this repo?
2. Are there cron jobs or scheduled tasks to migrate?
3. Are there any external integrations pointing to specific URLs?
4. Is there a staging/development environment to test first?
5. Who needs access to each new repository?
6. Should we archive the old monorepo or keep it?

---

**Status**: Audit complete, ready for Phase 2 execution.
