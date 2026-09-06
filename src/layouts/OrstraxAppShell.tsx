import React, { useState } from "react";
import { OrstraxProductBrand } from "../components/OrstraxProductBrand";
import { initials } from "../components/ui";

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
  active?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface User {
  displayName: string;
  email: string;
  role?: string;
}

/* ========================================
   ORSTRAX APP SHELL
   ======================================== */

export interface OrstraxAppShellProps {
  /** Product name (e.g., "Desk", "Orders", "Admin") */
  productName: string;
  
  /** Product tagline */
  tagline: string;
  
  /** Navigation groups */
  navigation: NavGroup[];
  
  /** Current user */
  user: User;
  
  /** Account menu items */
  accountMenu?: React.ReactNode;
  
  /** Additional header content (e.g., command palette) */
  headerContent?: React.ReactNode;
  
  /** Page content */
  children: React.ReactNode;
  
  /** Optional link component (e.g., Next.js Link) */
  LinkComponent?: React.ElementType;
  
  /** Optional custom account menu render */
  renderAccountMenu?: (user: User) => React.ReactNode;
  
  /** Help/docs link */
  helpHref?: string;
}

/**
 * OrstraxAppShell
 * 
 * The canonical Orstrax application shell.
 * Extracted from Orstrax Desk internal UI.
 * 
 * Features:
 * - Sidebar with product branding and navigation
 * - Top header with search/actions
 * - Account menu
 * - Mobile responsive navigation drawer
 * - Warm cream background
 * - Navy active states
 * 
 * The shared package controls:
 * - Sidebar treatment
 * - Spacing and typography
 * - Active nav styling
 * - Header height
 * - Responsive behavior
 * - Mobile drawer
 * - Surfaces and borders
 * 
 * The consuming app controls:
 * - Routes
 * - Nav labels
 * - Permissions
 * - Business logic
 * - Page content
 * 
 * @example
 * ```tsx
 * <OrstraxAppShell
 *   productName="Orders"
 *   tagline="Smart order management."
 *   navigation={[
 *     {
 *       label: "Overview",
 *       items: [
 *         { href: "/", label: "Dashboard", icon: LayoutDashboard }
 *       ]
 *     },
 *     {
 *       label: "Orders",
 *       items: [
 *         { href: "/orders", label: "All orders", icon: ShoppingBag },
 *         { href: "/customers", label: "Customers", icon: Users }
 *       ]
 *     }
 *   ]}
 *   user={{ displayName: "Jane Doe", email: "jane@example.com", role: "Admin" }}
 * >
 *   <YourPageContent />
 * </OrstraxAppShell>
 * ```
 */
export function OrstraxAppShell({
  productName,
  tagline,
  navigation,
  user,
  accountMenu,
  headerContent,
  children,
  LinkComponent,
  renderAccountMenu,
  helpHref,
}: OrstraxAppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const Link = LinkComponent || "a";

  const nav = (
    <nav className="mt-4 space-y-5" aria-label={productName}>
      {navigation.map((group) => {
        if (!group.items.length) return null;
        return (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--orx-muted)]">
              {group.label}
            </p>
            <div className="mt-1 flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.active || false;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      active
                        ? "flex w-full items-center gap-2 rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm text-white"
                        : "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--orx-ink)] hover:bg-[var(--orx-surface)]"
                    }
                    aria-label={item.badge ? `${item.label}, ${item.badge} unread` : undefined}
                  >
                    {Icon ? (
                      <span className="relative shrink-0">
                        <Icon className="h-4 w-4" aria-hidden />
                        {item.badge ? (
                          <span
                            className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${
                              active ? "bg-white" : "bg-[var(--orx-accent)]"
                            }`}
                            aria-hidden
                          />
                        ) : null}
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={`ml-auto tabular-nums text-[11px] font-semibold ${
                          active ? "text-white" : "text-[var(--orx-ink)]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="desk-app min-h-screen">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:flex md:flex-col">
          <div className="px-1">
            <OrstraxProductBrand productName={productName} LinkComponent={LinkComponent} />
            <p className="text-[11px] text-[var(--orx-muted)]">{tagline}</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{nav}</div>
          {helpHref ? (
            <div className="mt-4 rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-3 text-xs text-[var(--orx-muted)]">
              <OrstraxProductBrand productName={productName} size="sm" />
              <p className="mt-1">{tagline}</p>
              <a
                href={helpHref}
                className="mt-2 inline-block text-[var(--orx-accent)] hover:underline"
              >
                View docs →
              </a>
            </div>
          ) : null}
        </aside>

        {/* Main content area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-[var(--orx-line)] bg-[var(--orx-surface)] px-4 py-3">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--orx-line)] text-[var(--orx-ink)] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>

            {/* Mobile brand */}
            <Link href="/" className="min-w-0 md:hidden" onClick={() => setMobileOpen(false)}>
              <OrstraxProductBrand productName={productName} size="sm" LinkComponent={LinkComponent} />
            </Link>

            {/* Desktop brand + tagline */}
            <div className="hidden min-w-0 md:block">
              <OrstraxProductBrand productName={productName} size="sm" LinkComponent={LinkComponent} />
              <p className="hidden text-[11px] text-[var(--orx-muted)] lg:block">{tagline}</p>
            </div>

            {/* Header content (search, etc.) */}
            <div className="flex min-w-0 flex-1 justify-end md:justify-center">
              {headerContent}
            </div>

            {/* Account menu */}
            {renderAccountMenu ? (
              renderAccountMenu(user)
            ) : accountMenu ? (
              accountMenu
            ) : (
              <DefaultAccountMenu user={user} />
            )}
          </header>

          {/* Mobile navigation drawer */}
          {mobileOpen ? (
            <div className="border-b border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:hidden">
              {nav}
            </div>
          ) : null}

          {/* Page content */}
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   HELPER COMPONENTS
   ======================================== */

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="block">
      {open ? (
        <path
          d="M4 4 L14 14 M14 4 L4 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 5 H15 M3 9 H15 M3 13 H15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function DefaultAccountMenu({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--orx-navy)] text-xs font-medium text-white"
        aria-label={user.displayName}
      >
        {initials(user.displayName)}
      </div>
    </div>
  );
}
