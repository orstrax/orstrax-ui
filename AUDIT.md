# Desk UI Audit Report

Comprehensive analysis of Orstrax Desk UI components and what was extracted into `@orstrax/ui`.

## Audit Date
September 6, 2026

## Source Repository
`orstrax/orstrax-desk` (production codebase)

---

## 1. Brand Assets

### ✅ EXTRACTED AS SHARED

| Asset | Location in Desk | Extracted To | Notes |
|-------|------------------|--------------|-------|
| Orstrax wordmark PNG | `/public/orstrax-wordmark.png` | `src/assets/orstrax-wordmark.png` | Canonical shared asset |
| DeskWordmark component | `src/components/brand/desk-wordmark.tsx` | `src/components/OrstraxProductBrand.tsx` | Generalized for all products |

### ❌ KEPT DESK-SPECIFIC

- Desk-specific favicon/icons
- Other tenant brand assets (Ecloras, Financial Fern, etc.)

---

## 2. Typography

### ✅ EXTRACTED AS SHARED

| Element | Desk Implementation | Extracted To |
|---------|---------------------|--------------|
| UI Font (Inter) | `--font-inter` variable | `tokens/index.ts` + CSS |
| Display Font (Source Serif 4) | `--font-source-serif` variable | `tokens/index.ts` + CSS |
| `.desk-display` class | `globals.css` | `styles.css` |
| Font loading | `app/layout.tsx` | Documented in README |

**Values:**
- Inter: 400-600 weight, normal spacing
- Source Serif 4: 600 weight, -0.02em letter spacing

---

## 3. Color Tokens

### ✅ EXTRACTED AS SHARED

All core Orstrax colors extracted exactly as used in Desk:

| Token | Value | Desk Usage |
|-------|-------|------------|
| `--orx-bg` | `#f4efe6` | Warm cream background |
| `--orx-surface` | `#fffcf7` | Card/modal surfaces |
| `--orx-ink` | `#1c1915` | Primary text |
| `--orx-muted` | `#6f675c` | Secondary text |
| `--orx-line` | `#e4dcd0` | Borders |
| `--orx-navy` | `#1f2a37` | Active states, primary actions |
| `--orx-accent` | `#2f5da8` | Links, interactive elements |

### ❌ NORMALIZATION APPLIED

Minor inconsistencies in Desk were normalized:
- Some grays (slate-600) → Standardized to `--orx-muted`
- Some blues → Standardized to `--orx-accent` or `--orx-navy`

---

## 4. Spacing & Layout

### ✅ EXTRACTED AS SHARED

| Token | Value | Desk Usage |
|-------|-------|------------|
| `xs` | 0.25rem (4px) | Minimal gaps |
| `sm` | 0.5rem (8px) | Compact spacing |
| `md` | 0.75rem (12px) | Standard spacing |
| `lg` | 1rem (16px) | Comfortable spacing |
| `xl` | 1.5rem (24px) | Section gaps |
| `2xl` | 2rem (32px) | Large gaps |
| `3xl` | 3rem (48px) | Major sections |

**Common patterns:**
- Sidebar: 1rem padding
- Cards: 1rem padding
- Page margins: 1rem mobile, 2rem desktop
- Nav items: 0.75rem 1rem padding

---

## 5. Border Radius

### ✅ EXTRACTED AS SHARED

| Token | Value | Desk Usage |
|-------|-------|------------|
| `default` | 0.625rem (10px) | `var(--orx-radius)`, most elements |
| `sm` | 0.5rem (8px) | Inputs, compact elements |
| `lg` | 0.75rem (12px) | Large cards |
| `button` | 0.5rem (8px) | Buttons |
| `full` | 9999px | Pills, avatars |

### ❌ NORMALIZATION APPLIED

- Some cards used 8px, some 10px → Standardized to 10px for cards
- Button radius kept at 8px (matches Desk `rounded-lg`)

---

## 6. Components Extracted

### ✅ Brand Components

| Desk Component | Extracted As | Changes |
|----------------|--------------|---------|
| `DeskWordmark` | `OrstraxProductBrand` | Generalized for all products, same visual treatment |

### ✅ Layout Components

| Desk Pattern | Extracted As | Changes |
|--------------|--------------|---------|
| Login/signup page layout | `AuthLayout` | Exact visual preservation, decorative lines included |
| Internal app shell + sidebar | `OrstraxAppShell` | Navigation logic made injectable, visual shell preserved |

