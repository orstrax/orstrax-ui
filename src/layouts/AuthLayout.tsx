import React from "react";
import { OrstraxProductBrand } from "../components/OrstraxProductBrand";

export interface AuthLayoutProps {
  /** Product name (e.g., "Desk", "Orders", "Admin") */
  productName: string;
  
  /** Product tagline to show under the brand */
  tagline: string;
  
  /** Large serif title (e.g., "Welcome back.", "Create your account.") */
  title: string;
  
  /** Auth form or content */
  children: React.ReactNode;
  
  /** Optional link component (e.g., Next.js Link) for brand href */
  LinkComponent?: React.ElementType;
  
  /** Optional href for the product brand link */
  brandHref?: string;
  
  /** Optional custom wordmark image source (defaults to shared Orstrax wordmark) */
  wordmarkSrc?: string;
}

/**
 * AuthLayout
 * 
 * The canonical Orstrax authentication page layout.
 * Extracted directly from the Orstrax Desk login/signup pages.
 * 
 * Features:
 * - Warm cream background
 * - Orstrax product branding
 * - Product tagline
 * - Large serif display title
 * - Decorative chaos/clarity line motif (simplified at top on mobile, full on left side on desktop)
 * - Centered, restrained form container
 * - Footer placement
 * - Mobile-responsive layout
 * - Generous but not wasteful spacing
 * 
 * This component owns the VISUAL SHELL only.
 * Each product keeps its own authentication logic.
 * 
 * @example
 * ```tsx
 * <AuthLayout
 *   productName="Desk"
 *   tagline="Support everything that builds forward."
 *   title="Welcome back."
 * >
 *   <DeskLoginForm />
 * </AuthLayout>
 * 
 * <AuthLayout
 *   productName="Orders"
 *   tagline="Smart order management."
 *   title="Create your account."
 * >
 *   <OrdersSignupForm />
 * </AuthLayout>
 * ```
 */
export function AuthLayout({
  productName,
  tagline,
  title,
  children,
  LinkComponent,
  brandHref = "/",
  wordmarkSrc,
}: AuthLayoutProps) {
  return (
    <div className="desk-login relative min-h-screen overflow-hidden">
      {/* Decorative line motif - chaos/clarity visual element */}
      {/* Mobile: simplified version at top */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-40 w-full opacity-[0.04] lg:hidden"
        viewBox="0 0 400 150"
        preserveAspectRatio="xMinYMin slice"
        aria-hidden
      >
        <g fill="none" stroke="#1f2a37" strokeWidth="0.8">
          <path d="M0 30 C 100 50, 200 30, 300 50 C 350 55, 400 50, 450 55" />
          <path d="M0 50 C 120 75, 220 50, 320 75 C 370 80, 420 75, 470 80" />
          <path d="M50 100 L 400 100" />
          <path d="M50 120 L 400 120" />
          <path d="M50 135 L 350 135" />
        </g>
      </svg>
      
      {/* Desktop: full version on left side */}
      <svg
        className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[42%] opacity-[0.18] lg:block"
        viewBox="0 0 400 800"
        aria-hidden
      >
        <g fill="none" stroke="#1f2a37" strokeWidth="1.2">
          <path d="M20 80 C 80 140, 40 220, 120 280" />
          <path d="M40 90 C 20 180, 160 210, 90 300" />
          <path d="M10 200 C 140 240, 20 320, 110 390" />
          <path d="M80 40 C 10 120, 180 160, 60 250" />
          <path d="M200 420 L 360 420" />
          <path d="M200 455 L 360 455" />
          <path d="M200 490 L 360 490" />
          <path d="M200 525 L 360 525" />
        </g>
      </svg>
      
      {/* Content container */}
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        {/* Brand and tagline */}
        <OrstraxProductBrand
          productName={productName}
          size="lg"
          href={brandHref}
          LinkComponent={LinkComponent}
          wordmarkSrc={wordmarkSrc}
        />
        <p className="mt-2 text-sm text-[var(--orx-muted)]">{tagline}</p>
        
        {/* Display title */}
        <h1 className="desk-display mt-10 text-4xl text-[var(--orx-ink)]">{title}</h1>
        
        {/* Form/content */}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export interface AuthFooterProps {
  children: React.ReactNode;
}

/**
 * AuthFooter
 * 
 * Optional footer component for auth pages.
 * Matches the Desk auth footer styling.
 * 
 * @example
 * ```tsx
 * <AuthFooter>
 *   <a href="/privacy">Privacy</a>
 *   <a href="/help">Help</a>
 *   <span>© 2026 Orstrax LLC</span>
 * </AuthFooter>
 * ```
 */
export function AuthFooter({ children }: AuthFooterProps) {
  return (
    <footer className="mt-16 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--orx-muted)]">
      {children}
    </footer>
  );
}

export interface AuthDescriptionProps {
  children: React.ReactNode;
}

/**
 * AuthDescription
 * 
 * Optional description/subtitle below the title.
 * 
 * @example
 * ```tsx
 * <AuthDescription>
 *   Sign in to manage your help centers.
 * </AuthDescription>
 * ```
 */
export function AuthDescription({ children }: AuthDescriptionProps) {
  return <p className="mt-2 text-sm text-[var(--orx-muted)]">{children}</p>;
}
