# Agent Prompts for @orstrax/ui Migration

Use these prompts for agents working on Orders, Admin, and Product Hub.

---

## For Orstrax Orders Agent

```
Migrate Orstrax Orders to use the new @orstrax/ui design system.

IMPORTANT CONTEXT:
- The design system is located at: https://github.com/orstrax/orstrax-ui
- The package name is: @orstrax/ui
- This is extracted from Orstrax Desk production UI
- Goal: Make Orders look like it belongs to the Orstrax family
- Preserve ALL business logic - only replace visual components

INSTALLATION:
1. Install the package:
   npm install git+https://github.com/orstrax/orstrax-ui.git#main

2. Import styles in your root layout (app/layout.tsx or equivalent):
   import "@orstrax/ui/styles.css";

3. Ensure you have Inter and Source Serif 4 fonts loaded with CSS variables:
   --font-inter and --font-source-serif

WHAT TO MIGRATE:

Phase 1 - Authentication Pages (Start Here):
- Replace login/signup layouts with <AuthLayout>
- Use these components from @orstrax/ui:
  - AuthLayout (for page structure)
  - AuthDescription (for subtitle)
  - AuthFooter (for footer links)
  - Input (for form inputs)
  - FormField (for label + input wrapper)
  - PrimaryButton (for submit buttons)

Example:
import { AuthLayout, AuthDescription, AuthFooter, Input, FormField, PrimaryButton } from "@orstrax/ui";
import Link from "next/link";

<AuthLayout
  productName="Orders"
  tagline="Smart order management."
  title="Welcome back."
  LinkComponent={Link}
>
  <AuthDescription>Sign in to manage your orders.</AuthDescription>
  <form>
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" />
    </FormField>
    <PrimaryButton type="submit">Sign in</PrimaryButton>
  </form>
  <AuthFooter>
    <a href="/privacy">Privacy</a>
    <span>© 2026 Orstrax LLC</span>
  </AuthFooter>
</AuthLayout>

Phase 2 - App Shell:
- Replace your main app layout with <OrstraxAppShell>
- Define your navigation structure
- Inject Orders-specific components (account menu, etc.)

Example:
import { OrstraxAppShell } from "@orstrax/ui";
import { ShoppingBag, Users, Settings } from "lucide-react";

<OrstraxAppShell
  productName="Orders"
  tagline="Smart order management."
  navigation={[
    {
      label: "Overview",
      items: [
        { href: "/", label: "Dashboard", icon: LayoutDashboard, active: pathname === "/" }
      ]
    },
    {
      label: "Orders",
      items: [
        { href: "/orders", label: "All orders", icon: ShoppingBag, active: pathname.startsWith("/orders") }
      ]
    }
  ]}
  user={{ displayName: currentUser.name, email: currentUser.email }}
  LinkComponent={Link}
>
  {children}
</OrstraxAppShell>

Phase 3 - UI Components:
Replace local components with @orstrax/ui equivalents:
- Button, PrimaryButton, SecondaryButton
- Input, Textarea, FormField
- Card, Panel
- Badge (with tones: success, pending, error, neutral)
- PageHeader
- EmptyState
- Metric (for stat cards)
- TextLink, Divider

REFERENCES:
- Complete guide: https://github.com/orstrax/orstrax-ui/blob/main/README.md
- Migration guide: https://github.com/orstrax/orstrax-ui/blob/main/MIGRATION.md
- Token reference: https://github.com/orstrax/orstrax-ui/blob/main/TOKENS.md
- Login example: https://github.com/orstrax/orstrax-ui/blob/main/examples/01-login-page.md
- App shell example: https://github.com/orstrax/orstrax-ui/blob/main/examples/02-app-shell.md

WHAT NOT TO MIGRATE:
- Keep ALL business logic (API calls, data fetching, state management)
- Keep Orders-specific features (order management, Shopify integration, etc.)
- Keep product-specific dashboards and workflows
- Only extract reusable VISUAL patterns

VISUAL GOAL:
Orders should look like it belongs to the Orstrax family:
- Same warm cream background
- Same navy active states
- Same typography (Inter + Source Serif 4)
- Same spacing and borders
- But maintain Orders-specific functionality

APPROACH:
Start with Phase 1 (auth pages) - low risk, easy to verify.
Then Phase 2 (app shell), then Phase 3 (components).
Test at each phase before proceeding.

Create a branch: cursor/migrate-to-orstrax-ui-[suffix]
Commit after each phase.
```

---

## For Orstrax Admin Agent

