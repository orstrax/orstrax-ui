import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { clsx } from 'clsx';
import { useState } from 'react';

// src/tokens/index.ts
var colors = {
  /** Warm cream page background - #f4efe6 */
  bg: "#f4efe6",
  /** Light cream surface/card background - #fffcf7 */
  surface: "#fffcf7",
  /** Primary text color (ink) - #1c1915 */
  ink: "#1c1915",
  /** Muted/secondary text - #6f675c */
  muted: "#6f675c",
  /** Border and divider color - #e4dcd0 */
  line: "#e4dcd0",
  /** Dark navy for primary actions and navigation - #1f2a37 */
  navy: "#1f2a37",
  /** Accent blue for links and interactive elements - #2f5da8 */
  accent: "#2f5da8"
};
var typography = {
  /** Primary UI font family */
  fontFamily: {
    sans: "var(--font-inter, ui-sans-serif, system-ui, sans-serif)",
    serif: "var(--font-source-serif, ui-serif, Georgia, serif)"
  },
  /** Display serif styling */
  display: {
    fontFamily: "var(--font-source-serif, ui-serif, Georgia, serif)",
    fontWeight: 600,
    letterSpacing: "-0.02em"
  }
};
var spacing = {
  /** 0.25rem - 4px */
  xs: "0.25rem",
  /** 0.5rem - 8px */
  sm: "0.5rem",
  /** 0.75rem - 12px */
  md: "0.75rem",
  /** 1rem - 16px */
  lg: "1rem",
  /** 1.5rem - 24px */
  xl: "1.5rem",
  /** 2rem - 32px */
  "2xl": "2rem",
  /** 3rem - 48px */
  "3xl": "3rem"
};
var radius = {
  /** Standard radius for most elements - 0.625rem (10px) */
  default: "0.625rem",
  /** Smaller radius for compact elements - 0.5rem (8px) */
  sm: "0.5rem",
  /** Larger radius for cards - 0.75rem (12px) */
  lg: "0.75rem",
  /** Pill/button radius - 0.5rem (8px) */
  button: "0.5rem",
  /** Full rounded for pills - 9999px */
  full: "9999px"
};
var cssVars = {
  "--orx-bg": colors.bg,
  "--orx-surface": colors.surface,
  "--orx-ink": colors.ink,
  "--orx-muted": colors.muted,
  "--orx-line": colors.line,
  "--orx-navy": colors.navy,
  "--orx-accent": colors.accent,
  "--orx-radius": radius.default
};

