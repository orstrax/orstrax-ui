import React from "react";
import { clsx } from "clsx";

/* ========================================
   BUTTONS
   ======================================== */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

/**
 * PrimaryButton - Navy background, white text
 * Extracted from Desk UI
 */
export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60",
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * SecondaryButton - White background with border
 * Extracted from Desk UI
 */
export function SecondaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg border border-[var(--orx-line)] bg-white px-3 py-2 text-sm text-[var(--orx-ink)]",
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * Button - Unified button component with variant support
 */
export function Button({ variant = "primary", ...props }: ButtonProps) {
  const Component = variant === "primary" ? PrimaryButton : SecondaryButton;
  return <Component {...props} />;
}

/* ========================================
   INPUTS
   ======================================== */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input - Standard form input
 * Extracted from Desk UI
 */
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "desk-input w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )}
    />
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea - Standard form textarea
 * Extracted from Desk UI
 */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )}
    />
  );
}

/* ========================================
   FORM FIELD
   ======================================== */

export interface FormFieldProps {
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
export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <label htmlFor={htmlFor} className="block text-sm">
      {label}
      <div className="mt-1">{children}</div>
      {hint && !error ? <p className="mt-1 text-xs text-[var(--orx-muted)]">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-800">{error}</p> : null}
    </label>
  );
}

/* ========================================
   CARDS & PANELS
   ======================================== */

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card/Panel - Standard card container
 * Extracted from Desk UI
 */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Alias for Card
 */
export const Panel = Card;

/* ========================================
   BADGES
   ======================================== */

export interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "open" | "pending" | "resolved" | "draft" | "published" | "success" | "warning" | "error";
}

/**
 * Badge - Status badge with color tones
 * Extracted from Desk UI
 */
export function Badge({ children, tone = "neutral" }: BadgeProps) {
  const toneClasses = {
    neutral: "bg-[var(--orx-bg)] text-[var(--orx-muted)]",
    open: "bg-blue-50 text-blue-800",
    pending: "bg-amber-50 text-amber-800",
    resolved: "bg-emerald-50 text-emerald-800",
    published: "bg-emerald-50 text-emerald-800",
    success: "bg-emerald-50 text-emerald-800",
    draft: "bg-amber-50 text-amber-900",
    warning: "bg-amber-50 text-amber-800",
    error: "bg-red-50 text-red-800",
  };

  return (
    <span
      className={clsx(
        "inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium capitalize",
        toneClasses[tone]
      )}
    >
      {children}
    </span>
  );
}

/* ========================================
   PAGE HEADER
   ======================================== */

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  display?: boolean;
}

/**
 * PageHeader - Standard page title with optional description and actions
 * Extracted from Desk UI
 */
export function PageHeader({ title, description, actions, display }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1
          className={
            display
              ? "desk-display text-3xl text-[var(--orx-ink)]"
              : "text-2xl font-semibold text-[var(--orx-ink)]"
          }
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-[var(--orx-muted)]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

/* ========================================
   EMPTY STATE
   ======================================== */

export interface EmptyStateProps {
  title: string;
  body: string;
  action?: React.ReactNode;
}

/**
 * EmptyState - Empty state message with optional action
 * Extracted from Desk UI
 */
export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] px-5 py-8">
      <p className="font-medium text-[var(--orx-ink)]">{title}</p>
      <p className="mt-1 max-w-lg text-sm text-[var(--orx-muted)]">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

/* ========================================
   METRIC
   ======================================== */

export interface MetricProps {
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
export function Metric({ label, value, hint, href, LinkComponent }: MetricProps) {
  const body = (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--orx-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-[var(--orx-ink)]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[var(--orx-muted)]">{hint}</p> : null}
    </>
  );

  const className =
    "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-4 transition-colors";

  if (href) {
    const Link = LinkComponent || "a";
    return (
      <Link
        href={href}
        className={`${className} block hover:border-[var(--orx-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orx-accent)]`}
      >
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}

/* ========================================
   DIVIDER
   ======================================== */

export function Divider({ className }: { className?: string }) {
  return <hr className={clsx("border-t border-[var(--orx-line)]", className)} />;
}

/* ========================================
   TEXT LINK
   ======================================== */

export interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  LinkComponent?: React.ElementType;
}

/**
 * TextLink - Accent-colored link
 * Extracted from Desk UI
 */
export function TextLink({ href, children, LinkComponent }: TextLinkProps) {
  const Link = LinkComponent || "a";
  return (
    <Link href={href} className="text-sm text-[var(--orx-accent)] hover:underline">
      {children}
    </Link>
  );
}

/* ========================================
   UTILITIES
   ======================================== */

/**
 * Generate initials from a name
 * Extracted from Desk UI utilities
 */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "•";
}