```
Migrate Orstrax Admin to use the new @orstrax/ui design system.

IMPORTANT CONTEXT:
- The design system is located at: https://github.com/orstrax/orstrax-ui
- The package name is: @orstrax/ui
- This is extracted from Orstrax Desk production UI
- Goal: Make Admin look like it belongs to the Orstrax family
- Preserve ALL business logic - only replace visual components

INSTALLATION:
1. Install the package:
   npm install git+https://github.com/orstrax/orstrax-ui.git#main

2. Import styles in your root layout (app/layout.tsx or equivalent):
   import "@orstrax/ui/styles.css";

3. Ensure you have Inter and Source Serif 4 fonts loaded with CSS variables:
   --font-inter and --font-source-serif

WHAT TO MIGRATE:

Phase 1 - Authentication Pages (Start Here):
- Replace login/signup layouts with <AuthLayout>
- Use these components from @orstrax/ui:
  - AuthLayout (for page structure)
  - AuthDescription (for subtitle)
  - AuthFooter (for footer links)
  - Input (for form inputs)
  - FormField (for label + input wrapper)
  - PrimaryButton (for submit buttons)

Example:
import { AuthLayout, AuthDescription, AuthFooter, Input, FormField, PrimaryButton } from "@orstrax/ui";
import Link from "next/link";

<AuthLayout
  productName="Admin"
  tagline="Platform administration."
  title="Welcome back."
  LinkComponent={Link}
>
  <AuthDescription>Sign in to the admin console.</AuthDescription>
  <form>
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" />
    </FormField>
    <PrimaryButton type="submit">Sign in</PrimaryButton>
  </form>
  <AuthFooter>
    <a href="/privacy">Privacy</a>
    <span>© 2026 Orstrax LLC</span>
  </AuthFooter>
</AuthLayout>

Phase 2 - App Shell:
- Replace your main app layout with <OrstraxAppShell>
- Define your navigation structure
- Inject Admin-specific components

Example:
import { OrstraxAppShell } from "@orstrax/ui";
import { Users, Shield, Settings, Database } from "lucide-react";

<OrstraxAppShell
  productName="Admin"
  tagline="Platform administration."
  navigation={[
    {
      label: "Overview",
      items: [
        { href: "/", label: "Dashboard", icon: LayoutDashboard, active: pathname === "/" }
      ]
    },
    {
      label: "Management",
      items: [
        { href: "/users", label: "Users", icon: Users, active: pathname.startsWith("/users") },
        { href: "/permissions", label: "Permissions", icon: Shield }
      ]
    }
  ]}
  user={{ displayName: currentUser.name, email: currentUser.email, role: "Admin" }}
  LinkComponent={Link}
>
  {children}
</OrstraxAppShell>

Phase 3 - UI Components:
Replace local components with @orstrax/ui equivalents:
- Button, PrimaryButton, SecondaryButton
- Input, Textarea, FormField
- Card, Panel
- Badge (with tones: success, pending, error, neutral)
- PageHeader
- EmptyState
- Metric (for stat cards)
- TextLink, Divider

REFERENCES:
- Complete guide: https://github.com/orstrax/orstrax-ui/blob/main/README.md
- Migration guide: https://github.com/orstrax/orstrax-ui/blob/main/MIGRATION.md
- Token reference: https://github.com/orstrax/orstrax-ui/blob/main/TOKENS.md
- Login example: https://github.com/orstrax/orstrax-ui/blob/main/examples/01-login-page.md
- App shell example: https://github.com/orstrax/orstrax-ui/blob/main/examples/02-app-shell.md

WHAT NOT TO MIGRATE:
- Keep ALL business logic
- Keep Admin-specific features (user management, permissions, system config)
- Keep product-specific dashboards and workflows
- Only extract reusable VISUAL patterns

VISUAL GOAL:
Admin should look like it belongs to the Orstrax family:
- Same warm cream background
- Same navy active states
- Same typography (Inter + Source Serif 4)
- Same spacing and borders
- But maintain Admin-specific functionality

APPROACH:
Start with Phase 1 (auth pages) - low risk, easy to verify.
Then Phase 2 (app shell), then Phase 3 (components).
Test at each phase before proceeding.

Create a branch: cursor/migrate-to-orstrax-ui-[suffix]
Commit after each phase.
```

---

## For Orstrax Product Hub Agent

