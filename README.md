# @orstrax/ui

Shared design system for Orstrax-branded products, extracted directly from **Orstrax Desk** production UI.

## Overview

This package provides the reusable visual language of Orstrax Desk so other Orstrax-branded products (Orders, Admin, Product Hub) can maintain visual consistency within the Orstrax family.

**Important:** Desk is the **canonical visual reference**. This package formalizes what already exists and works in production.

## Installation

```bash
npm install @orstrax/ui
```

## Key Principles

1. **Desk is the source of truth** - All visual patterns are extracted from the current Desk production UI
2. **Preserve the existing look** - The goal is NOT to redesign Desk, but to extract its visual language
3. **Shared visual DNA** - Same typography, colors, spacing, surfaces, navigation language
4. **Product-specific flexibility** - Dashboards, tables, and workflows remain product-specific

## What This Package Includes

### Design Tokens
- Colors (warm cream backgrounds, navy surfaces, accent blue)
- Typography (Inter UI font, Source Serif 4 display font)
- Spacing scale
- Border radii
- CSS custom properties

### Brand Components
- `OrstraxProductBrand` - Canonical wordmark + product name treatment

### Layout Components
- `AuthLayout` - Login/signup page layout
- `OrstraxAppShell` - Internal application shell with sidebar and navigation

### UI Components
- Buttons (Primary, Secondary)
- Form inputs (Input, Textarea, FormField)
- Cards and Panels
- Badges
- Page headers
- Empty states
- Metrics
- Dividers
- Links

## Usage

### 1. Install Fonts

Orstrax UI requires **Inter** (UI text) and **Source Serif 4** (display headings).

#### Next.js Example:

```tsx
import { Inter, Source_Serif_4 } from "next/font/google";
import "@orstrax/ui/styles.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Product Branding

The canonical Orstrax brand treatment: `[wordmark] + [product name]`

```tsx
import { OrstraxProductBrand } from "@orstrax/ui";

// Simple usage
<OrstraxProductBrand productName="Orders" />

// With link (using Next.js Link)
import Link from "next/link";
<OrstraxProductBrand 
  productName="Orders" 
  size="lg" 
  href="/"
  LinkComponent={Link}
/>

// Different sizes
<OrstraxProductBrand productName="Admin" size="sm" />
<OrstraxProductBrand productName="Admin" size="md" />
<OrstraxProductBrand productName="Admin" size="lg" />
```

### 3. Authentication Layout

The beautiful Desk login page layout, now reusable:

```tsx
import { AuthLayout, AuthDescription, AuthFooter } from "@orstrax/ui";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout
      productName="Orders"
      tagline="Smart order management."
      title="Welcome back."
      LinkComponent={Link}
    >
      <AuthDescription>
        Sign in to manage your orders.
      </AuthDescription>
      
      <form className="mt-8 space-y-4">
        {/* Your login form */}
      </form>
      
      <AuthFooter>
        <a href="/privacy">Privacy</a>
        <a href="/help">Help</a>
        <span>© 2026 Orstrax LLC</span>
      </AuthFooter>
    </AuthLayout>
  );
}
```

### 4. Application Shell

The internal app layout with sidebar and navigation:

```tsx
import { OrstraxAppShell } from "@orstrax/ui";
import { ShoppingBag, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function AppLayout({ children }) {
  return (
    <OrstraxAppShell
      productName="Orders"
      tagline="Smart order management."
      navigation={[
        {
          label: "Overview",
          items: [
            { href: "/", label: "Dashboard", icon: LayoutDashboard, active: true }
          ]
        },
        {
          label: "Orders",
          items: [
            { href: "/orders", label: "All orders", icon: ShoppingBag, badge: 5 },
            { href: "/customers", label: "Customers", icon: Users }
          ]
        },
        {
          label: "Settings",
          items: [
            { href: "/settings", label: "Settings", icon: Settings }
          ]
        }
      ]}
      user={{
        displayName: "Jane Doe",
        email: "jane@example.com",
        role: "Admin"
      }}
      helpHref="/help"
      LinkComponent={Link}
    >
      {children}
    </OrstraxAppShell>
  );
}
```

### 5. UI Components

```tsx
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  Input,
  Textarea,
  FormField,
  Card,
  Badge,
  PageHeader,
  EmptyState,
  Metric,
  Divider,
  TextLink,
} from "@orstrax/ui";

