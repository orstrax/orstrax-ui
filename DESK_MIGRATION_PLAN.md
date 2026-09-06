# Desk Migration Plan

Step-by-step plan for migrating Orstrax Desk to use `@orstrax/ui`.

---

## Overview

**Goal:** Replace Desk's local design components with `@orstrax/ui` while maintaining **identical visual appearance**.

**Success Criteria:** Desk looks exactly the same after migration.

**Timeline:** Phased approach with visual verification at each step.

---

## Pre-Migration Checklist

### 1. Capture Baseline Screenshots

Before making any changes, capture reference screenshots:

```bash
# Create screenshots directory
mkdir -p desk-migration-screenshots/before

# Capture key surfaces (manual or automated)
# - Login page (desktop)
# - Login page (mobile 375px)
# - Signup page (desktop)
# - App dashboard (desktop)
# - App dashboard with sidebar (desktop)
# - App mobile with drawer open
# - Tickets page
# - Articles page
# - Settings page
# - Empty states
# - Forms
```

### 2. Install Package

```bash
cd orstrax-desk
npm install @orstrax/ui@latest
```

### 3. Verify Fonts Already Loaded

Desk already has Inter and Source Serif 4:

```tsx
// app/layout.tsx - ALREADY EXISTS
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });
```

✅ No font changes needed.

### 4. Import Styles

```tsx
// app/layout.tsx
import "@orstrax/ui/styles.css"; // Add this import
import "./globals.css";
```

---

## Phase 1: Auth Pages (Low Risk)

**Estimated Impact:** ~150 lines removed  
**Risk Level:** Low (separate from main app)  
**Test Surface:** Login, signup, password reset pages

### Step 1.1: Migrate Login Page

**File:** `src/app/desk/login/page.tsx`

**Changes:**
1. Replace entire layout code with `<AuthLayout>`
2. Replace `<DeskWordmark>` with integrated brand
3. Replace form inputs with `<Input>` and `<FormField>`
4. Replace button with `<PrimaryButton>`
5. Keep ALL Firebase auth logic unchanged

**Code Diff:**
- Remove: 61 lines (layout, SVG, brand positioning)
- Add: 0 lines (use AuthLayout)
- Business logic: Unchanged

**See:** [examples/01-login-page.md](./examples/01-login-page.md)

### Step 1.2: Migrate Signup Page

**File:** `src/app/desk/signup/page.tsx`

**Changes:** Same as login page
- Use `<AuthLayout>` with title="Create your account."
- Same component replacements

### Step 1.3: Visual Verification

```bash
# Run dev server
npm run dev

# Compare screenshots
mkdir -p desk-migration-screenshots/phase1
# Capture same pages as baseline
# Compare side-by-side

# Check:
# ✓ Warm cream background
# ✓ Decorative lines (desktop)
# ✓ Large serif title
# ✓ Brand treatment
# ✓ Button styling
# ✓ Input styling
# ✓ Footer
# ✓ Mobile behavior
```

**If any differences:** Revert and investigate.

### Step 1.4: Commit Phase 1

```bash
git add -A
git commit -m "Phase 1: Migrate auth pages to @orstrax/ui

- Replace login page layout with AuthLayout
- Replace signup page layout with AuthLayout
- Use Input, FormField, PrimaryButton components
- Keep all Firebase auth logic unchanged
- Visual appearance identical

Files changed:
- app/desk/login/page.tsx (-61 lines)
- app/desk/signup/page.tsx (-65 lines)"

git push
```

---

## Phase 2: Brand Component (Low Risk)

**Estimated Impact:** ~30 lines removed  
**Risk Level:** Low (simple component replacement)  
**Test Surface:** Anywhere brand appears

### Step 2.1: Replace DeskWordmark Component

**Files to change:**
- All files importing `@/components/brand/desk-wordmark`

**Find usages:**
```bash
cd orstrax-desk
grep -r "DeskWordmark" --include="*.tsx" --include="*.ts" src/
```

**Replace:**
```tsx
// Before
import { DeskWordmark } from "@/components/brand/desk-wordmark";
<DeskWordmark size="lg" href="/" />

// After
import { OrstraxProductBrand } from "@orstrax/ui";
import Link from "next/link";
<OrstraxProductBrand productName="Desk" size="lg" href="/" LinkComponent={Link} />
```

### Step 2.2: Delete Old Component

```bash
rm src/components/brand/desk-wordmark.tsx
# Keep the directory if other brand files exist
```

### Step 2.3: Visual Verification

