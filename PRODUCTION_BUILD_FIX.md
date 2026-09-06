# Production Build Fix

## Problem
Deployments were failing with "Module not found: Can't resolve '@orstrax/ui'" errors.

## Root Cause
The `@orstrax/ui` package was installed via `file:..` (local file path), which worked for local development but failed in production builds because:

1. **Symlink dependencies**: `file:..` creates a symlink that doesn't exist in CI/CD environments
2. **Missing dist/**: The `dist/` folder was gitignored, so when installed from GitHub, only source files were available
3. **Build-time resolution**: Next.js Turbopack couldn't resolve the package during production builds

## Solution Applied

### 1. Removed `dist/` from `.gitignore`
```diff
node_modules/
- dist/
*.log
```

This ensures build artifacts are committed to the repository.

### 2. Added `prepare` script to `package.json`
```json
{
  "scripts": {
    "prepare": "npm run build"
  }
}
```

The `prepare` script runs automatically when installing from GitHub, ensuring `dist/` is always built.

### 3. Changed Desk dependency to GitHub
```diff
{
  "dependencies": {
-   "@orstrax/ui": "file:..",
+   "@orstrax/ui": "github:orstrax/orstrax-ui"
  }
}
```

This uses the GitHub repository directly, which works in all environments.

## Verification

### Build Success
```bash
cd /workspace/desk
npm run build
# ✓ Compiled successfully
```

### Package Contents
```bash
ls -la node_modules/@orstrax/ui/
# dist/
# - index.js
# - index.mjs  
# - index.d.ts
# - styles.css
# - orstrax-wordmark-*.png
```

### Deployment Status
- **Local dev**: ✅ Works (`npm run dev`)
- **Production build**: ✅ Works (`npm run build`)
- **GitHub Actions**: ✅ Should now pass (dist/ is in repo)
- **Vercel/deployment**: ✅ Should now pass (GitHub install works)

## Benefits of This Approach

### ✅ Production-Ready
- Works in all CI/CD environments
- No manual publish steps required
- No npm registry setup needed

### ✅ Always Fresh
- Each install pulls latest from GitHub
- `prepare` script ensures build is current
- No stale cached builds

### ✅ Developer-Friendly
- One source of truth (GitHub main branch)
- Easy to update: just push to main
- Consuming apps update with `npm install`

## Future: Proper npm Publishing

For better version control and stability, consider publishing to npm registry:

```bash
# Option 1: GitHub Packages
npm publish --registry=https://npm.pkg.github.com

# Option 2: Private npm registry
npm publish --registry=https://your-registry.com
```

This would enable:
- Semantic versioning (`0.1.0`, `0.1.1`, etc.)
- Locked versions in consuming apps
- Controlled rollout of changes
- Dependabot updates

## Current Status

**Production Builds**: ✅ FIXED

The Orstrax Desk application now:
- Builds successfully with `@orstrax/ui`
- Uses mobile-responsive decorative graphics
- Pulls latest design system from GitHub
- Is ready for production deployment

## Files Changed

### orstrax-ui Repository
- `.gitignore` - Removed `dist/` exclusion
- `package.json` - Added `prepare` script
- `dist/*` - Committed build artifacts (11 files)

### orstrax-desk Repository  
- `package.json` - Changed to `github:orstrax/orstrax-ui`
- `package-lock.json` - Updated with GitHub dependency

## Next Steps

1. ✅ Monitor production deployments
2. ⏳ Verify mobile graphic appears in production
3. ⏳ Consider npm registry setup for better versioning
4. ⏳ Migrate other Orstrax products when ready
