# Consumer App Setup

## For: Orstrax Desk, Orders, Admin, Product Hub

This guide shows how to consume `@orstrax/ui` from the **public GitHub repository** with automatic updates.

---

## Quick Start

### 1. Install the Package

In your consumer app (`orstrax-desk`, `orstrax-orders`, `orstrax-admin`, `orstrax-product-hub`):

```bash
npm install github:orstrax/orstrax-ui#v0.1.1
```

Or add directly to `package.json`:

```json
{
  "dependencies": {
    "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
  }
}
```

### 2. Import and Use

```tsx
import { 
  AuthLayout, 
  OrstraxProductBrand,
  PrimaryButton,
  Input
} from "@orstrax/ui";
import "@orstrax/ui/styles.css";

export function LoginPage() {
  return (
    <AuthLayout
      productName="Desk"
      tagline="Support everything that builds forward."
      title="Welcome back."
    >
      <form>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <PrimaryButton type="submit">Sign in</PrimaryButton>
      </form>
    </AuthLayout>
  );
}
```

---

## Versioning

**Always pin to a specific release tag**, never use `#main`:

✅ **Good** - Pinned version:
```json
"@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1"
```

❌ **Bad** - Floating on main:
```json
"@orstrax/ui": "github:orstrax/orstrax-ui#main"
```

### Version Format

Releases follow semantic versioning:

- `v0.1.1` - Patch (bug fixes)
- `v0.2.0` - Minor (new features, backwards compatible)
- `v1.0.0` - Major (breaking changes)

---

## Automatic Updates with Renovate

### Enable Renovate in Your Consumer Repo

**Option A: GitHub App (Recommended)**

1. Install Renovate GitHub App: https://github.com/apps/renovate
2. Authorize for your organization
3. Renovate will auto-detect GitHub dependencies
4. Create `.github/renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": false,
      "labels": ["ui-update"]
    },
    {
      "matchPackageNames": ["orstrax/orstrax-ui"],
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "labels": ["ui-update", "breaking-change"]
    }
  ]
}
```

**Option B: Dependabot**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

### What Happens

When `orstrax-ui` releases `v0.2.0`:

1. ✅ Renovate/Dependabot creates a PR in your repo
2. ✅ PR updates dependency: `v0.1.1` → `v0.2.0`
3. ✅ Your CI runs (build, lint, tests)
4. ✅ Review and merge
5. ✅ Vercel auto-deploys

---

## Vercel Configuration

No special Vercel config needed! GitHub dependencies work out of the box.

### Build Settings

Your `vercel.json` or dashboard settings should work as-is:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci"
}
```

Vercel will:
1. Run `npm ci`
2. Clone `orstrax-ui` from GitHub
3. Run the `prepare` script (builds the package)
4. Continue with your build

**No authentication required** - the repo is public.

---

## Updating to a New Version

### Manual Update

```bash
# Check available versions
gh release list --repo orstrax/orstrax-ui

# Update to specific version
npm install github:orstrax/orstrax-ui#v0.2.0

# Test locally
npm run build
npm run dev

# Commit and push
git add package.json package-lock.json
git commit -m "Update @orstrax/ui to v0.2.0"
git push
```

### Via Renovate PR

1. Renovate creates PR
2. Review the changes
3. CI runs automatically
4. Merge if green
5. Vercel deploys

---

## Rollback

If a new version causes issues:

```bash
# Roll back to previous version
npm install github:orstrax/orstrax-ui#v0.1.1

git add package.json package-lock.json
git commit -m "Rollback @orstrax/ui to v0.1.1"
git push
```

**Your deployed app continues working** even if:
- The `orstrax-ui` repo is temporarily down
- A new bad release is published
- GitHub has an outage

Your `node_modules` are bundled into the deployment.

---

## Migration Checklist

### For Each Consumer App

- [ ] Install `@orstrax/ui` via GitHub dependency
- [ ] Add CSS import: `import "@orstrax/ui/styles.css"`
- [ ] Replace custom auth layouts with `<AuthLayout>`
- [ ] Replace custom brand components with `<OrstraxProductBrand>`
- [ ] Remove duplicated wordmark assets
- [ ] Remove duplicated CSS tokens/variables
- [ ] Test locally
- [ ] Deploy to staging
- [ ] Enable Renovate/Dependabot
- [ ] Deploy to production

### Migration Status

**Orstrax Desk**
- [ ] Not yet migrated (source of visual truth)
- [ ] Will migrate after other apps validate the package

**Orstrax Orders**
- [ ] Ready to migrate

**Orstrax Admin**
- [ ] Ready to migrate

**Orstrax Product Hub**
- [ ] Ready to migrate

---

## Example package.json

```json
{
  "name": "orstrax-desk",
  "version": "1.0.0",
  "dependencies": {
    "@orstrax/ui": "github:orstrax/orstrax-ui#v0.1.1",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## FAQ

### Do I need an npm token?

**No.** The repo is public, so npm/Vercel can install it without authentication.

### Do I need a GitHub token?

**No.** Public repos don't require tokens for git clone operations.

### What if GitHub is down?

Your deployed apps continue working. Only fresh installs would fail temporarily.

### Can I use a commit SHA instead of a tag?

Yes, but **not recommended**:

```json
"@orstrax/ui": "github:orstrax/orstrax-ui#abc123def"
```

Tags are clearer and easier to track.

### How do I see what changed between versions?

```bash
gh release view v0.2.0 --repo orstrax/orstrax-ui
```

Or check: https://github.com/orstrax/orstrax-ui/releases

---

## Support

For issues with the shared UI package:
- **Repo**: https://github.com/orstrax/orstrax-ui
- **Issues**: https://github.com/orstrax/orstrax-ui/issues
- **Releases**: https://github.com/orstrax/orstrax-ui/releases
