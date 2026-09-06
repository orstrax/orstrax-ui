# Migration Checklist for Consumer Apps

## Status: ✅ orstrax-ui Ready - v0.1.1 Released

**Release:** https://github.com/orstrax/orstrax-ui/releases/tag/v0.1.1

---

## Consumer Apps Ready to Migrate

### Priority Order

1. **Orstrax Orders** (migrate first - validate package)
2. **Orstrax Admin** (migrate second)
3. **Orstrax Product Hub** (migrate third)
4. **Orstrax Desk** (migrate last - it's the visual source)

---

## Pre-Migration Checklist

For each consumer app, complete these steps:

### 1. ✅ Verify Access

- [ ] Repository exists
- [ ] You have write access
- [ ] Can create branches and PRs

### 2. ✅ Document Current State

Take screenshots of:
- [ ] Login page
- [ ] Main dashboard/home page
- [ ] Navigation elements
- [ ] Form inputs and buttons
- [ ] Empty states
- [ ] Mobile responsive views

These will be used to verify visual consistency after migration.

### 3. ✅ Install Package

```bash
cd /path/to/orstrax-orders  # or admin, product-hub, desk

npm install github:orstrax/orstrax-ui#v0.1.1
```

Verify installation:

```bash
ls -la node_modules/@orstrax/ui/dist/
# Should see: index.js, index.mjs, styles.css, orstrax-wordmark-*.png
```

### 4. ✅ Setup Renovate

Create `.github/renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": false,
      "labels": ["dependencies", "ui-update"]
    },
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "labels": ["dependencies", "ui-update", "breaking-change"]
    }
  ],
  "schedule": ["every weekend"],
  "timezone": "America/New_York"
}
```

Install Renovate app: https://github.com/apps/renovate

---

## Migration Steps

### Step 1: Create Feature Branch

```bash
git checkout -b migrate-to-shared-ui
```

### Step 2: Import Styles

In your root layout or main CSS file:

```tsx
// app/layout.tsx or pages/_app.tsx
import "@orstrax/ui/styles.css";
```

### Step 3: Migrate Login/Auth Pages

**Before:**

```tsx
// Custom auth layout
function LoginPage() {
  return (
    <div className="auth-layout">
      <div className="brand">
        <img src="/wordmark.png" alt="Orstrax" />
        <span>Desk</span>
      </div>
      <h1>Welcome back</h1>
      {/* form */}
    </div>
  );
}
```

**After:**

```tsx
import { AuthLayout } from "@orstrax/ui";
import Link from "next/link";

function LoginPage() {
  return (
    <AuthLayout
      productName="Desk"  // or "Orders", "Admin", "Product Hub"
      tagline="Your product tagline"
      title="Welcome back."
      LinkComponent={Link}
      brandHref="/"
    >
      {/* form */}
    </AuthLayout>
  );
}
```

### Step 4: Migrate Form Components

**Before:**

```tsx
<input 
  type="email" 
  className="custom-input"
  placeholder="Email"
/>
<button className="primary-button">
  Sign in
</button>
```

**After:**

```tsx
import { Input, FormField, PrimaryButton } from "@orstrax/ui";

<FormField label="Email" htmlFor="email">
  <Input 
    id="email"
    type="email"
    placeholder="Email"
  />
</FormField>

<PrimaryButton type="submit">
  Sign in
</PrimaryButton>
```

### Step 5: Migrate Product Branding

**Before:**

```tsx
<div className="brand">
  <img src="/orstrax-wordmark.png" alt="Orstrax" />
  <span className="product-name">Desk</span>
</div>
```

**After:**

```tsx
import { OrstraxProductBrand } from "@orstrax/ui";
import Link from "next/link";

<OrstraxProductBrand 
  productName="Desk"
  size="md"
  href="/"
  LinkComponent={Link}
/>
```

### Step 6: Remove Duplicated Assets

After migration:

```bash
# Remove duplicated wordmark
rm public/orstrax-wordmark.png
rm src/assets/orstrax-wordmark.png

# Remove duplicated CSS tokens (if you extracted them)
rm src/styles/orstrax-tokens.css
```

### Step 7: Test Locally

```bash
npm run dev
```

**Visual Checklist:**

- [ ] Login page looks identical to screenshots
- [ ] Brand/wordmark renders correctly
- [ ] Forms render correctly
- [ ] Buttons have correct styling
- [ ] Mobile responsive layout works
- [ ] Navigation works
- [ ] No console errors

### Step 8: Build and Test

```bash
npm run build
npm run start
```

Verify production build works.

### Step 9: Create PR

```bash
git add -A
git commit -m "Migrate to shared @orstrax/ui package

- Install @orstrax/ui from GitHub (v0.1.1)
- Replace custom auth layout with shared AuthLayout
- Replace custom brand component with OrstraxProductBrand
- Replace form components with shared components
- Remove duplicated wordmark asset
- Add Renovate config for automatic updates

Visual appearance unchanged - validated against screenshots."

git push origin migrate-to-shared-ui

gh pr create \
  --title "Migrate to shared @orstrax/ui package" \
  --body "See MIGRATION_CHECKLIST.md for details"
```

### Step 10: Review and Merge

- [ ] CI passes (build, lint, tests)
- [ ] Visual review (compare to screenshots)
- [ ] Test on staging environment
- [ ] Merge to main
- [ ] Verify production deployment

---

## Post-Migration

### Verify Renovate Works

After migration, test the update flow:

1. Wait for next `orstrax-ui` release (or create a test release)
2. Verify Renovate creates a PR
3. Review and merge

### Monitor for Issues

Watch for:
- Visual regressions
- Build failures
- Performance issues
- TypeScript errors

### Document Migration

Add to your repo's README:

```markdown
## Shared UI

This app uses the shared Orstrax UI design system:

- **Package:** `@orstrax/ui`
- **Repository:** https://github.com/orstrax/orstrax-ui
- **Version:** Check `package.json`

Updates are managed automatically via Renovate.
```

---

## Troubleshooting

### Build fails with "Cannot find module @orstrax/ui"

**Solution:** Ensure package is installed:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles don't apply

**Solution:** Import the CSS:

```tsx
import "@orstrax/ui/styles.css";
```

### TypeScript errors

**Solution:** The package includes types. If you see errors, check:

```bash
ls node_modules/@orstrax/ui/dist/index.d.ts
```

If missing, reinstall:

```bash
npm install github:orstrax/orstrax-ui#v0.1.1 --force
```

### Wordmark doesn't load

**Solution:** The wordmark is bundled in the package. Check browser network tab:

- Should see request to `/[hash]/orstrax-wordmark-*.png`
- Should return 200 OK

If 404, rebuild:

```bash
rm -rf node_modules/@orstrax/ui
npm install
```

### Vercel build fails

**Solution:** Ensure `package.json` has the correct format:

```json
{
  "dependencies": {
    "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
  }
}
```

Not:

```json
"@orstrax/ui": "orstrax/orstrax-ui#v0.1.1"  // ❌ Missing "github:"
```

---

## Rollback Plan

If migration causes issues:

```bash
# Create rollback branch
git checkout -b rollback-shared-ui

# Remove package
npm uninstall @orstrax/ui

# Restore old components
git revert <migration-commit-sha>

# Or restore from backup
git checkout main~1 -- src/components/auth/
git checkout main~1 -- public/orstrax-wordmark.png

# Commit and deploy
git add -A
git commit -m "Rollback: Revert shared UI migration"
git push origin rollback-shared-ui

gh pr create --title "Rollback shared UI migration"
```

---

## Migration Progress

### ✅ Completed

- [x] `orstrax-ui` package created
- [x] v0.1.1 released
- [x] GitHub dependency tested and verified
- [x] Release workflow configured
- [x] Documentation complete

### ⏳ Pending

- [ ] **Orstrax Orders** - Not yet started
- [ ] **Orstrax Admin** - Not yet started
- [ ] **Orstrax Product Hub** - Not yet started
- [ ] **Orstrax Desk** - Not yet started

### 🚫 Excluded

- [ ] Ecloras (different brand)
- [ ] Financial Fern (different brand)
- [ ] Sunday Maker (different brand)

---

## Success Criteria

Migration is successful when:

- ✅ App builds without errors
- ✅ Visual appearance matches pre-migration screenshots
- ✅ No console errors in browser
- ✅ Mobile responsive layout works
- ✅ Forms and buttons function correctly
- ✅ Navigation works
- ✅ Vercel deployment succeeds
- ✅ Renovate config installed and working
- ✅ Duplicated assets removed

---

## Questions?

- **Package docs:** https://github.com/orstrax/orstrax-ui
- **Installation guide:** https://github.com/orstrax/orstrax-ui/blob/main/CONSUMER_SETUP.md
- **Distribution docs:** https://github.com/orstrax/orstrax-ui/blob/main/DISTRIBUTION.md
- **Issues:** https://github.com/orstrax/orstrax-ui/issues
