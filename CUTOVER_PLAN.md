# Production Cutover Plan

**Migration**: Orstrax Monorepo Split  
**Date**: TBD (when ready)  
**Duration**: 6-9 hours  
**Risk Level**: Medium-High

---

## Pre-Cutover Status

### ✅ Phase 1: Audit (Complete)
- [x] Repository structure audited
- [x] Boundaries identified
- [x] Dependencies mapped
- [x] Risks documented

### ✅ Phase 2: Repository Split (Complete)
- [x] `orstrax/orstrax-orders` created and pushed
- [x] `orstrax/orstrax-admin` created and pushed
- [x] `orstrax/orstrax` cleanup PR created (#26)
- [x] All repos building successfully

### ⏳ Phase 3: Infrastructure (Your task)
- [ ] Vercel projects created
- [ ] Environment variables migrated
- [ ] Domains configured
- [ ] Preview testing complete

---

## Cutover Day Timeline

### T-24 Hours: Final Preparation
- [ ] Confirm all Vercel projects deploy successfully
- [ ] Verify all environment variables are set
- [ ] Notify team of maintenance window
- [ ] Prepare rollback plan
- [ ] Set up monitoring dashboards
- [ ] Test preview URLs one final time

### T-1 Hour: Pre-Flight
- [ ] Check current system health
- [ ] Verify no critical issues in production
- [ ] Confirm DNS credentials ready
- [ ] Open monitoring dashboards
- [ ] Team on standby

### T-0: Cutover Begins

#### Step 1: Admin Cutover (Low Risk) - 15 min
**Action**: Apply DNS for `admin.orstrax.io`
```
admin.orstrax.io  CNAME  cname.vercel-dns.com
```

**Verify**:
- [ ] DNS propagated (use `dig admin.orstrax.io`)
- [ ] `admin.orstrax.io` loads
- [ ] Platform login works
- [ ] SSL certificate active
- [ ] No errors in Vercel logs

**Rollback**: Delete DNS record or point to old route

#### Step 2: Hub Cutover (Low Risk) - 15 min
**Action**: Apply DNS for `orstrax.io`
```
orstrax.io  A  <vercel-ip>
```

**Verify**:
- [ ] DNS propagated
- [ ] `orstrax.io` loads
- [ ] `/hub` routes work
- [ ] Product directory loads
- [ ] SSL certificate active
- [ ] No errors in logs

**Rollback**: Revert DNS to old Vercel project

#### Step 3: Orders Cutover (HIGH RISK) - 30 min
**Action**: Apply DNS for `orders.orstrax.io`
```
orders.orstrax.io  CNAME  <new-vercel-cname>
```

**Verify** (CRITICAL):
- [ ] DNS propagated
- [ ] `orders.orstrax.io` loads
- [ ] Test merchant login (OAuth flow)
- [ ] Test webhook delivery (trigger test order event)
- [ ] Test Theme App Extension (visit test store)
- [ ] Check dashboard loads for existing merchant
- [ ] Verify order sync works
- [ ] SSL certificate active
- [ ] No spike in error logs

**Rollback**: Revert DNS immediately if OAuth fails

**If OAuth Fails**:
1. Check Shopify app settings redirect URLs
2. Verify environment variables (SHOPIFY_API_KEY, etc.)
3. Check Vercel deployment logs
4. If unsure, ROLLBACK DNS immediately

### T+1 Hour: Monitoring

#### Orders Health Check
- [ ] 5 merchants successfully logged in
- [ ] Webhooks delivering correctly
- [ ] No error spike
- [ ] Theme Extension rendering
- [ ] Order sync functioning

#### Admin Health Check
- [ ] Platform admin accessible
- [ ] Cross-product data loading
- [ ] No authentication issues

#### Hub Health Check
- [ ] Public pages loading
- [ ] Search functioning
- [ ] No broken links

### T+2 Hours: Stabilization
- [ ] Error rates normal
- [ ] Performance metrics acceptable
- [ ] No customer complaints
- [ ] Webhooks queue healthy
- [ ] SSL certificates all valid

### T+4 Hours: Post-Cutover Tasks

#### Add Legacy Redirects
In `orstrax-orders` repo, add to `next.config.ts`:
```typescript
async redirects() {
  return [
    {
      source: '/orstrax-admin/:path*',
      destination: 'https://admin.orstrax.io/platform/:path*',
      permanent: false,
    },
  ];
}
```

Deploy this change.

#### Merge Cleanup PR
- [ ] Merge PR #26 in `orstrax/orstrax`
- [ ] Verify Hub deploy succeeds
- [ ] Verify old routes return 404 correctly

---

## Testing Checklist

### Orders E2E Testing

#### Authentication
- [ ] Merchant can install app (if testing fresh install)
- [ ] Merchant can log in via Shopify OAuth
- [ ] Staff member can log in (if standalone auth enabled)
- [ ] Session persists correctly
- [ ] Logout works

#### Core Functionality
- [ ] Dashboard loads
- [ ] Orders list populates
- [ ] Order detail page loads
- [ ] Can view order information
- [ ] Can add internal notes
- [ ] Can add public notes
- [ ] Can change status
- [ ] Can update due date

#### Status & Templates
- [ ] Status list loads
- [ ] Can create new status
- [ ] Can edit status
- [ ] Can delete status
- [ ] Template list loads
- [ ] Can create template
- [ ] Can send email from template

#### Proofs
- [ ] Can create proof request
- [ ] Customer can view proof (via token URL)
- [ ] Customer can approve/reject
- [ ] File uploads work
- [ ] Email notifications send

#### Forms & Widgets
- [ ] Form builder loads
- [ ] Can create form
- [ ] Form renders on storefront
- [ ] Widget designer loads
- [ ] Widget renders on storefront

#### Settings
- [ ] Settings page loads
- [ ] Can update store settings
- [ ] Team management works
- [ ] Billing page loads (if applicable)

#### Webhooks & Sync
- [ ] Create test order in Shopify
- [ ] Webhook delivers to `orders.orstrax.io/api/webhooks/*`
- [ ] Order syncs to dashboard
- [ ] Order data accurate
- [ ] No webhook delivery failures

#### Theme App Extension
- [ ] Extension loads in theme customizer
- [ ] Extension renders on storefront
- [ ] Customer can look up order
- [ ] Customer can view proof
- [ ] Styling correct

### Admin E2E Testing

#### Authentication
- [ ] Can access `admin.orstrax.io/platform/login`
- [ ] Platform admin can log in
- [ ] Session persists
- [ ] Unauthorized users blocked

#### Dashboard
- [ ] Company overview loads
- [ ] Product cards display
- [ ] Health badges show correct status
- [ ] KPIs populate
- [ ] Activity charts render

#### Product Details
- [ ] Can click into Orders product
- [ ] Orders metrics load
- [ ] Can click into Desk product (if configured)
- [ ] Desk metrics load
- [ ] Health monitoring works

#### Cross-Product Features
- [ ] Analytics page loads
- [ ] Health page loads
- [ ] User management loads (if implemented)
- [ ] Audit log loads (if implemented)

### Hub E2E Testing

#### Public Pages
- [ ] `orstrax.io/hub` loads
- [ ] Product directory displays all products
- [ ] Product cards link correctly
- [ ] Desk listed with correct URL
- [ ] Orders listed with correct URL

#### Documentation
- [ ] `/hub/docs` loads
- [ ] Documentation content renders
- [ ] Code examples display correctly
- [ ] Internal links work

#### Help & Support
- [ ] `/hub/help` loads
- [ ] Help resources display
- [ ] Links to product help pages work

#### Other Routes
- [ ] `/hub/changelog` loads
- [ ] `/hub/contact` form loads
- [ ] `/hub/privacy` loads
- [ ] `/hub/terms` loads
- [ ] `/hub/search` works (if implemented)

#### Mobile
- [ ] Hub responsive on mobile
- [ ] Navigation works
- [ ] Images load correctly

---

## Rollback Procedures

### Immediate Rollback (< 15 minutes)

If critical issues arise, revert DNS immediately:

#### Rollback Orders
```bash
# In DNS provider
orders.orstrax.io  CNAME  <old-vercel-cname>
```
**Verify**: Merchants can log in again

#### Rollback Admin
```bash
admin.orstrax.io  [DELETE RECORD]
```
Old route at `orders.orstrax.io/orstrax-admin` will work again

#### Rollback Hub
```bash
orstrax.io  CNAME/A  <old-vercel-cname-or-ip>
```

### Partial Rollback

If only one surface has issues:
- Rollback that surface's DNS
- Keep other surfaces on new infrastructure
- Investigate and fix
- Re-cutover when ready

### Environment Variable Issues

If deployment fails due to missing env vars:
1. Don't rollback DNS yet
2. Add missing variables in Vercel project settings
3. Redeploy
4. Test again

---

## Success Criteria

Migration is successful when:

### Orders
- ✅ Merchants can log in
- ✅ Webhooks deliver correctly
- ✅ Theme Extension works
- ✅ Order sync functioning
- ✅ No error spike
- ✅ Performance acceptable

### Admin
- ✅ Platform admin accessible
- ✅ Cross-product data loads
- ✅ No authentication issues
- ✅ Metrics accurate

### Hub
- ✅ Public pages load
- ✅ All links work
- ✅ No broken images
- ✅ Mobile responsive

### Overall
- ✅ No customer complaints
- ✅ Error rates normal
- ✅ SSL certificates valid
- ✅ DNS propagated globally
- ✅ Independent deployments work

---

## Post-Cutover (T+24 Hours)

### Day 1 Review
- [ ] Review error logs
- [ ] Check webhook delivery success rate
- [ ] Verify merchant activity normal
- [ ] Confirm no support ticket spike
- [ ] Performance metrics within range

### Week 1 Tasks
- [ ] Monitor for any delayed issues
- [ ] Collect team feedback
- [ ] Document any unexpected behaviors
- [ ] Update internal documentation
- [ ] Plan for old project archival

### Week 2 Tasks
- [ ] Archive old Vercel project (after confirming stable)
- [ ] Update team bookmarks
- [ ] Close migration tickets
- [ ] Celebrate! 🎉

---

## Communication Plan

### Pre-Cutover
**To**: Engineering team  
**When**: T-24 hours  
**Message**: "Tomorrow we're migrating to split repos. Orders may have brief downtime for OAuth testing. Admin moving to admin.orstrax.io."

### During Cutover
**To**: Engineering team (Slack)  
**Message**: "Migration in progress. Admin up at admin.orstrax.io. Testing Orders OAuth now."

### Post-Cutover Success
**To**: Engineering team + Stakeholders  
**Message**: "✅ Migration complete. All three surfaces operational. Orders, Admin, Hub now independent."

### If Issues Arise
**To**: Engineering team (immediate)  
**Message**: "[URGENT] Migration issue with [surface]. Rolling back. Stand by."

---

## Key Contacts

- **Vercel Support**: https://vercel.com/support
- **Shopify Partner Support**: https://partners.shopify.com/support
- **DNS Provider Support**: <your provider>
- **On-call Engineer**: <name/contact>

---

## Final Checklist

Before starting cutover:
- [ ] All Vercel projects deploy successfully
- [ ] All environment variables confirmed
- [ ] Preview URLs tested
- [ ] Team notified
- [ ] Monitoring dashboards open
- [ ] Rollback plan ready
- [ ] DNS credentials ready
- [ ] This checklist printed/accessible

---

**Status**: Plan complete, ready for execution  
**Next**: Execute Vercel setup (Phase 3), then schedule cutover
