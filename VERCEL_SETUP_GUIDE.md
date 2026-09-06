# Vercel Setup Guide for Repository Split

**Status**: Phase 3 - Infrastructure Configuration  
**Prerequisites**: Phase 2 complete (repositories created)

---

## Overview

You need to create **THREE separate Vercel projects** and migrate environment variables from the existing monolithic project.

### New Projects

1. **orstrax-orders** → `orders.orstrax.io`
2. **orstrax-admin** → `admin.orstrax.io`
3. **orstrax-hub** → `orstrax.io` (or keep existing project)

---

## Step 1: Create Vercel Projects

### 1.1 Orders Project

1. Go to https://vercel.com/new
2. Click **"Add New Project"**
3. **Import Git Repository**: `orstrax/orstrax-orders`
4. **Project Name**: `orstrax-orders`
5. **Framework Preset**: Next.js
6. **Build Command**: `npm run build`
7. **Install Command**: `npm ci`
8. **Output Directory**: `.next` (default)
9. **Root Directory**: `.` (default)
10. Click **"Deploy"** (this will be a test deploy)

### 1.2 Admin Project

1. Go to https://vercel.com/new
2. Click **"Add New Project"**
3. **Import Git Repository**: `orstrax/orstrax-admin`
4. **Project Name**: `orstrax-admin`
5. **Framework Preset**: Next.js
6. **Build Command**: `npm run build`
7. **Install Command**: `npm ci`
8. Click **"Deploy"**

### 1.3 Hub Project

**Option A**: Keep existing project, update repo
1. Go to existing project settings
2. **Settings** → **Git** → **Edit**
3. Change repository to point to `orstrax/orstrax`
4. Change branch to `cleanup-extract-orders-and-admin` (for now)

**Option B**: Create new project
1. Go to https://vercel.com/new
2. **Import Git Repository**: `orstrax/orstrax`
3. **Project Name**: `orstrax-hub`
4. **Framework Preset**: Next.js
5. Click **"Deploy"**

---

## Step 2: Environment Variables Migration

### Current State
The existing monolithic Vercel project has ALL environment variables mixed together.

### Target State
Each project should have ONLY the variables it needs (least privilege).

### 2.1 Orders Environment Variables

Go to **orstrax-orders** project → **Settings** → **Environment Variables**

Add these variables (from current monolithic project):

#### Shopify
```
SHOPIFY_API_KEY=<from current project>
SHOPIFY_API_SECRET=<from current project>
SHOPIFY_APP_URL=https://orders.orstrax.io
```

#### Firebase
```
FIREBASE_PROJECT_ID=<from current project>
FIREBASE_CLIENT_EMAIL=<from current project>
FIREBASE_PRIVATE_KEY=<from current project>
FIREBASE_API_KEY=<from current project>
FIREBASE_AUTH_DOMAIN=<from current project>
FIREBASE_STORAGE_BUCKET=<from current project>
```

#### AWS S3
```
AWS_ACCESS_KEY_ID=<from current project>
AWS_SECRET_ACCESS_KEY=<from current project>
AWS_REGION=<from current project>
AWS_S3_BUCKET=<from current project>
```

#### Email
```
# If using SMTP
SMTP_HOST=<from current project>
SMTP_PORT=<from current project>
SMTP_USER=<from current project>
SMTP_PASS=<from current project>
FROM_EMAIL=<from current project>

# OR if using Resend
RESEND_API_KEY=<from current project>
```

#### Auth
```
NEXTAUTH_SECRET=<from current project>
NEXTAUTH_URL=https://orders.orstrax.io
```

**Important**: For each variable, set for:
- ✅ Production
- ✅ Preview
- ✅ Development (if needed)

### 2.2 Admin Environment Variables

Go to **orstrax-admin** project → **Settings** → **Environment Variables**

Add these variables:

#### Platform Admin Auth
```
PLATFORM_ADMIN_AUTH_SECRET=<from current project OR generate new>
```

#### Firebase (for admin auth verification)
```
FIREBASE_PROJECT_ID=<from current project>
FIREBASE_CLIENT_EMAIL=<from current project>
FIREBASE_PRIVATE_KEY=<from current project>
```

#### Product Adapter Credentials
```
# Service account keys for querying Orders, Desk, etc.
ORDERS_SERVICE_ACCOUNT_KEY=<generate service account key>
DESK_SERVICE_ACCOUNT_KEY=<generate service account key if needed>
```