Check all pages where brand appears:
- ✓ Login page
- ✓ Signup page
- ✓ App header
- ✓ Sidebar
- ✓ Marketing pages

### Step 2.4: Commit Phase 2

```bash
git add -A
git commit -m "Phase 2: Replace DeskWordmark with OrstraxProductBrand

- Replace local DeskWordmark component
- Use OrstraxProductBrand from @orstrax/ui
- Visual appearance identical
- Same wordmark asset used

Files changed:
- Deleted: components/brand/desk-wordmark.tsx
- Updated: All files importing DeskWordmark"

git push
```

---

## Phase 3: App Shell (Medium Risk)

**Estimated Impact:** ~135 lines removed  
**Risk Level:** Medium (central navigation component)  
**Test Surface:** All internal app pages

### Step 3.1: Prepare Navigation Structure

Create a helper to transform Desk's nav to shell format:

```tsx
// lib/desk-navigation.ts
import type { NavGroup } from "@orstrax/ui";
import { 
  LayoutDashboard, 
  Ticket, 
  BookOpen, 
  // ... import all icons
} from "lucide-react";

export function getDeskNavigation(pathname: string, unreadTickets: number): NavGroup[] {
  return [
    {
      label: "Overview",
      items: [
        { 
          href: "/app", 
          label: "Overview", 
          icon: LayoutDashboard,
          active: pathname === "/app"
        }
      ]
    },
    {
      label: "Support",
      items: [
        { 
          href: "/app/tickets", 
          label: "Tickets", 
          icon: Ticket,
          active: pathname.startsWith("/app/tickets"),
          badge: unreadTickets > 0 ? unreadTickets : undefined
        }
      ]
    },
    // ... more groups
  ];
}
```

### Step 3.2: Replace DeskShell

**File:** `src/components/desk/desk-shell.tsx`

**Changes:**
1. Import `OrstraxAppShell` from `@orstrax/ui`
2. Use `getDeskNavigation()` helper
3. Pass Desk-specific components via `renderAccountMenu`
4. Remove all layout/sidebar/header code (135 lines)

**See:** [examples/02-app-shell.md](./examples/02-app-shell.md)

### Step 3.3: Keep Desk-Specific Components

**DO NOT MIGRATE** (keep as-is):
- `AccountMenu` - Desk logout logic
- `TenantSwitcher` - Multi-tenant UI
- `CommandPalette` - Search functionality

These are injected into the shell.

### Step 3.4: Visual Verification

**Critical checks:**
```bash
# Desktop
# ✓ Sidebar width (240px)
# ✓ Navy active states
# ✓ Navigation grouping
# ✓ Badge indicators (unread tickets)
# ✓ Account menu
# ✓ Tenant switcher

# Mobile
# ✓ Drawer navigation
# ✓ Header layout
# ✓ Menu button
```

**Test navigation:**
- Click through all nav items
- Verify active states
- Check badge counts
- Test mobile drawer

### Step 3.5: Commit Phase 3

```bash
git add -A
git commit -m "Phase 3: Replace DeskShell with OrstraxAppShell

- Replace custom shell with @orstrax/ui AppShell
- Create getDeskNavigation helper
- Inject Desk-specific components (AccountMenu, TenantSwitcher)
- Keep all business logic unchanged
- Visual appearance identical

Files changed:
- components/desk/desk-shell.tsx (-135 lines)
- lib/desk-navigation.ts (new helper)

Code reduction: 59%"

git push
```

---

## Phase 4: UI Primitives (Low Risk)

**Estimated Impact:** ~200 lines removed  
**Risk Level:** Low (simple component replacements)  
**Test Surface:** Forms, buttons, cards throughout app

### Step 4.1: Replace Buttons

Find all button components:
```bash
grep -r "PrimaryButton\|SecondaryButton" --include="*.tsx" src/components/desk/
```

**Replace imports:**
```tsx
// Before
import { PrimaryButton, SecondaryButton } from "@/components/desk/ui";

// After
import { PrimaryButton, SecondaryButton } from "@orstrax/ui";
```

### Step 4.2: Replace Inputs

```tsx
// Before
<input className="desk-input" />

// After
import { Input } from "@orstrax/ui";
<Input />
```

### Step 4.3: Replace Cards, Badges, etc.

```tsx
// Before
import { Card, Badge, PageHeader, EmptyState } from "@/components/desk/ui";

// After
import { Card, Badge, PageHeader, EmptyState } from "@orstrax/ui";
```

### Step 4.4: Delete Old UI File

```bash
rm src/components/desk/ui.tsx
```

