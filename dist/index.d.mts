export { ORSTRAX_MARK_HREF, ORSTRAX_THEME_DEFAULT_VERSION, ORSTRAX_UI_DEFAULT_ORIGIN, ORSTRAX_URLS, ORSTRAX_WORDMARK_HREF, orstraxAssetHref, orstraxThemeHref, orstraxThemeVersion, orstraxUiOrigin } from './runtime.mjs';
import React from 'react';

/** Map Firebase Auth client errors to customer-safe copy. Never surface raw Firebase strings. */
declare function firebaseAuthCode(error: unknown): string | null;
declare function friendlyAuthMessage(error: unknown, fallback?: string): string;

/**
 * Orstrax Design Tokens
 *
 * Extracted from Orstrax Desk production UI.
 * These values represent the canonical Orstrax visual language.
 */
/**
 * Color tokens
 * Warm cream backgrounds with navy surfaces define the Orstrax look.
 */
declare const colors: {
    /** Warm cream page background - #f4efe6 */
    readonly bg: "#f4efe6";
    /** Light cream surface/card background - #fffcf7 */
    readonly surface: "#fffcf7";
    /** Primary text color (ink) - #1c1915 */
    readonly ink: "#1c1915";
    /** Muted/secondary text - #6f675c */
    readonly muted: "#6f675c";
    /** Border and divider color - #e4dcd0 */
    readonly line: "#e4dcd0";
    /** Dark navy for primary actions and navigation - #1f2a37 */
    readonly navy: "#1f2a37";
    /** Accent blue for links and interactive elements - #2f5da8 */
    readonly accent: "#2f5da8";
};
/**
 * Typography tokens
 * Inter for UI, Source Serif 4 for display headings.
 */
declare const typography: {
    /** Primary UI font family */
    readonly fontFamily: {
        readonly sans: "var(--font-inter, ui-sans-serif, system-ui, sans-serif)";
        readonly serif: "var(--font-source-serif, ui-serif, Georgia, serif)";
    };
    /** Display serif styling */
    readonly display: {
        readonly fontFamily: "var(--font-source-serif, ui-serif, Georgia, serif)";
        readonly fontWeight: 600;
        readonly letterSpacing: "-0.02em";
    };
};
/**
 * Spacing scale
 * Generous but restrained spacing.
 */
declare const spacing: {
    /** 0.25rem - 4px */
    readonly xs: "0.25rem";
    /** 0.5rem - 8px */
    readonly sm: "0.5rem";
    /** 0.75rem - 12px */
    readonly md: "0.75rem";
    /** 1rem - 16px */
    readonly lg: "1rem";
    /** 1.5rem - 24px */
    readonly xl: "1.5rem";
    /** 2rem - 32px */
    readonly "2xl": "2rem";
    /** 3rem - 48px */
    readonly "3xl": "3rem";
};
/**
 * Border radius tokens
 */
declare const radius: {
    /** Standard radius for most elements - 0.625rem (10px) */
    readonly default: "0.625rem";
    /** Smaller radius for compact elements - 0.5rem (8px) */
    readonly sm: "0.5rem";
    /** Larger radius for cards - 0.75rem (12px) */
    readonly lg: "0.75rem";
    /** Pill/button radius - 0.5rem (8px) */
    readonly button: "0.5rem";
    /** Full rounded for pills - 9999px */
    readonly full: "9999px";
};
/**
 * CSS custom properties for runtime theming
 * Use these in components for consistency with Desk.
 */
declare const cssVars: {
    readonly "--orstrax-bg": "#f4efe6";
    readonly "--orstrax-surface": "#fffcf7";
    readonly "--orstrax-text": "#1c1915";
    readonly "--orstrax-text-muted": "#6f675c";
    readonly "--orstrax-border": "#e4dcd0";
    readonly "--orstrax-nav": "#1f2a37";
    readonly "--orstrax-accent": "#2f5da8";
    readonly "--orstrax-radius-md": "0.625rem";
    readonly "--orx-bg": "#f4efe6";
    readonly "--orx-surface": "#fffcf7";
    readonly "--orx-ink": "#1c1915";
    readonly "--orx-muted": "#6f675c";
    readonly "--orx-line": "#e4dcd0";
    readonly "--orx-navy": "#1f2a37";
    readonly "--orx-accent": "#2f5da8";
    readonly "--orx-radius": "0.625rem";
};

interface OrstraxProductBrandProps {
    /** Product name to display next to the wordmark (e.g., "Desk", "Orderflow", "Admin") */
    productName: string;
    /** Optional href for link wrapper */
    href?: string;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Color tone. Default accent matches Orderflow’s product name. */
    tone?: "accent" | "ink" | "muted";
    /** Additional CSS classes */
    className?: string;
    /** Optional link component (e.g., Next.js Link) */
    LinkComponent?: React.ElementType;
    /** Optional custom wordmark image source (defaults to shared Orstrax wordmark) */
    wordmarkSrc?: string;
}
/**
 * Canonical Orstrax wordmark + product name.
 * Visuals (blue product name, baseline alignment, sizes) come from the hosted theme.
 */
