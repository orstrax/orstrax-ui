# Migration Guide

How to migrate an Orstrax-branded product to use `@orstrax/ui`.

## Prerequisites

- Product is Orstrax-branded (Desk, Orders, Admin, Product Hub)
- Using React 18+ or 19+
- Using a bundler that supports CSS imports

## Step 1: Install Package

```bash
npm install @orstrax/ui
```

## Step 2: Install Fonts

### Next.js (Recommended)

```tsx
// app/layout.tsx
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

### Other Frameworks

```html
<!-- In your HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@600&display=swap" rel="stylesheet">

<style>
  :root {
    --font-inter: 'Inter', sans-serif;
    --font-source-serif: 'Source Serif 4', serif;
  }
</style>
```

```tsx
// In your main app file
import "@orstrax/ui/styles.css";
```

## Step 3: Migrate Authentication Pages

### Before (Custom Layout)

```tsx
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-md mx-auto p-6">
        <img src="/logo.svg" alt="Product" />
        <h1>Welcome back</h1>
        <form>{/* form fields */}</form>
      </div>
    </div>
  );
}
```

### After (Using AuthLayout)

```tsx
import { AuthLayout, AuthDescription, AuthFooter } from "@orstrax/ui";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout
      productName="Orders" // Your product name
      tagline="Smart order management." // Your tagline
      title="Welcome back."
      LinkComponent={Link}
    >
      <AuthDescription>
        Sign in to manage your orders.
      </AuthDescription>
      
      <form className="mt-8 space-y-4">
        {/* Your existing form fields */}
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

## Step 4: Migrate Internal App Layout

### Before (Custom Shell)

```tsx
export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-50">
        <nav>{/* navigation */}</nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

### After (Using OrstraxAppShell)

```tsx
import { OrstraxAppShell } from "@orstrax/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <OrstraxAppShell
      productName="Orders"
      tagline="Smart order management."
      navigation={[
        {
          label: "Overview",
          items: [
            { 
              href: "/", 
              label: "Dashboard", 
              icon: LayoutDashboard,
              active: pathname === "/"
            }
          ]
        },
        {
          label: "Orders",
          items: [
            { 
              href: "/orders", 
              label: "All orders", 
              icon: ShoppingBag,
              active: pathname.startsWith("/orders")
            }
          ]
        }
      ]}
      user={{
        displayName: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      }}
      helpHref="/help"
      LinkComponent={Link}
    >
      {children}
    </OrstraxAppShell>
  );
}
```

## Step 5: Migrate Components

### Buttons

```tsx
// Before
<button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>

// After
import { PrimaryButton } from "@orstrax/ui";
<PrimaryButton>Save</PrimaryButton>
```

### Inputs

```tsx
// Before
<input type="email" className="border rounded px-3 py-2 w-full" />

// After
import { Input, FormField } from "@orstrax/ui";
<FormField label="Email" htmlFor="email">
  <Input id="email" type="email" />
</FormField>
```

### Cards

```tsx
// Before
<div className="bg-white border rounded-lg p-6">
  <h3>Title</h3>
  <p>Content</p>
</div>

// After
import { Card } from "@orstrax/ui";
<Card className="p-6">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Page Headers

```tsx
// Before
<div className="mb-6">
  <h1 className="text-2xl font-bold">Orders</h1>
  <p className="text-gray-600">Manage customer orders</p>
</div>

// After
import { PageHeader } from "@orstrax/ui";
<PageHeader
  title="Orders"
  description="Manage customer orders"
/>
```

## Step 6: Visual Verification

After migration, verify these key surfaces:

### Checklist

- [ ] Login page looks unchanged
- [ ] Signup page looks unchanged  
- [ ] Sidebar styling matches original
- [ ] Navigation active states work
- [ ] Mobile navigation drawer functions
- [ ] Button styles match
- [ ] Form inputs match
- [ ] Cards and surfaces match
- [ ] Colors (cream background, navy navy, etc.) match
- [ ] Typography (Inter + Source Serif) loads correctly

### Screenshot Comparison

Take before/after screenshots:

1. **Desktop login page**
2. **Mobile login page**
3. **Desktop internal UI with sidebar**
4. **Mobile internal UI with drawer open**
5. **Forms and buttons**
6. **Empty states**

If anything looks "different but cleaner," revert and investigate.

## Step 7: Remove Duplicate Code

After successful migration, remove:

- [ ] Local brand components
- [ ] Duplicate button components
- [ ] Duplicate form field components
- [ ] Duplicate card components
- [ ] Custom auth layout code
- [ ] Custom app shell code

Keep:
- Product-specific dashboards
- Business logic components
- API integrations
- Product-specific workflows

## Troubleshooting

### Fonts Not Loading

Check that CSS variables are set:

```tsx
<html className={`${inter.variable} ${sourceSerif.variable}`}>
```

Or in CSS:

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-source-serif: 'Source Serif 4', serif;
}
```

### Colors Look Wrong

Ensure `@orstrax/ui/styles.css` is imported in your app.

Check that components have the correct wrapper class:
- Auth pages: `.desk-login`
- Internal app: `.desk-app`

### Links Don't Work

Pass your framework's Link component:

```tsx
import Link from "next/link";
<OrstraxProductBrand LinkComponent={Link} />
<OrstraxAppShell LinkComponent={Link} />
```

### Navigation Active States

The shell doesn't detect active routes automatically. Pass `active: true`:

```tsx
navigation={[
  {
    label: "Main",
    items: [
      { href: "/orders", label: "Orders", active: pathname === "/orders" }
    ]
  }
]}
```

## Rollback Plan

If migration causes visual regressions:

1. Keep both old and new code during migration
2. Use feature flags to toggle between implementations
3. Revert package version if needed:

```bash
npm install @orstrax/ui@<previous-version>
```

## Need Help?

- Check the main [README](./README.md)
- Review [TOKENS.md](./TOKENS.md) for design token reference
- Look at Desk source code as the canonical example