### ✅ UI Primitives

| Desk Component | Extracted As | File | Changes |
|----------------|--------------|------|---------|
| `PrimaryButton` | `PrimaryButton` | `ui.tsx` | Exact copy |
| `SecondaryButton` | `SecondaryButton` | `ui.tsx` | Exact copy |
| `desk-input` styling | `Input` | `ui.tsx` | Exact copy |
| N/A | `Textarea` | `ui.tsx` | Extracted from pattern |
| Form label pattern | `FormField` | `ui.tsx` | Extracted from pattern |
| `Panel` | `Card`/`Panel` | `ui.tsx` | Exact copy |
| `Badge` | `Badge` | `ui.tsx` | Exact copy |
| `PageHeader` | `PageHeader` | `ui.tsx` | Exact copy |
| `EmptyState` | `EmptyState` | `ui.tsx` | Exact copy |
| `Metric` | `Metric` | `ui.tsx` | Exact copy |
| `TextLink` | `TextLink` | `ui.tsx` | Exact copy |
| `initials()` utility | `initials()` | `ui.tsx` | Exact copy |

---

## 7. Components NOT Extracted (Desk-Specific)

### ❌ KEPT DESK-SPECIFIC

These remain in Desk because they contain product-specific logic:

| Component | Reason |
|-----------|--------|
| `AccountMenu` | Contains logout logic, Desk-specific menu items |
| `CommandPalette` | Product-specific search/commands |
| `TenantSwitcher` | Desk multi-tenant logic |
| `DeskShell` | Specific nav structure, permissions, ticket badges |
| `TicketWorkspace` | Ticket-specific UI |
| `ArticleEditor` | Knowledge base editor with TipTap |
| `SetupWizard` | Desk onboarding flow |
| `TeamManager` | Desk team management |
| `CategoryManager` | Knowledge base categories |
| `DomainManager` | Help center domains |
| `IntegrationsClient` | Shopify/external integrations |
| All `/api/*` routes | Backend logic |
| All ticket/article CRUD | Business logic |

**Rationale:** These components mix visual presentation with Desk-specific business logic. Only the reusable visual patterns were extracted.

---

## 8. CSS Classes & Utilities

### ✅ EXTRACTED AS SHARED

| Class | Purpose | Location |
|-------|---------|----------|
| `.desk-app` | App context wrapper | `styles.css` |
| `.desk-login` | Auth page wrapper | `styles.css` |
| `.desk-marketing` | Marketing page wrapper | `styles.css` |
| `.desk-display` | Serif display typography | `styles.css` |
| `.desk-input` | Input styling | `styles.css` |
| `.desk-marketing-header` | Marketing header background | `styles.css` |

### ✅ CSS Custom Properties

All `--orx-*` variables extracted for runtime theming.

---

## 9. Responsive Behavior

### ✅ EXTRACTED AS SHARED

| Pattern | Desk Implementation | Extracted |
|---------|---------------------|-----------|
| Sidebar hide/show | Hidden < 768px, visible ≥ 768px | ✅ `OrstraxAppShell` |
| Mobile nav drawer | Full-screen drawer < 768px | ✅ `OrstraxAppShell` |
| Brand size scaling | `sm:h-9` responsive classes | ✅ `OrstraxProductBrand` |
| Grid → Stack | Various breakpoints | 📝 Documented pattern |

---

## 10. Authentication Pages

### ✅ EXTRACTED AS SHARED

| Element | Desk Implementation | Extracted |
|---------|---------------------|-----------|
| Layout structure | Max-width container, centered | ✅ `AuthLayout` |
| Decorative SVG lines | Left side, navy, 18% opacity | ✅ `AuthLayout` |
| Brand treatment | Large wordmark + product name | ✅ `AuthLayout` + `OrstraxProductBrand` |
| Display title | `.desk-display` serif heading | ✅ `AuthLayout` |
| Form spacing | `mt-8 space-y-4` | 📝 Documented |
| Footer | Small links at bottom | ✅ `AuthFooter` |

### ❌ KEPT DESK-SPECIFIC

- Firebase authentication logic
- Password reset flow
- Email verification
- Session management
- Redirect logic