**Note**: Admin should NOT have AWS S3, Shopify, or SMTP credentials.

### 2.3 Hub Environment Variables

Go to **orstrax-hub** project → **Settings** → **Environment Variables**

Hub is mostly public content and should have **minimal secrets**.

```
# Only if Hub needs specific APIs
NEXT_PUBLIC_HUB_API_URL=<if needed>
```

**Note**: Hub should NOT have Firebase, Shopify, AWS, or platform admin credentials.

---

## Step 3: Domain Configuration

### 3.1 Orders Domain

1. Go to **orstrax-orders** project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `orders.orstrax.io`
4. Click **"Add"**
5. Vercel will show DNS configuration needed
6. **DO NOT apply DNS changes yet** - wait for testing

### 3.2 Admin Domain

1. Go to **orstrax-admin** project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `admin.orstrax.io`
4. Click **"Add"**
5. Note DNS configuration

### 3.3 Hub Domain

1. Go to **orstrax-hub** project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `orstrax.io`
4. Click **"Add"**
5. Note DNS configuration

### DNS Changes Summary

You'll need to update DNS records (in your DNS provider):

```
orders.orstrax.io  CNAME  cname.vercel-dns.com
admin.orstrax.io   CNAME  cname.vercel-dns.com
orstrax.io         A      76.76.21.21 (Vercel IP)
orstrax.io         CNAME  cname.vercel-dns.com (or A record)
```

**WAIT** - Don't apply these yet. Test preview URLs first.

---

## Step 4: Preview Testing

### 4.1 Test Orders Preview

1. Trigger a deployment (push to `orstrax-orders` main branch)
2. Wait for build to complete
3. Get preview URL (e.g., `orstrax-orders-xyz.vercel.app`)
4. Test:
   - ✅ Homepage loads
   - ✅ Login redirects to Shopify OAuth
   - ❌ **Don't test full OAuth flow yet** (callback URL not configured)
   - ✅ API routes respond
   - ✅ No console errors
   - ✅ Build succeeded

### 4.2 Test Admin Preview

1. Trigger deployment in `orstrax-admin`
2. Get preview URL
3. Test:
   - ✅ `/platform` loads
   - ✅ Platform login page loads
   - ✅ No immediate errors
   - ✅ Build succeeded

### 4.3 Test Hub Preview

1. Trigger deployment in `orstrax-hub` (from `cleanup-extract-orders-and-admin` branch)
2. Get preview URL
3. Test:
   - ✅ `/hub` routes load
   - ✅ Product directory works
   - ✅ Documentation loads
   - ✅ No broken links
   - ✅ Build succeeded

---

## Step 5: Shopify Configuration Update

**CRITICAL**: This must be done carefully to avoid breaking merchant access.

### Current Shopify App Settings
- **App URL**: `https://orders.orstrax.io`
- **Redirect URLs**: `https://orders.orstrax.io/api/auth/callback`

### Changes Needed: **NONE**

The public-facing URL stays `orders.orstrax.io`. We're only changing the Vercel project behind it.

### What To Verify After Cutover

1. OAuth flow works
2. Webhooks deliver correctly
3. Theme App Extension loads
4. Embedded app iframe works (if using embedded mode)

### Testing Shopify Integration

**Before production cutover:**

1. Use a **development store**
2. Temporarily update Shopify app settings to point to preview URL
3. Test full OAuth flow
4. Test webhook delivery
5. Test Theme Extension
6. Revert Shopify settings

**Or**: Accept that OAuth testing happens in production (risky but faster)

---

## Step 6: Production Cutover

### Pre-Cutover Checklist

- [ ] All three Vercel projects built successfully
- [ ] Environment variables configured
- [ ] Preview URLs tested
- [ ] Admin users notified of `admin.orstrax.io` domain change
- [ ] Backup plan ready (rollback instructions)

### Cutover Steps

**6.1 Apply DNS Changes**

In your DNS provider (Vercel DNS, Cloudflare, etc.):

1. **First**: Update `admin.orstrax.io` (new subdomain, low risk)
   ```
   admin.orstrax.io  CNAME  cname.vercel-dns.com
   ```

2. **Wait 5 minutes**, then test `admin.orstrax.io` works

3. **Second**: Update `orders.orstrax.io` (high risk - Shopify app)
   ```
   orders.orstrax.io  CNAME  <new-vercel-cname>
   ```