// src/assets/orstrax-wordmark.png
var orstrax_wordmark_default = "./orstrax-wordmark-7264HBQ5.png";
var SIZES = {
  sm: { logo: "h-5", text: "text-sm", gap: "gap-1.5" },
  md: { logo: "h-7", text: "text-base", gap: "gap-2" },
  lg: { logo: "h-8 sm:h-9", text: "text-xl sm:text-2xl", gap: "gap-2.5" }
};
function OrstraxProductBrand({
  productName,
  href,
  size = "sm",
  tone = "ink",
  className = "",
  LinkComponent
}) {
  const scale = SIZES[size];
  const content = /* @__PURE__ */ jsxs("span", { className: `inline-flex items-end ${scale.gap} ${className}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: orstrax_wordmark_default,
        alt: "Orstrax",
        className: `block ${scale.logo} w-auto max-w-[min(100%,11rem)] shrink-0 object-contain object-left`
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `${scale.text} font-semibold leading-none tracking-tight ${tone === "muted" ? "text-[var(--orx-muted)]" : "text-[var(--orx-ink)]"}`,
        children: productName
      }
    )
  ] });
  if (href) {
    const Link = LinkComponent || "a";
    return /* @__PURE__ */ jsx(Link, { href, className: "inline-flex max-w-full items-end", "aria-label": `Orstrax ${productName}`, children: content });
  }
  return /* @__PURE__ */ jsx("span", { className: "inline-flex max-w-full items-end", role: "img", "aria-label": `Orstrax ${productName}`, children: content });
}
function PrimaryButton({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: clsx(
        "rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60",
        className
      ),
      children
    }
  );
}
function SecondaryButton({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: clsx(
        "rounded-lg border border-[var(--orx-line)] bg-white px-3 py-2 text-sm text-[var(--orx-ink)]",
        className
      ),
      children
    }
  );
}
function Button({ variant = "primary", ...props }) {
  const Component = variant === "primary" ? PrimaryButton : SecondaryButton;
  return /* @__PURE__ */ jsx(Component, { ...props });
}
function Input({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      className: clsx(
        "desk-input w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ...props,
      className: clsx(
        "w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )
    }
  );
}
function FormField({ label, htmlFor, error, hint, children }) {
  return /* @__PURE__ */ jsxs("label", { htmlFor, className: "block text-sm", children: [
    label,
    /* @__PURE__ */ jsx("div", { className: "mt-1", children }),
    hint && !error ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[var(--orx-muted)]", children: hint }) : null,
    error ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-800", children: error }) : null
  ] });
}
function Card({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)]",
        className
      ),
      children
    }
  );
}
var Panel = Card;
function Badge({ children, tone = "neutral" }) {
  const toneClasses = {
    neutral: "bg-[var(--orx-bg)] text-[var(--orx-muted)]",
    open: "bg-blue-50 text-blue-800",
    pending: "bg-amber-50 text-amber-800",
    resolved: "bg-emerald-50 text-emerald-800",
    published: "bg-emerald-50 text-emerald-800",
    success: "bg-emerald-50 text-emerald-800",
    draft: "bg-amber-50 text-amber-900",
    warning: "bg-amber-50 text-amber-800",
    error: "bg-red-50 text-red-800"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium capitalize",
        toneClasses[tone]
      ),
      children
    }
  );
}
function PageHeader({ title, description, actions, display }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: display ? "desk-display text-3xl text-[var(--orx-ink)]" : "text-2xl font-semibold text-[var(--orx-ink)]",
          children: title
        }
      ),
      description ? /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-2xl text-sm text-[var(--orx-muted)]", children: description }) : null
    ] }),
    actions ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: actions }) : null
  ] });
}
function EmptyState({ title, body, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] px-5 py-8", children: [
    /* @__PURE__ */ jsx("p", { className: "font-medium text-[var(--orx-ink)]", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-lg text-sm text-[var(--orx-muted)]", children: body }),
    action ? /* @__PURE__ */ jsx("div", { className: "mt-4", children: action }) : null
  ] });
}
function Metric({ label, value, hint, href, LinkComponent }) {
  const body = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-[var(--orx-muted)]", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold tabular-nums text-[var(--orx-ink)]", children: value }),
    hint ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[var(--orx-muted)]", children: hint }) : null
  ] });
  const className = "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-4 transition-colors";
  if (href) {
    const Link = LinkComponent || "a";
    return /* @__PURE__ */ jsx(
      Link,
      {
        href,
        className: `${className} block hover:border-[var(--orx-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orx-accent)]`,
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className, children: body });
}
function Divider({ className }) {
  return /* @__PURE__ */ jsx("hr", { className: clsx("border-t border-[var(--orx-line)]", className) });
}
function TextLink({ href, children, LinkComponent }) {
  const Link = LinkComponent || "a";
  return /* @__PURE__ */ jsx(Link, { href, className: "text-sm text-[var(--orx-accent)] hover:underline", children });
}
function initials(name) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "\u2022";
}
function AuthLayout({
  productName,
  tagline,
  title,
  children,
  LinkComponent,
  brandHref = "/"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "desk-login relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "pointer-events-none absolute left-0 top-0 h-40 w-full opacity-[0.15] lg:hidden",
        viewBox: "0 0 400 150",
        preserveAspectRatio: "xMinYMin slice",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "#1f2a37", strokeWidth: "1.4", children: [
          /* @__PURE__ */ jsx("path", { d: "M0 30 C 100 50, 200 30, 300 50 C 350 55, 400 50, 450 55" }),
          /* @__PURE__ */ jsx("path", { d: "M0 50 C 120 75, 220 50, 320 75 C 370 80, 420 75, 470 80" }),
          /* @__PURE__ */ jsx("path", { d: "M50 100 L 400 100" }),
          /* @__PURE__ */ jsx("path", { d: "M50 120 L 400 120" }),
          /* @__PURE__ */ jsx("path", { d: "M50 135 L 350 135" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[42%] opacity-[0.18] lg:block",
        viewBox: "0 0 400 800",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "#1f2a37", strokeWidth: "1.2", children: [
          /* @__PURE__ */ jsx("path", { d: "M20 80 C 80 140, 40 220, 120 280" }),
          /* @__PURE__ */ jsx("path", { d: "M40 90 C 20 180, 160 210, 90 300" }),
          /* @__PURE__ */ jsx("path", { d: "M10 200 C 140 240, 20 320, 110 390" }),
          /* @__PURE__ */ jsx("path", { d: "M80 40 C 10 120, 180 160, 60 250" }),
          /* @__PURE__ */ jsx("path", { d: "M200 420 L 360 420" }),
          /* @__PURE__ */ jsx("path", { d: "M200 455 L 360 455" }),
          /* @__PURE__ */ jsx("path", { d: "M200 490 L 360 490" }),
          /* @__PURE__ */ jsx("path", { d: "M200 525 L 360 525" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16", children: [
      /* @__PURE__ */ jsx(
        OrstraxProductBrand,
        {
          productName,
          size: "lg",
          href: brandHref,
          LinkComponent
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--orx-muted)]", children: tagline }),
      /* @__PURE__ */ jsx("h1", { className: "desk-display mt-10 text-4xl text-[var(--orx-ink)]", children: title }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children })
    ] })
  ] });
}
function AuthFooter({ children }) {
  return /* @__PURE__ */ jsx("footer", { className: "mt-16 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--orx-muted)]", children });
}
function AuthDescription({ children }) {
  return /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[var(--orx-muted)]", children });
}
function OrstraxAppShell({
  productName,
  tagline,
  navigation,
  user,
  accountMenu,
  headerContent,
  children,
  LinkComponent,
  renderAccountMenu,
  helpHref
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const Link = LinkComponent || "a";
  const nav = /* @__PURE__ */ jsx("nav", { className: "mt-4 space-y-5", "aria-label": productName, children: navigation.map((group) => {
    if (!group.items.length) return null;
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--orx-muted)]", children: group.label }),
      /* @__PURE__ */ jsx("div", { className: "mt-1 flex flex-col gap-0.5", children: group.items.map((item) => {
        const Icon = item.icon;
        const active = item.active || false;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            href: item.href,
            onClick: () => setMobileOpen(false),
            className: active ? "flex w-full items-center gap-2 rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm text-white" : "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--orx-ink)] hover:bg-[var(--orx-surface)]",
            "aria-label": item.badge ? `${item.label}, ${item.badge} unread` : void 0,
            children: [
              Icon ? /* @__PURE__ */ jsxs("span", { className: "relative shrink-0", children: [
                /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4", "aria-hidden": true }),
                item.badge ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${active ? "bg-white" : "bg-[var(--orx-accent)]"}`,
                    "aria-hidden": true
                  }
                ) : null
              ] }) : null,
              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1", children: item.label }),
              item.badge ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: `ml-auto tabular-nums text-[11px] font-semibold ${active ? "text-white" : "text-[var(--orx-ink)]"}`,
                  children: item.badge
                }
              ) : null
            ]
          },
          item.href
        );
      }) })
    ] }, group.label);
  }) });
  return /* @__PURE__ */ jsx("div", { className: "desk-app min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-60 shrink-0 border-r border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:flex md:flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-1", children: [
        /* @__PURE__ */ jsx(OrstraxProductBrand, { productName, LinkComponent }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[var(--orx-muted)]", children: tagline })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: nav }),
      helpHref ? /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-3 text-xs text-[var(--orx-muted)]", children: [
        /* @__PURE__ */ jsx(OrstraxProductBrand, { productName, size: "sm" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1", children: tagline }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: helpHref,
            className: "mt-2 inline-block text-[var(--orx-accent)] hover:underline",
            children: "View docs \u2192"
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center gap-3 border-b border-[var(--orx-line)] bg-[var(--orx-surface)] px-4 py-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--orx-line)] text-[var(--orx-ink)] md:hidden",
            onClick: () => setMobileOpen(!mobileOpen),
            "aria-expanded": mobileOpen,
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            children: /* @__PURE__ */ jsx(MenuIcon, { open: mobileOpen })
          }
        ),
        /* @__PURE__ */ jsx(Link, { href: "/", className: "min-w-0 md:hidden", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsx(OrstraxProductBrand, { productName, size: "sm", LinkComponent }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden min-w-0 md:block", children: [
          /* @__PURE__ */ jsx(OrstraxProductBrand, { productName, size: "sm", LinkComponent }),
          /* @__PURE__ */ jsx("p", { className: "hidden text-[11px] text-[var(--orx-muted)] lg:block", children: tagline })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-1 justify-end md:justify-center", children: headerContent }),
        renderAccountMenu ? renderAccountMenu(user) : accountMenu ? accountMenu : /* @__PURE__ */ jsx(DefaultAccountMenu, { user })
      ] }),
      mobileOpen ? /* @__PURE__ */ jsx("div", { className: "border-b border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:hidden", children: nav }) : null,
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-4 md:p-8", children })
    ] })
  ] }) });
}
function MenuIcon({ open }) {
  return /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 18 18", "aria-hidden": true, className: "block", children: open ? /* @__PURE__ */ jsx(
    "path",
    {
      d: "M4 4 L14 14 M14 4 L4 14",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }
  ) : /* @__PURE__ */ jsx(
    "path",
    {
      d: "M3 5 H15 M3 9 H15 M3 13 H15",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }
  ) });
}
function DefaultAccountMenu({ user }) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex h-8 w-8 items-center justify-center rounded-full bg-[var(--orx-navy)] text-xs font-medium text-white",
      "aria-label": user.displayName,
      children: initials(user.displayName)
    }
  ) });
}

export { AuthDescription, AuthFooter, AuthLayout, Badge, Button, Card, Divider, EmptyState, FormField, Input, Metric, OrstraxAppShell, OrstraxProductBrand, PageHeader, Panel, PrimaryButton, SecondaryButton, TextLink, Textarea, colors, cssVars, initials, radius, spacing, typography };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map