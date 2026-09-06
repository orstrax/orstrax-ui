# Distribution Strategy

## Decision: Public GitHub Dependency ✅

**Distribution Method:** Direct GitHub dependency via semantic version tags

**Why:** The `orstrax-ui` repository is public and contains only shared branding/design-system code with no secrets or private business logic.

---

## Architecture

```
orstrax-ui (PUBLIC)
├── src/ (React components, tokens, assets)
├── dist/ (built on npm install via "prepare" script)
├── package.json (v0.1.1)
└── .github/workflows/release.yml

Consumer installs:
npm install github:orstrax/orstrax-ui#v0.1.1

Vercel/CI:
npm ci → clones repo → runs "prepare" → builds dist/ → bundles

Consumer repos:
├── orstrax-desk
├── orstrax-orders
├── orstrax-admin
└── orstrax-product-hub

Renovate/Dependabot watches releases → creates PRs
```

---

## Why GitHub Dependency Over npm?

### ✅ Advantages

1. **Zero authentication** - Public repo, no tokens needed
2. **Works everywhere** - npm, Vercel, local dev, CI
3. **Simple** - One less service (no npm account/tokens)
4. **Versioned** - Git tags are semantic versions
5. **Atomic** - Source code + version in one place
6. **Transparent** - Consumers see exactly what code they're using

### Tested & Verified

```bash
✅ npm install github:orstrax/orstrax-ui#v0.1.1 works
✅ dist/ folder built automatically via "prepare" script
✅ TypeScript types available
✅ CSS imports work
✅ Assets (wordmark) bundled correctly
✅ No authentication required
```

---

## Release Process

### 1. Make Changes

```bash
git checkout -b feature/new-button
# edit src/components/Button.tsx
git commit -m "Add new button variant"
git push
```

### 2. Bump Version

Edit `package.json`:

```diff
{
  "name": "@orstrax/ui",
- "version": "0.1.1",
+ "version": "0.2.0",
}
```

**Semantic versioning rules:**
- **Patch** (0.1.1 → 0.1.2): Bug fixes, styling tweaks
- **Minor** (0.1.1 → 0.2.0): New components, new features
- **Major** (0.1.1 → 1.0.0): Breaking changes

### 3. Create PR

```bash
gh pr create --title "Add new button variant" --body "..."
```

### 4. Merge to Main

Once merged, GitHub Actions automatically:

1. ✅ Runs `npm ci`
2. ✅ Runs `npm run build`
3. ✅ Runs `npm run type-check`
4. ✅ Creates git tag `v0.2.0`
5. ✅ Pushes tag to GitHub
6. ✅ Creates GitHub Release with install instructions

### 5. Consumer Apps Get PRs

Within hours/days (depending on Renovate schedule):

1. Renovate detects new tag `v0.2.0`
2. Creates PR in `orstrax-desk`:
   ```diff
   {
     "dependencies": {
   -   "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
   +   "@orstrax/ui": "github:orstrax/orstrax-ui#v0.2.0"
     }
   }
   ```
3. Desk CI runs (build, lint, tests)
4. If green → review and merge
5. Vercel deploys

Same process for Orders, Admin, Product Hub.

---

## Rollback

If `v0.2.0` is bad, consumers roll back:

```bash
npm install github:orstrax/orstrax-ui#v0.1.1
git commit -m "Rollback UI to v0.1.1"
git push
```

Simple, explicit, safe.

---

## Why NOT npm Publish?

We evaluated npm publishing but it adds complexity without benefit:

### ❌ npm Would Require

1. **npm account** setup
2. **Authentication token** management (even with OIDC)
3. **Organization access** configuration (@orstrax scope)
4. **Publishing workflow** testing
5. **Token rotation** maintenance

### ✅ GitHub Dependency Requires

1. Nothing. The repo is public.

### The Trade-off

**npm advantage:** Slightly faster installs (pre-built tarball vs git clone)

**GitHub advantage:** 
- Zero auth setup
- Zero token management
- Zero npm account dependencies
- Works identically in all environments
- Single source of truth

**Decision:** Simplicity wins. The install time difference is negligible for a small design system package.

---

## Token Requirements: NONE

| Scenario | Token Needed? |
|----------|---------------|
| Local dev install | ❌ No |
| Vercel build | ❌ No |
| GitHub Actions | ❌ No |
| Renovate updates | ❌ No |
| Dependabot updates | ❌ No |

The repo is public. Anyone can `git clone` it. npm treats GitHub dependencies the same way.

---

## Consumer Migration Status

### Migration Order