// Buttons
<PrimaryButton>Save changes</PrimaryButton>
<SecondaryButton>Cancel</SecondaryButton>
<Button variant="primary">Submit</Button>

// Forms
<FormField label="Email" htmlFor="email" error={errors.email}>
  <Input id="email" type="email" />
</FormField>

<FormField label="Message" htmlFor="message">
  <Textarea id="message" rows={4} />
</FormField>

// Cards
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Badges
<Badge tone="success">Published</Badge>
<Badge tone="pending">Draft</Badge>
<Badge tone="neutral">Archived</Badge>

// Page Headers
<PageHeader
  title="Orders"
  description="Manage your customer orders"
  actions={<PrimaryButton>New order</PrimaryButton>}
/>

// Empty States
<EmptyState
  title="No orders yet"
  body="Orders will appear here once customers start placing them."
  action={<PrimaryButton>Create test order</PrimaryButton>}
/>

// Metrics
<Metric label="Total Orders" value="1,234" hint="Last 30 days" />
```

### 6. Design Tokens

```tsx
import { colors, typography, spacing, radius } from "@orstrax/ui";

// Use in your styles or components
const customStyle = {
  backgroundColor: colors.surface,
  color: colors.ink,
  borderRadius: radius.default,
  padding: spacing.lg,
};
```

## Products Using This Package

- ✅ **Orstrax Desk** (original source, migration in progress)
- 🔄 **Orstrax Orders** (ready for migration)
- 🔄 **Orstrax Admin** (ready for migration)
- 🔄 **Orstrax Product Hub** (ready for migration)

## Products NOT Using This Package

These remain independent brands:
- ❌ Ecloras
- ❌ Financial Fern  
- ❌ Sunday Maker

## Contributing

### Adding New Shared Components

Only extract components that:
1. Already exist in Desk with a clear, stable pattern
2. Are genuinely reusable across multiple Orstrax products
3. Represent core visual language, not product-specific logic

### Desk-Specific vs. Shared

**Extract as shared:**
- Brand treatment
- Auth layouts
- App shell structure
- Form controls
- Cards, badges, buttons
- Typography, colors, spacing
- Navigation patterns

**Keep product-specific:**
- Ticket workflows
- Order management tables
- Shopify integrations
- Analytics dashboards
- Business logic

## Visual Regression Testing

Before publishing changes:
1. Test in Desk - should look unchanged
2. Compare login page before/after
3. Compare internal UI before/after
4. Verify mobile navigation
5. Check forms and buttons

If Desk looks "different but cleaner" after migration, that's a regression.

## Versioning & Publishing

This package uses semantic versioning and **automatic publishing**:

- **Major**: Breaking API changes
- **Minor**: New components/features (backwards compatible)
- **Patch**: Bug fixes, visual refinements

### Automatic Publishing Workflow

Changes merged to `main` automatically publish to npm:

1. **Make your changes** in a feature branch
2. **Bump the version** in `package.json` according to semantic versioning
3. **Create a PR** and get it reviewed
4. **Merge to main** - GitHub Actions automatically:
   - Builds the package
   - Publishes to npm (if version is new)
   - Creates a git tag for the release

### Updating Consuming Applications

After a new version is published, update your application:

```bash
# In your app (Desk, Orders, Admin, etc.)
npm update @orstrax/ui
npm run build
# Deploy
```

**Note:** The workflow only publishes if the version in `package.json` has been bumped. If you forget to bump the version, the publish will be skipped.

## License

Internal use only. Not for public distribution.

---

**Remember:** Desk is the canonical reference. This package exists to formalize what already works, not to create something new.