### Step 4.5: Commit Phase 4

```bash
git add -A
git commit -m "Phase 4: Replace UI primitives with @orstrax/ui

- Replace buttons, inputs, cards from local components
- Use components from @orstrax/ui package
- Visual appearance identical
- Deleted local ui.tsx

Files changed:
- Deleted: components/desk/ui.tsx
- Updated: All files importing UI components

Code reduction: ~200 lines"

git push
```

---

## Phase 5: Clean Globals CSS (Low Risk)

**File:** `src/app/globals.css`

### Step 5.1: Review CSS

The package provides:
- All `--orx-*` variables
- `.desk-app`, `.desk-login` classes
- `.desk-display`, `.desk-input` classes

### Step 5.2: Remove Duplicates

Remove from `globals.css`:
```css
/* REMOVE - now in @orstrax/ui/styles.css */
.desk-app {
  --orx-bg: #f4efe6;
  /* ... */
}

.desk-login,
.desk-marketing {
  /* ... */
}

.desk-display {
  /* ... */
}

.desk-input {
  /* ... */
}
```

**Keep in globals.css:**
- Desk-specific overrides
- TipTap editor styles
- Any product-specific CSS

### Step 5.3: Commit Phase 5

```bash
git add -A
git commit -m "Phase 5: Clean up globals.css

- Remove CSS now provided by @orstrax/ui
- Keep Desk-specific styles (editor, etc.)
- Visual appearance identical

Files changed:
- app/globals.css (-80 lines)"

git push
```

---

## Phase 6: Final Verification

### Step 6.1: Full Visual Regression

```bash
mkdir -p desk-migration-screenshots/after

# Capture exact same pages as "before"
# Compare side-by-side
```

**Checklist:**
- [ ] Login page (desktop) - Identical
- [ ] Login page (mobile) - Identical
- [ ] Signup page (desktop) - Identical
- [ ] App dashboard - Identical
- [ ] Sidebar styling - Identical
- [ ] Navigation active states - Identical
- [ ] Mobile drawer - Identical
- [ ] Forms - Identical
- [ ] Buttons - Identical
- [ ] Cards - Identical
- [ ] Badges - Identical
- [ ] Empty states - Identical

### Step 6.2: Functional Testing

- [ ] Login flow works
- [ ] Signup flow works
- [ ] Navigation works
- [ ] Active states update correctly
- [ ] Mobile drawer opens/closes
- [ ] Tenant switching works
- [ ] Account menu works
- [ ] Forms submit correctly
- [ ] Badges show correct counts

### Step 6.3: Performance Check

```bash
npm run build

# Check bundle sizes
# Ensure no significant increase
```

---

## Rollback Plan

If any issues arise:

```bash
# Revert entire migration
git revert <phase-commit-sha>

# Or revert specific phase
git revert <phase-3-commit-sha>
```

**Progressive rollback:**
1. Revert last phase first
2. Test
3. If still broken, revert previous phase
4. Continue until working

---

## Post-Migration

### Update Package Lock

```bash
npm install
git add package-lock.json
git commit -m "Update package lock after @orstrax/ui migration"
```

### Documentation

Update Desk's README:

```markdown
## Design System

Desk uses the shared [@orstrax/ui](https://github.com/orstrax/orstrax-ui) 
design system for visual components.

For design changes that should apply across all Orstrax products, 
update the @orstrax/ui package.

For Desk-specific features, add components locally.
```

### Monitor

- Watch for visual regression reports
- Monitor user feedback
- Check analytics for any drops in engagement

---

## Summary

| Phase | Risk | Lines Removed | Test Surface |
|-------|------|---------------|--------------|
| 1. Auth Pages | Low | ~150 | Login, signup |
| 2. Brand | Low | ~30 | All brand usage |
| 3. App Shell | Medium | ~135 | All app pages |
| 4. UI Primitives | Low | ~200 | Forms, buttons |
| 5. Clean CSS | Low | ~80 | All styling |
| **Total** | - | **~595** | **Full app** |

**Code Reduction:** ~595 lines (35% of UI code)  
**Visual Changes:** Zero (identical appearance)  
**Business Logic:** Unchanged  
**Estimated Duration:** Phased over testing cycles

---

## Success Metrics

✅ **Visual fidelity:** Desk looks identical  
✅ **Code reduction:** ~595 lines removed  
✅ **No regressions:** All functionality works  
✅ **Type safety:** Full TypeScript support  
✅ **Build success:** No errors  
✅ **Performance:** No degradation
