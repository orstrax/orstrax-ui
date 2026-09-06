# Distribution Setup Report

## Decision Summary

**Distribution Method:** ✅ **Public GitHub Dependency with Semantic Version Tags**

**Repository:** `https://github.com/orstrax/orstrax-ui` (PUBLIC)

---

## 1. Distribution Choice: GitHub Dependency

### Why GitHub Dependency?

✅ **Zero authentication required** - Public repo, no tokens  
✅ **Works everywhere** - npm, Vercel, CI, local dev  
✅ **Simple** - No npm account/token management  
✅ **Versioned** - Git tags = semantic versions  
✅ **Tested and verified** - Confirmed working in test environment  

### Installation Format

```json
{
  "dependencies": {
    "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
  }
}
```

### Why NOT npm?

npm publishing would require:
- npm account setup
- Token management (even with OIDC)
- @orstrax scope configuration
- Additional service dependency

**Benefit:** Slightly faster installs (negligible for small package)  
**Cost:** Authentication complexity  
**Decision:** Not worth it for a public design system

---

## 2. Authentication Required: NONE

| Operation | Token Required? |
|-----------|-----------------|
| Install package locally | ❌ No |
| Install in Vercel | ❌ No |
| Install in GitHub Actions | ❌ No |
| Renovate dependency updates | ❌ No |
| Dependabot updates | ❌ No |
| Release creation | ❌ No (uses `GITHUB_TOKEN`) |

**The repository is public. Zero authentication needed anywhere.**

---

## 3. Version Management: Semantic Tags

### Format

- `v0.1.1` - Patch release (bug fixes)
- `v0.2.0` - Minor release (new features)
- `v1.0.0` - Major release (breaking changes)

### Release Flow

```
1. Make changes in feature branch
2. Bump version in package.json (e.g., 0.1.1 → 0.2.0)
3. Create PR and merge to main
4. GitHub Actions automatically:
   ✅ Builds and tests
   ✅ Creates git tag (v0.2.0)
   ✅ Creates GitHub Release
5. Done!
```

### Workflow File

`.github/workflows/release.yml` - Handles automatic release creation

**No manual steps required after merge.**

---

## 4. Consumer Update Process: Renovate

### Setup in Consumer Repos

Each consumer app (Desk, Orders, Admin, Product Hub) should add:

**Option A: Renovate (Recommended)**

File: `.github/renovate.json`

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["patch", "minor"],
      "labels": ["ui-update"]
    },
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["major"],
      "labels": ["ui-update", "breaking-change"]
    }
  ]
}
```

Install: https://github.com/apps/renovate

**Option B: Dependabot**

File: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### What Happens

```
New release (v0.2.0) created in orstrax-ui
    ↓
Renovate detects new tag
    ↓
Creates PR in consumer app:
  "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
                              ↓
  "@orstrax/ui": "github:orstrax/orstrax-ui#v0.2.0"
    ↓
Consumer CI runs (build, lint, tests)
    ↓
Review and merge
    ↓
Vercel auto-deploys
```

**Frequency:** Weekly (configurable)  
**Auto-merge:** Disabled (requires human review for safety)

---

## 5. Vercel Installation: Works Out of the Box

### Vercel Build Process

```bash
1. Vercel runs: npm ci
2. npm clones: github:orstrax/orstrax-ui#v0.2.0
3. npm runs "prepare" script (builds dist/)
4. Consumer build continues with built package
5. Deploy
```

### No Special Configuration

Your existing `vercel.json` works as-is:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci"
}
```

### No Secrets Required

Since the repo is public, Vercel needs no `GITHUB_TOKEN` or npm tokens.

---

## 6. Rollback Process

### If a Release is Bad

**Consumer side (e.g., Desk):**

```bash
# Current broken version
"@orstrax/ui": "github:orstrax/orstrax-ui#v0.3.0"

# Roll back to previous
npm install github:orstrax/orstrax-ui#v0.2.0

# Commit and deploy
git add package.json package-lock.json
git commit -m "Rollback @orstrax/ui to v0.2.0"
git push
```

**Package side (orstrax-ui):**

```bash
# Fix the bug
git revert <bad-commit>

# Bump to v0.3.1
# Edit package.json: "version": "0.3.1"

# Merge to main
# GitHub Actions creates v0.3.1 release

# Consumers update when ready
```

### Deployed Apps Continue Working

Even if:
- `orstrax-ui` repo is down
- GitHub has an outage
- A bad release is published

**Your deployed apps keep running** because `node_modules` are bundled in the build.

Only **new deployments** would fail until recovery/rollback.

---

## 7. Migration Status

### Package Status

✅ **orstrax-ui** - Published and ready (v0.1.1)

### Consumer Apps

**Not yet migrated:**