```
Migrate Orstrax Product Hub to use the new @orstrax/ui design system.

IMPORTANT CONTEXT:
- The design system is located at: https://github.com/orstrax/orstrax-ui
- The package name is: @orstrax/ui
- This is extracted from Orstrax Desk production UI
- Goal: Make Product Hub look like it belongs to the Orstrax family
- Preserve ALL business logic - only replace visual components

INSTALLATION:
1. Install the package:
   npm install git+https://github.com/orstrax/orstrax-ui.git#main

2. Import styles in your root layout (app/layout.tsx or equivalent):
   import "@orstrax/ui/styles.css";

3. Ensure you have Inter and Source Serif 4 fonts loaded with CSS variables:
   --font-inter and --font-source-serif

WHAT TO MIGRATE:

Phase 1 - Authentication Pages (Start Here):
- Replace login/signup layouts with <AuthLayout>
- Use these components from @orstrax/ui:
  - AuthLayout (for page structure)
  - AuthDescription (for subtitle)
  - AuthFooter (for footer links)
  - Input (for form inputs)
  - FormField (for label + input wrapper)
  - PrimaryButton (for submit buttons)

Example:
import { AuthLayout, AuthDescription, AuthFooter, Input, FormField, PrimaryButton } from "@orstrax/ui";
import Link from "next/link";

<AuthLayout
  productName="Product Hub"
  tagline="Your product ecosystem."
  title="Welcome back."
  LinkComponent={Link}
>
  <AuthDescription>Sign in to your product hub.</AuthDescription>
  <form>
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" />
    </FormField>
    <PrimaryButton type="submit">Sign in</PrimaryButton>
  </form>
  <AuthFooter>
    <a href="/privacy">Privacy</a>
    <span>© 2026 Orstrax LLC</span>
  </AuthFooter>
</AuthLayout>

Phase 2 - App Shell:
- Replace your main app layout with <OrstraxAppShell>
- Define your navigation structure
- Inject Product Hub-specific components

Example:
import { OrstraxAppShell } from "@orstrax/ui";
import { Package, BarChart, Settings } from "lucide-react";

<OrstraxAppShell
  productName="Product Hub"
  tagline="Your product ecosystem."
  navigation={[
    {
      label: "Overview",
      items: [
        { href: "/", label: "Dashboard", icon: LayoutDashboard, active: pathname === "/" }
      ]
    },
    {
      label: "Products",
      items: [
        { href: "/products", label: "All products", icon: Package, active: pathname.startsWith("/products") },
        { href: "/analytics", label: "Analytics", icon: BarChart }
      ]
    }
  ]}
  user={{ displayName: currentUser.name, email: currentUser.email }}
  LinkComponent={Link}
>
  {children}
</OrstraxAppShell>

Phase 3 - UI Components:
Replace local components with @orstrax/ui equivalents:
- Button, PrimaryButton, SecondaryButton
- Input, Textarea, FormField
- Card, Panel
- Badge (with tones: success, pending, error, neutral)
- PageHeader
- EmptyState
- Metric (for stat cards)
- TextLink, Divider

REFERENCES:
- Complete guide: https://github.com/orstrax/orstrax-ui/blob/main/README.md
- Migration guide: https://github.com/orstrax/orstrax-ui/blob/main/MIGRATION.md
- Token reference: https://github.com/orstrax/orstrax-ui/blob/main/TOKENS.md
- Login example: https://github.com/orstrax/orstrax-ui/blob/main/examples/01-login-page.md
- App shell example: https://github.com/orstrax/orstrax-ui/blob/main/examples/02-app-shell.md

WHAT NOT TO MIGRATE:
- Keep ALL business logic
- Keep Product Hub-specific features
- Keep product-specific dashboards and workflows
- Only extract reusable VISUAL patterns

VISUAL GOAL:
Product Hub should look like it belongs to the Orstrax family:
- Same warm cream background
- Same navy active states
- Same typography (Inter + Source Serif 4)
- Same spacing and borders
- But maintain Product Hub-specific functionality

APPROACH:
Start with Phase 1 (auth pages) - low risk, easy to verify.
Then Phase 2 (app shell), then Phase 3 (components).
Test at each phase before proceeding.

Create a branch: cursor/migrate-to-orstrax-ui-[suffix]
Commit after each phase.
```

---

## Quick Reference for All Agents

### Available Components

```typescript
// Brand
import { OrstraxProductBrand } from "@orstrax/ui";

// Layouts
import { AuthLayout, AuthDescription, AuthFooter } from "@orstrax/ui";
import { OrstraxAppShell } from "@orstrax/ui";

// UI Primitives
import {
  Button, PrimaryButton, SecondaryButton,
  Input, Textarea, FormField,
  Card, Panel,
  Badge,
  PageHeader,
  EmptyState,
  Metric,
  TextLink,
  Divider
} from "@orstrax/ui";

// Styles
import "@orstrax/ui/styles.css";
```

### Design Tokens

```typescript
import { colors, typography, spacing, radius } from "@orstrax/ui";

// Or use CSS variables directly:
// --orx-bg, --orx-surface, --orx-ink, --orx-muted
// --orx-line, --orx-navy, --orx-accent
```

### Common Patterns

**Product Name Variants:**
- Orders: "Smart order management."
- Admin: "Platform administration."
- Product Hub: "Your product ecosystem."

**Navigation Structure:**
Each product defines its own nav items, but structure is consistent:
```typescript
navigation={[
  {
    label: "Section Name",
    items: [
      { href: "/path", label: "Label", icon: IconComponent, active: boolean }
    ]
  }
]}
```

**Testing Checklist:**
- [ ] Login page looks correct (desktop/mobile)
- [ ] Warm cream background
- [ ] Navy active states
- [ ] Form inputs work
- [ ] Authentication still functions
- [ ] App shell renders
- [ ] Navigation works
- [ ] Mobile drawer opens

---

## Success Criteria for Each Agent

✅ **Phase 1 Complete** when:
- Auth pages use AuthLayout
- Visual appearance matches Orstrax Desk style
- All authentication functionality works

✅ **Phase 2 Complete** when:
- App uses OrstraxAppShell
- Navigation renders correctly
- Product-specific features still work

✅ **Phase 3 Complete** when:
- UI components replaced
- No visual regressions
- Code is cleaner/shorter

**Overall Success:** Product looks like Orstrax family member while maintaining its unique functionality.