4. **Immediately test**:
   - Visit `orders.orstrax.io`
   - Check homepage loads
   - Test OAuth flow with a merchant
   - Check webhook delivery

5. **Third**: Update `orstrax.io` (low risk - public hub)
   ```
   orstrax.io  A  <vercel-ip>
   ```

**6.2 Monitor**

After DNS changes:
- Watch Vercel deployment logs
- Monitor error tracking (Sentry, etc.)
- Check Shopify webhook delivery status
- Test merchant login flows
- Verify Theme Extension works

**6.3 Verify Shopify**

1. Log in as a merchant
2. Create a test order
3. Trigger status change
4. Verify webhook received
5. Check Theme Extension displays correctly

---

## Step 7: Legacy Redirects

### Old Admin URL Redirect

The old `/orstrax-admin` route needs to redirect to `admin.orstrax.io`.

**In Orders repo** (`orstrax-orders`), add to `next.config.ts`:

```typescript
module.exports = {
  async redirects() {
    return [
      {
        source: '/orstrax-admin/:path*',
        destination: 'https://admin.orstrax.io/platform/:path*',
        permanent: false, // Use 302 for now, switch to 301 later
      },
    ];
  },
};
```

Deploy this change after cutover.

---

## Step 8: Cleanup

### 8.1 Old Vercel Project

After successful cutover:
1. Remove production domains from old monolithic project
2. Keep project for 1 week as backup
3. Archive or delete old project

### 8.2 Merge Hub Cleanup PR

After Orders and Admin are confirmed working:
1. Merge PR #26 in `orstrax/orstrax`
2. This finalizes the Hub-only repository

### 8.3 Update Documentation

- Update team documentation with new URLs
- Update internal links
- Update bookmarks
- Notify team of `admin.orstrax.io` change

---

## Rollback Plan

If something goes wrong:

### Immediate Rollback (DNS)

Revert DNS changes to point back to old Vercel project:
```
orders.orstrax.io  →  <old-vercel-cname>
admin.orstrax.io   →  delete record (or point to old /orstrax-admin)
orstrax.io         →  <old-vercel-cname>
```

### Shopify Issues

If Shopify OAuth breaks:
1. Check redirect URLs in Shopify app settings
2. Verify `orders.orstrax.io` resolves correctly
3. Check Vercel deployment logs for errors
4. Test with development store first

### Environment Variable Issues

If deployments fail due to missing variables:
1. Check Vercel project settings
2. Compare with list above
3. Add missing variables
4. Redeploy

---

## Monitoring & Validation

### Success Metrics

- ✅ `orders.orstrax.io` - Merchants can log in
- ✅ `orders.orstrax.io` - Webhooks deliver
- ✅ `orders.orstrax.io` - Theme Extension works
- ✅ `admin.orstrax.io` - Platform admin accessible
- ✅ `orstrax.io` - Hub loads correctly
- ✅ No error spike in logs
- ✅ Build times acceptable
- ✅ SSL certificates active

### What To Monitor

First 24 hours:
- Vercel deployment logs
- Error tracking (Sentry, etc.)
- Shopify webhook delivery status
- User support tickets
- Performance metrics

---

## Estimated Timeline

| Task | Time | Risk |
|------|------|------|
| Create Vercel projects | 30 min | Low |
| Migrate env variables | 1-2 hours | Medium |
| Configure domains | 30 min | Low |
| Preview testing | 1-2 hours | Low |
| DNS cutover | 30 min | High |
| Monitoring | 2-4 hours | Medium |
| **Total** | **6-9 hours** | **Varies** |

---

## Support Contacts

If issues arise:
- **Vercel Support**: https://vercel.com/support
- **Shopify Partner Support**: https://partners.shopify.com/support
- **DNS Provider**: <your DNS provider support>

---

## Summary Checklist

### Pre-Cutover
- [ ] Three Vercel projects created
- [ ] Environment variables migrated
- [ ] Preview URLs tested
- [ ] Team notified

### Cutover
- [ ] DNS changed (admin → orders → hub)
- [ ] SSL certificates active
- [ ] Shopify OAuth tested
- [ ] Webhooks verified

### Post-Cutover
- [ ] Monitoring active
- [ ] Legacy redirects added
- [ ] Hub cleanup PR merged
- [ ] Old project archived
- [ ] Documentation updated

---

**Status**: Ready for execution  
**Next**: Create Vercel projects and begin Phase 3