- ⏳ **Orstrax Desk** - Will migrate LAST (it's the visual source of truth)
- ⏳ **Orstrax Orders** - Ready to migrate FIRST (validate package)
- ⏳ **Orstrax Admin** - Ready to migrate second
- ⏳ **Orstrax Product Hub** - Ready to migrate third

**Not using this package (different brands):**

- ❌ **Ecloras** - Independent brand
- ❌ **Financial Fern** - Independent brand
- ❌ **Sunday Maker** - Independent brand

### Why Desk Migrates Last

Desk is the **canonical visual reference**. Other Orstrax products should migrate first to:

1. Validate the package works in real consumers
2. Prove the shared UI matches Desk's current look
3. Avoid circular visual drift
4. Keep Desk as the stable reference during migration

---

## 8. Canonical Wordmark

### Location

```
orstrax-ui/
└── src/
    └── assets/
        └── orstrax-wordmark.png
```

### Usage in Consumer Apps

```tsx
import { OrstraxProductBrand } from "@orstrax/ui";

// Desk
<OrstraxProductBrand productName="Desk" />

// Orders
<OrstraxProductBrand productName="Orders" />

// Admin
<OrstraxProductBrand productName="Admin" />

// Product Hub
<OrstraxProductBrand productName="Product Hub" />
```

### After Migration

Consumer apps should **delete their duplicated wordmark files**.

The wordmark should only exist in `orstrax-ui`.

---

## 9. Files Created/Modified

### New Files

- ✅ `.github/workflows/release.yml` - Automatic release creation
- ✅ `.github/renovate.json` - Renovate config (example for consumer repos)
- ✅ `DISTRIBUTION.md` - Complete distribution architecture
- ✅ `CONSUMER_SETUP.md` - Consumer installation guide
- ✅ `DISTRIBUTION_REPORT.md` - This report

### Modified Files

- ✅ `package.json` - Added repository links, changed license to MIT
- ✅ `README.md` - Updated installation and distribution sections

### Deleted Files

- ❌ `.github/workflows/publish.yml` - Removed npm publishing workflow
- ❌ `SETUP_AUTO_PUBLISH.md` - Removed npm token setup guide

---

## 10. Testing & Verification

### ✅ Tested Scenarios

```bash
✅ npm install github:orstrax/orstrax-ui#main
   → Works, builds dist/ automatically via "prepare" script

✅ Package structure
   → dist/index.js, dist/index.mjs, dist/styles.css present
   → TypeScript types (dist/index.d.ts) present
   → Wordmark asset bundled correctly

✅ No authentication
   → Public repo, installs without tokens

✅ Vercel compatibility
   → Standard npm ci workflow, no special config needed
```

### Next Steps for Validation

1. **Migrate orstrax-orders** to use the package (first real consumer)
2. **Verify visual match** - Orders should look identical after migration
3. **Test Renovate** - Create a new release, verify PR creation works
4. **Test Vercel deploy** - Verify Orders deploys successfully
5. **Repeat for Admin and Product Hub**
6. **Migrate Desk last** after other products validate

---

## Summary: Why This Works

| Requirement | Solution |
|-------------|----------|
| **Simple** | ✅ No auth, just `npm install github:org/repo#tag` |
| **Public** | ✅ Repo is public, zero secrets |
| **Versioned** | ✅ Git tags = semantic versions |
| **Automatic** | ✅ GitHub Actions + Renovate |
| **Low-maintenance** | ✅ Bump version, merge, done |
| **Works everywhere** | ✅ npm, Vercel, CI, local |
| **Easy rollback** | ✅ Change tag in package.json |
| **No tokens** | ✅ Public repo = no auth needed |

---

## Questions Answered

**Q: Distribution method?**  
A: Direct GitHub dependency with semantic version tags

**Q: Why not npm?**  
A: Adds complexity (tokens, account) without benefit for public package

**Q: Any token required?**  
A: No. The repo is public.

**Q: How are releases versioned?**  
A: Git tags following semantic versioning (v0.1.1, v0.2.0, v1.0.0)

**Q: How do consumer repos receive update PRs?**  
A: Renovate or Dependabot detects new tags and creates PRs automatically

**Q: How does Vercel install the dependency?**  
A: Standard `npm ci` → clones repo → runs "prepare" script → builds dist/

**Q: How does rollback work?**  
A: Change the tag in package.json (v0.3.0 → v0.2.0) and redeploy

**Q: Has Desk been migrated?**  
A: Not yet. Desk will migrate LAST after other products validate the package.

**Q: Which repos are ready to migrate?**  
A: Orders, Admin, Product Hub (Orstrax-branded products only)

---

**Status: ✅ Complete and Ready to Use**

No npm automation token needed. No GitHub Packages. No authentication complexity.

Just simple, versioned, public GitHub dependencies.
