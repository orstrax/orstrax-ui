# Publishing Checklist

Complete this checklist before publishing `@orstrax/ui` to npm.

---

## Pre-Publish Verification

### 1. Build Quality

- [x] `npm run build` completes without errors
- [x] `npm run type-check` passes without errors
- [x] All TypeScript types are correct
- [x] Sourcemaps are generated
- [x] Assets (PNG) are bundled correctly

**Status:** ✅ All checks pass

### 2. Package Metadata

- [x] `package.json` has correct name: `@orstrax/ui`
- [x] Version is set: `0.1.0`
- [x] License is set: `UNLICENSED` (internal)
- [x] `private: true` is set
- [x] Files array includes: `dist`, `README.md`
- [x] Exports are correct (types first)

**Status:** ✅ Ready

### 3. Documentation

- [x] README.md is comprehensive
- [x] Installation instructions are clear
- [x] Usage examples are provided
- [x] All components are documented
- [x] Migration guide exists (MIGRATION.md)
- [x] Token reference exists (TOKENS.md)

**Status:** ✅ Complete

### 4. Dependencies

- [x] Peer dependencies are correct (React 18+/19+)
- [x] Runtime dependencies are minimal (only `clsx`)
- [x] Dev dependencies are appropriate
- [x] No unnecessary dependencies

**Status:** ✅ Optimal

---

## Publishing Steps

### For Internal npm Registry

If using an internal npm registry (recommended):

```bash
# 1. Configure npm registry (if not already done)
npm config set registry https://your-internal-registry.com

# 2. Authenticate
npm login

# 3. Verify build
npm run build

# 4. Publish
npm publish

# 5. Verify
npm view @orstrax/ui
```

### For GitHub Packages

If using GitHub Packages:

```bash
# 1. Create .npmrc in project root
echo "@orstrax:registry=https://npm.pkg.github.com" > .npmrc

# 2. Authenticate with GitHub token
npm login --scope=@orstrax --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: your-github-personal-access-token
# Email: your-email

# 3. Update package.json
# Add:
# "publishConfig": {
#   "registry": "https://npm.pkg.github.com"
# }

# 4. Build
npm run build

# 5. Publish
npm publish

# 6. Verify
npm view @orstrax/ui --registry=https://npm.pkg.github.com
```

### For Private npm (Self-Hosted)

If using Verdaccio or similar:

```bash
# 1. Configure registry
npm config set registry http://your-verdaccio-url

# 2. Add user
npm adduser --registry http://your-verdaccio-url

# 3. Build
npm run build

# 4. Publish
npm publish --registry http://your-verdaccio-url

# 5. Verify
npm view @orstrax/ui --registry http://your-verdaccio-url
```

---

## Post-Publish Verification

### 1. Installation Test

Create a test project and verify installation:

```bash
# Create test directory
mkdir /tmp/orstrax-ui-test
cd /tmp/orstrax-ui-test

# Initialize
npm init -y

# Install published package
npm install @orstrax/ui

# Verify contents
ls -la node_modules/@orstrax/ui/dist/

# Check files exist:
# - index.js
# - index.mjs
# - index.d.ts
# - styles.css
# - orstrax-wordmark-*.png
```

### 2. Import Test

Create a simple test file:

```tsx
// test.tsx
import { 
  OrstraxProductBrand,
  AuthLayout,
  OrstraxAppShell,
  Button,
  Input,
  Card
} from "@orstrax/ui";
import "@orstrax/ui/styles.css";

// If no TypeScript errors, package is correct
```

### 3. Type Checking

```bash
# In test project
npx tsc --noEmit test.tsx

# Should complete without errors
```

---

## Consuming Projects

After publishing, update consuming projects:

### Desk

```bash
cd orstrax-desk
npm install @orstrax/ui@latest
```

### Orders

```bash
cd orstrax-orders
npm install @orstrax/ui@latest
```

### Admin

```bash
cd orstrax-admin
npm install @orstrax/ui@latest
```

### Product Hub

```bash
cd orstrax-product-hub
npm install @orstrax/ui@latest
```

---

## Version Management

### Semantic Versioning

Follow semantic versioning:

- **Patch (0.1.x):** Bug fixes, documentation
- **Minor (0.x.0):** New components, backwards-compatible features
- **Major (x.0.0):** Breaking API changes

### Publishing New Versions

```bash
# 1. Make changes
# 2. Update version in package.json
npm version patch  # or minor, or major

# 3. Build
npm run build

# 4. Commit version bump
git add package.json
git commit -m "Bump version to 0.1.1"
git push

# 5. Publish
npm publish

# 6. Tag release
git tag v0.1.1
git push --tags
```

---

## Automated Publishing (Optional)

### GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
      
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
      
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

**Usage:**
```bash
git tag v0.1.0
git push --tags
# Workflow publishes automatically
```

---

## Rollback Procedure

If published version has issues:

### Deprecate Version

```bash
npm deprecate @orstrax/ui@0.1.0 "This version has issues, use 0.1.1"
```

### Unpublish (Use Carefully)

```bash
# Only within 72 hours of publish
npm unpublish @orstrax/ui@0.1.0
```

### Publish Fix

```bash
# Fix issues
npm version patch  # 0.1.0 -> 0.1.1
npm run build
npm publish
```

---

## Distribution Alternatives

### If npm Registry Not Available

#### Option 1: Git Dependency

Consuming projects can install directly from Git:

```json
{
  "dependencies": {
    "@orstrax/ui": "git+https://github.com/orstrax/orstrax-ui.git#v0.1.0"
  }
}
```

#### Option 2: Local Path (Development)

```json
{
  "dependencies": {
    "@orstrax/ui": "file:../orstrax-ui"
  }
}
```

#### Option 3: Tarball

```bash
# Create tarball
npm pack

# Produces: orstrax-ui-0.1.0.tgz

# Install in other projects
npm install /path/to/orstrax-ui-0.1.0.tgz
```

---

## Security Considerations

### Access Control

- [ ] Ensure only authorized users can publish
- [ ] Use scoped packages (`@orstrax/ui`) for better control
- [ ] Set appropriate npm registry permissions
- [ ] Use 2FA for npm accounts if possible

### Secrets

- [ ] Don't commit `.npmrc` with tokens
- [ ] Use environment variables for tokens
- [ ] Rotate tokens periodically
- [ ] Use GitHub secrets for CI/CD

---

## Support & Maintenance

### Update Policy

- **Security fixes:** Immediate patch release
- **Bug fixes:** Weekly patch releases
- **New features:** Monthly minor releases
- **Breaking changes:** Coordinated major releases

### Communication

When publishing updates:

1. Update CHANGELOG.md
2. Post in team Slack/Discord
3. Update consuming projects via PRs
4. Monitor for issues

---

## Current Status

**Package:** `@orstrax/ui`  
**Version:** 0.1.0  
**Status:** ✅ Ready to publish  
**Blocker:** npm registry credentials needed

**Action Required:**
1. Choose npm registry (internal/GitHub/Verdaccio)
2. Obtain publish credentials
3. Run publish command
4. Verify installation

---

## Questions to Answer Before Publishing

- [ ] Which npm registry will we use?
- [ ] Who has publish credentials?
- [ ] Should publishing be automated via CI/CD?
- [ ] What's the process for updating consuming apps?
- [ ] How do we handle breaking changes?

**Once answered, follow the appropriate publishing steps above.**