1. ✅ **orstrax-ui** - Package created, released
2. ⏳ **orstrax-orders** - Ready to migrate first (validate the package)
3. ⏳ **orstrax-admin** - Second to migrate
4. ⏳ **orstrax-product-hub** - Third to migrate
5. ⏳ **orstrax-desk** - Migrate last (it's the visual source of truth)

### Why Desk Migrates Last

Desk is the canonical visual reference. We should validate that other Orstrax products can successfully consume the shared UI before migrating Desk itself.

This ensures:
- Package structure works for real consumers
- No circular visual drift
- Desk remains the stable reference during migration

---

## Canonical Assets

### Wordmark Location

The Orstrax wordmark lives in `orstrax-ui`:

```
orstrax-ui/
└── src/
    └── assets/
        └── orstrax-wordmark.png
```

Consumer apps use it via the component:

```tsx
import { OrstraxProductBrand } from "@orstrax/ui";

<OrstraxProductBrand productName="Desk" />
<OrstraxProductBrand productName="Orders" />
<OrstraxProductBrand productName="Admin" />
```

After migration, consumer apps should **delete their duplicated wordmark files**.

---

## Failure Recovery

### Scenario: Bad Release

**Problem:** `v0.3.0` introduced a breaking bug

**Solution:**

1. **Consumers roll back:**
   ```bash
   npm install github:orstrax/orstrax-ui#v0.2.0
   ```

2. **Fix the bug in orstrax-ui:**
   ```bash
   git revert <bad-commit>
   # bump to v0.3.1
   # merge → new release created
   ```

3. **Consumers update:**
   ```bash
   npm install github:orstrax/orstrax-ui#v0.3.1
   ```

### Scenario: GitHub Outage

**Problem:** GitHub is down

**Impact on deployed apps:** **NONE**

Your deployed Vercel apps have `node_modules` bundled in the build. They continue serving traffic.

**Impact on new deploys:** Deploy fails until GitHub recovers.

**Mitigation:** Keep previous deployment active. Vercel keeps prior builds available for instant rollback.

---

## Alternative Approaches Considered

### ❌ npm Public Package

**Pros:**
- Faster installs (pre-built tarball)
- Familiar to all developers

**Cons:**
- Requires npm account setup
- Requires token management (even OIDC)
- Requires @orstrax scope access
- Additional service dependency
- More complexity

**Decision:** Not worth it for a small design system.

### ❌ GitHub Packages

**Pros:**
- Integrated with GitHub

**Cons:**
- Requires authentication even for public packages
- Consumers need `.npmrc` configuration
- Vercel needs `NPM_TOKEN` secret
- More complex than direct GitHub dependency

**Decision:** GitHub Packages adds auth overhead with no benefit for a public package.

### ❌ Floating on `#main`

**Pros:**
- Always latest code

**Cons:**
- ❌ Breaking changes silently break production
- ❌ No version boundary
- ❌ No rollback capability
- ❌ Non-deterministic builds

**Decision:** Explicitly forbidden. Always use semantic version tags.

---

## Automation

### Release Creation: GitHub Actions

Workflow: `.github/workflows/release.yml`

**Triggers:** Push to `main` with version bump in `package.json`

**Actions:**
1. Build and test
2. Check if version changed
3. Create and push git tag
4. Create GitHub Release

### Dependency Updates: Renovate

Config for consumer repos: `.github/renovate.json`

**Behavior:**
- Checks for new `orstrax-ui` tags weekly
- Creates PRs with version updates
- Labels: `ui-update` (minor/patch) or `breaking-change` (major)
- Never auto-merges (requires human review)

**Alternative:** Dependabot (`.github/dependabot.yml`)

Works similarly but with different scheduling/features.

---

## Monitoring

### Check Latest Release

```bash
gh release list --repo orstrax/orstrax-ui
```

### Check What Version a Consumer Uses

```bash
cd orstrax-desk
cat package.json | grep "@orstrax/ui"
# "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
```

### Check Pending Renovate PRs

```bash
cd orstrax-desk
gh pr list --label ui-update
```

---

## FAQ

**Q: Do I need to publish to npm?**  
A: No. GitHub dependency is simpler and works everywhere.

**Q: Do I need any tokens?**  
A: No. The repo is public.

**Q: Will Vercel work?**  
A: Yes. Vercel installs GitHub dependencies automatically.

**Q: How do consumers update?**  
A: Renovate/Dependabot creates PRs automatically.

**Q: Can I force a consumer to update?**  
A: No. Consumers control when they update (via PR merge).

**Q: What if I forget to bump the version?**  
A: No release is created. Bump version and push again.

**Q: Can I delete old tags?**  
A: Yes, but don't. Consumers may depend on old versions for rollback.

**Q: Should I use `#main` in production?**  
A: **Never.** Always use semantic version tags like `#v0.1.1`.

---

## Summary

| Aspect | Implementation |
|--------|----------------|
| **Distribution** | GitHub dependency |
| **Versioning** | Semantic version git tags (v0.1.1) |
| **Releases** | GitHub Actions creates tags + releases |
| **Consumer updates** | Renovate/Dependabot PRs |
| **Authentication** | None required (public repo) |
| **Rollback** | Change tag in package.json |
| **Asset bundling** | Automatic via "prepare" script |
| **Vercel support** | Works out of the box |
| **Maintenance** | Minimal - just bump version and merge |

**Status:** ✅ Ready to use

**Next step:** Migrate orstrax-orders first to validate the package works in a real consumer.