declare function OrstraxProductBrand({ productName, href, size, tone, className, LinkComponent, wordmarkSrc, }: OrstraxProductBrandProps): React.JSX.Element;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}
/**
 * PrimaryButton - Navy background, white text
 * Extracted from Desk UI
 */
declare function PrimaryButton({ children, className, ...props }: ButtonProps): React.JSX.Element;
/**
 * SecondaryButton - White background with border
 * Extracted from Desk UI
 */
declare function SecondaryButton({ children, className, ...props }: ButtonProps): React.JSX.Element;
/**
 * Button - Unified button component with variant support
 */
declare function Button({ variant, ...props }: ButtonProps): React.JSX.Element;
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
/**
 * Input - Standard form input
 * Extracted from Desk UI
 */
declare function Input({ className, ...props }: InputProps): React.JSX.Element;
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}
/**
 * Textarea - Standard form textarea
 * Extracted from Desk UI
 */
declare function Textarea({ className, ...props }: TextareaProps): React.JSX.Element;
interface FormFieldProps {
    label: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    children: React.ReactNode;
}
/**
 * FormField - Label + input wrapper with error/hint support
 * Extracted from Desk UI patterns
 */
declare function FormField({ label, htmlFor, error, hint, children }: FormFieldProps): React.JSX.Element;
interface CardProps {
    children: React.ReactNode;
    className?: string;
}
/**
 * Card/Panel - Standard card container
 * Extracted from Desk UI
 */
declare function Card({ children, className }: CardProps): React.JSX.Element;
/**
 * Alias for Card
 */
declare const Panel: typeof Card;
interface BadgeProps {
    children: React.ReactNode;
    tone?: "neutral" | "open" | "pending" | "resolved" | "draft" | "published" | "success" | "warning" | "error";
}
/**
 * Badge - Status badge with color tones
 * Extracted from Desk UI
 */
declare function Badge({ children, tone }: BadgeProps): React.JSX.Element;
interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    display?: boolean;
}
/**
 * PageHeader - Standard page title with optional description and actions
 * Extracted from Desk UI
 */
declare function PageHeader({ title, description, actions, display }: PageHeaderProps): React.JSX.Element;
interface EmptyStateProps {
    title: string;
    body: string;
    action?: React.ReactNode;
}
/**
 * EmptyState - Empty state message with optional action
 * Extracted from Desk UI
 */
declare function EmptyState({ title, body, action }: EmptyStateProps): React.JSX.Element;
interface MetricProps {
    label: string;
    value: string | number;
    hint?: string;
    href?: string;
    LinkComponent?: React.ElementType;
}
/**
 * Metric - Stat card with label, value, and optional hint
 * Extracted from Desk UI
 */
declare function Metric({ label, value, hint, href, LinkComponent }: MetricProps): React.JSX.Element;
declare function Divider({ className }: {
    className?: string;
}): React.JSX.Element;
interface TextLinkProps {
    href: string;
    children: React.ReactNode;
    LinkComponent?: React.ElementType;
}
/**
 * TextLink - Accent-colored link
 * Extracted from Desk UI
 */
declare function TextLink({ href, children, LinkComponent }: TextLinkProps): React.JSX.Element;
/**
 * Generate initials from a name
 * Extracted from Desk UI utilities
 */
declare function initials(name: string): string;

interface AuthLayoutProps {
    productName: string;
    tagline: string;
    title: string;
    children: React.ReactNode;
    LinkComponent?: React.ElementType;
    brandHref?: string;
    wordmarkSrc?: string;
    footer?: React.ReactNode;
}
/**
 * Canonical Orstrax auth shell. Visuals come from the hosted theme CSS.
 * Product apps only pass identity + form content.
 */
declare function AuthLayout({ productName, tagline, title, children, LinkComponent, brandHref, wordmarkSrc, footer, }: AuthLayoutProps): React.JSX.Element;
declare function AuthFooter({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AuthDescription({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;

interface NavItem {
    href: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    badge?: number;
    active?: boolean;
}
interface NavGroup {
    label: string;
    items: NavItem[];
}
interface User {
    displayName: string;
    email: string;
    role?: string;
}
interface OrstraxAppShellProps {
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
declare function OrstraxAppShell({ productName, tagline, navigation, user, accountMenu, headerContent, children, LinkComponent, renderAccountMenu, helpHref, }: OrstraxAppShellProps): React.JSX.Element;

export { AuthDescription, AuthFooter, AuthLayout, type AuthLayoutProps, Badge, type BadgeProps, Button, type ButtonProps, Card, type CardProps, Divider, EmptyState, type EmptyStateProps, FormField, type FormFieldProps, Input, type InputProps, Metric, type MetricProps, type NavGroup, type NavItem, OrstraxAppShell, type OrstraxAppShellProps, OrstraxProductBrand, type OrstraxProductBrandProps, PageHeader, type PageHeaderProps, Panel, PrimaryButton, SecondaryButton, TextLink, type TextLinkProps, Textarea, type TextareaProps, type User, colors, cssVars, firebaseAuthCode, friendlyAuthMessage, initials, radius, spacing, typography };