**Rationale:** `AuthLayout` provides the visual shell only. Each product keeps its own auth logic.

---

## 11. Navigation Patterns

### ✅ EXTRACTED AS SHARED

| Pattern | Implementation |
|---------|----------------|
| Sidebar structure | 240px width, sectioned nav groups |
| Active state | Navy background, white text |
| Hover state | Surface background |
| Nav group labels | 10px uppercase semibold muted |
| Badge indicators | Small dot + count on nav items |
| Mobile drawer | Full-height, same nav structure |

### ❌ KEPT DESK-SPECIFIC

- Exact nav items (Tickets, Articles, etc.)
- Permissions logic
- Tenant switching
- Platform admin sections

---

## 12. Forms

### ✅ EXTRACTED AS SHARED

| Element | Extracted |
|---------|-----------|
| Input styling | ✅ `Input` |
| Textarea styling | ✅ `Textarea` |
| Label + input pattern | ✅ `FormField` |
| Error message styling | ✅ `FormField` |
| Button styling | ✅ `PrimaryButton`, `SecondaryButton` |

### ❌ KEPT DESK-SPECIFIC

- Validation logic
- Form submission handlers
- API integrations
- Complex multi-step forms

---

## 13. Empty States & Feedback

### ✅ EXTRACTED AS SHARED

| Component | Status |
|-----------|--------|
| `EmptyState` | ✅ Extracted |
| Error styling | ✅ Red text pattern documented |
| Success styling | ✅ Green text pattern documented |
| Loading states | 📝 Pattern documented |

### ❌ KEPT DESK-SPECIFIC

- Toast notifications (too coupled to Desk state)
- Specific empty state content
- Loading spinners (product-specific)

---

## 14. Tables & Data Display

### ❌ KEPT DESK-SPECIFIC

Tables are very product-specific in Desk:
- Ticket tables
- Article lists
- Team member lists
- Audit logs

**Decision:** Each product will have its own table implementations based on data structure.

**Shared pattern documented:** Card + border styling can be applied to tables.

---

## 15. Modals & Dialogs

### ❌ NOT EXTRACTED YET

Desk has modal patterns but they're inconsistent across the app.

**Future consideration:** Extract a standard `Modal` component once patterns are clearer.

---

## 16. Icons

### ❌ NOT EXTRACTED

Desk uses `lucide-react` icons. Each product can choose its own icon library.

**Recommendation:** Document which icons Desk uses for common actions.

---

## Visual Comparison Checklist

### Key Surfaces to Verify

After Desk migrates to `@orstrax/ui`, compare:

- [ ] **Login page (desktop)**
  - Warm cream background
  - Decorative lines on left
  - Large serif title
  - Navy button
  
- [ ] **Login page (mobile)**
  - Proper spacing
  - No decorative lines
  - Readable form

- [ ] **Internal UI (desktop)**
  - Sidebar styling
  - Navy active states
  - Proper spacing
  - Brand in sidebar

- [ ] **Internal UI (mobile)**
  - Mobile menu button
  - Drawer navigation
  - Header layout

- [ ] **Forms**
  - Input styling
  - Border colors
  - Focus states
  - Button styling

- [ ] **Cards**
  - Surface color
  - Border color
  - Radius
  - Shadows (minimal)

- [ ] **Navigation**
  - Active state (navy bg, white text)
  - Hover state (surface bg)
  - Badge indicators
  - Group labels

---

## Inventory Summary

### Extracted to `@orstrax/ui`

✅ **7 design token categories**
✅ **1 brand component** (`OrstraxProductBrand`)
✅ **2 layout components** (`AuthLayout`, `OrstraxAppShell`)
✅ **13 UI primitives** (Button, Input, Card, Badge, etc.)
✅ **1 CSS file** with all core styles
✅ **1 utility function** (`initials`)

### Kept Desk-Specific

❌ **28+ components** with business logic
❌ **All API routes** and backend logic
❌ **All ticket/article workflows**
❌ **Authentication logic**
❌ **Multi-tenant logic**
❌ **Command palette**
❌ **Rich text editor**

---

## Conclusion

The shared package successfully extracts **the reusable visual language** of Desk while keeping **product-specific logic** in Desk.

**Desk should look essentially unchanged** after migrating to `@orstrax/ui`.

Other Orstrax products can now adopt the same visual language while maintaining their own product-specific implementations.
