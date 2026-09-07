'use strict';

var jsxRuntime = require('react/jsx-runtime');
var clsx = require('clsx');
var react = require('react');

// src/runtime.ts
var ORSTRAX_UI_DEFAULT_ORIGIN = "https://ui.orstrax.io";
var ORSTRAX_THEME_DEFAULT_VERSION = "v1.0.4";
var ORSTRAX_URLS = {
  company: "https://orstrax.com",
  hub: "https://www.orstrax.io",
  desk: "https://desk.orstrax.io",
  admin: "https://admin.orstrax.io",
  orders: "https://orders.orstrax.io",
  ordersHelp: "https://desk.orstrax.io/orders",
  ui: ORSTRAX_UI_DEFAULT_ORIGIN
};
function readEnv(name) {
  const runtime = globalThis;
  return runtime.process?.env?.[name];
}
function orstraxUiOrigin() {
  return (readEnv("NEXT_PUBLIC_ORSTRAX_UI_ORIGIN") || ORSTRAX_UI_DEFAULT_ORIGIN).replace(/\/$/, "");
}
function orstraxThemeVersion() {
  return (readEnv("NEXT_PUBLIC_ORSTRAX_THEME_VERSION") || ORSTRAX_THEME_DEFAULT_VERSION).replace(/^\/+|\/+$/g, "");
}
function orstraxThemeHref(version = orstraxThemeVersion()) {
  return `${orstraxUiOrigin()}/theme/${version}/orstrax.css`;
}
function orstraxAssetHref(file) {
  return `${orstraxUiOrigin()}/assets/${file.replace(/^\/+/, "")}`;
}
var ORSTRAX_WORDMARK_HREF = `${ORSTRAX_UI_DEFAULT_ORIGIN}/assets/orstrax-wordmark.png`;
var ORSTRAX_MARK_HREF = `${ORSTRAX_UI_DEFAULT_ORIGIN}/assets/orstrax-mark.png`;

// src/auth.ts
var MESSAGES = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/user-disabled": "This account has been disabled. Contact support if you need help.",
  "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/email-already-in-use": "An account with this email already exists. Sign in instead.",
  "auth/weak-password": "Use a stronger password (at least 8 characters).",
  "auth/operation-not-allowed": "Sign-in is temporarily unavailable. Try again shortly.",
  "auth/expired-action-code": "This link has expired. Request a new one.",
  "auth/invalid-action-code": "This link is invalid or has already been used. Request a new one.",
  "auth/missing-password": "Enter your password.",
  "auth/missing-email": "Enter your email.",
  "auth/requires-recent-login": "For security, sign in again and retry.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/api-key-not-valid": "Sign-in is temporarily unavailable. Try again shortly.",
  "auth/api-key-not-valid.-": "Sign-in is temporarily unavailable. Try again shortly.",
  "auth/unauthorized-domain": "Sign-in is temporarily unavailable. Try again shortly.",
  "auth/invalid-api-key": "Sign-in is temporarily unavailable. Try again shortly."
};
function firebaseAuthCode(error) {
  if (!error || typeof error !== "object") return null;
  const code = "code" in error ? String(error.code || "") : "";
  if (code.startsWith("auth/")) return code.replace(/\.$/, "");
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/auth\/[a-z0-9.-]+/i);
  return match ? match[0].toLowerCase().replace(/\.$/, "") : null;
}
function friendlyAuthMessage(error, fallback = "Something went wrong. Try again.") {
  const code = firebaseAuthCode(error);
  if (code && MESSAGES[code]) return MESSAGES[code];
  const message = error instanceof Error ? error.message : "";
  if (!message) return fallback;
  if (/firebase/i.test(message) || /auth\//i.test(message)) return fallback;
  return message;
}

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
  "--orstrax-bg": colors.bg,
  "--orstrax-surface": colors.surface,
  "--orstrax-text": colors.ink,
  "--orstrax-text-muted": colors.muted,
  "--orstrax-border": colors.line,
  "--orstrax-nav": colors.navy,
  "--orstrax-accent": colors.accent,
  "--orstrax-radius-md": radius.default,
  "--orx-bg": colors.bg,
  "--orx-surface": colors.surface,
  "--orx-ink": colors.ink,
  "--orx-muted": colors.muted,
  "--orx-line": colors.line,
  "--orx-navy": colors.navy,
  "--orx-accent": colors.accent,
  "--orx-radius": radius.default
};
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
  LinkComponent,
  wordmarkSrc
}) {
  const scale = SIZES[size];
  const content = /* @__PURE__ */ jsxRuntime.jsxs("span", { className: `inline-flex items-end ${scale.gap} ${className}`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: wordmarkSrc || orstraxAssetHref("orstrax-wordmark.png"),
        alt: "Orstrax",
        className: `block ${scale.logo} w-auto max-w-[min(100%,11rem)] shrink-0 object-contain object-left`
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        className: `${scale.text} font-semibold leading-none tracking-tight ${tone === "muted" ? "text-[var(--orx-muted)]" : "text-[var(--orx-ink)]"}`,
        children: productName
      }
    )
  ] });
  if (href) {
    const Link = LinkComponent || "a";
    return /* @__PURE__ */ jsxRuntime.jsx(Link, { href, className: "inline-flex max-w-full items-end", "aria-label": `Orstrax ${productName}`, children: content });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex max-w-full items-end", role: "img", "aria-label": `Orstrax ${productName}`, children: content });
}
function PrimaryButton({ children, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      className: clsx.clsx(
        "rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60",
        className
      ),
      children
    }
  );
}
function SecondaryButton({ children, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      className: clsx.clsx(
        "rounded-lg border border-[var(--orx-line)] bg-white px-3 py-2 text-sm text-[var(--orx-ink)]",
        className
      ),
      children
    }
  );
}
function Button({ variant = "primary", ...props }) {
  const Component = variant === "primary" ? PrimaryButton : SecondaryButton;
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { ...props });
}
function Input({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      ...props,
      className: clsx.clsx(
        "desk-input w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    {
      ...props,
      className: clsx.clsx(
        "w-full rounded-[0.5rem] border border-[var(--orx-line)] bg-white px-3 py-2 text-[var(--orx-ink)]",
        className
      )
    }
  );
}
function FormField({ label, htmlFor, error, hint, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor, className: "block text-sm", children: [
    label,
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1", children }),
    hint && !error ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-xs text-[var(--orx-muted)]", children: hint }) : null,
    error ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-xs text-red-800", children: error }) : null
  ] });
}
function Card({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: clsx.clsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: clsx.clsx(
        "inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium capitalize",
        toneClasses[tone]
      ),
      children
    }
  );
}
function PageHeader({ title, description, actions, display }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "h1",
        {
          className: display ? "desk-display text-3xl text-[var(--orx-ink)]" : "text-2xl font-semibold text-[var(--orx-ink)]",
          children: title
        }
      ),
      description ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 max-w-2xl text-sm text-[var(--orx-muted)]", children: description }) : null
    ] }),
    actions ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: actions }) : null
  ] });
}
function EmptyState({ title, body, action }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] px-5 py-8", children: [
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium text-[var(--orx-ink)]", children: title }),
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 max-w-lg text-sm text-[var(--orx-muted)]", children: body }),
    action ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-4", children: action }) : null
  ] });
}
function Metric({ label, value, hint, href, LinkComponent }) {
  const body = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-[var(--orx-muted)]", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 text-2xl font-semibold tabular-nums text-[var(--orx-ink)]", children: value }),
    hint ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-xs text-[var(--orx-muted)]", children: hint }) : null
  ] });
  const className = "rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-4 transition-colors";
  if (href) {
    const Link = LinkComponent || "a";
    return /* @__PURE__ */ jsxRuntime.jsx(
      Link,
      {
        href,
        className: `${className} block hover:border-[var(--orx-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orx-accent)]`,
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: body });
}
function Divider({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("hr", { className: clsx.clsx("border-t border-[var(--orx-line)]", className) });
}
function TextLink({ href, children, LinkComponent }) {
  const Link = LinkComponent || "a";
  return /* @__PURE__ */ jsxRuntime.jsx(Link, { href, className: "text-sm text-[var(--orx-accent)] hover:underline", children });
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
  brandHref = "/",
  wordmarkSrc,
  footer
}) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "orstrax-auth desk-login", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        className: "orstrax-auth-motif orstrax-auth-motif-desktop",
        viewBox: "0 0 400 800",
        preserveAspectRatio: "xMinYMin slice",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxRuntime.jsxs("g", { fill: "none", stroke: "#1f2a37", strokeWidth: "1.2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 80 C 80 140, 40 220, 120 280" }),
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M40 90 C 20 180, 160 210, 90 300" }),
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10 200 C 140 240, 20 320, 110 390" }),
          /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M80 40 C 10 120, 180 160, 60 250" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "orstrax-auth-panel", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        OrstraxProductBrand,
        {
          productName,
          size: "lg",
          href: brandHref,
          LinkComponent,
          wordmarkSrc
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "orstrax-auth-tagline", children: tagline }),
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "orstrax-display desk-display orstrax-auth-title", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "orstrax-auth-form", children }),
      footer !== void 0 ? footer : /* @__PURE__ */ jsxRuntime.jsxs(AuthFooter, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("a", { href: "https://orstrax.io/privacy", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntime.jsx("a", { href: "https://desk.orstrax.io/help", children: "Help" }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "\xA9 ",
          year,
          " Orstrax LLC"
        ] })
      ] })
    ] })
  ] });
}
function AuthFooter({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("footer", { className: "orstrax-auth-footer", children });
}
function AuthDescription({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { className: "orstrax-auth-description", children });
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
  const [mobileOpen, setMobileOpen] = react.useState(false);
  const Link = LinkComponent || "a";
  const nav = /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "mt-4 space-y-5", "aria-label": productName, children: navigation.map((group) => {
    if (!group.items.length) return null;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--orx-muted)]", children: group.label }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1 flex flex-col gap-0.5", children: group.items.map((item) => {
        const Icon = item.icon;
        const active = item.active || false;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          Link,
          {
            href: item.href,
            onClick: () => setMobileOpen(false),
            className: active ? "flex w-full items-center gap-2 rounded-lg bg-[var(--orx-navy)] px-3 py-2 text-sm text-white" : "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--orx-ink)] hover:bg-[var(--orx-surface)]",
            "aria-label": item.badge ? `${item.label}, ${item.badge} unread` : void 0,
            children: [
              Icon ? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "relative shrink-0", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-4 w-4", "aria-hidden": true }),
                item.badge ? /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${active ? "bg-white" : "bg-[var(--orx-accent)]"}`,
                    "aria-hidden": true
                  }
                ) : null
              ] }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: item.label }),
              item.badge ? /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "desk-app min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("aside", { className: "hidden w-60 shrink-0 border-r border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:flex md:flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(OrstraxProductBrand, { productName, LinkComponent }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-[11px] text-[var(--orx-muted)]", children: tagline })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: nav }),
      helpHref ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4 rounded-[var(--orx-radius)] border border-[var(--orx-line)] bg-[var(--orx-surface)] p-3 text-xs text-[var(--orx-muted)]", children: [
        /* @__PURE__ */ jsxRuntime.jsx(OrstraxProductBrand, { productName, size: "sm" }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1", children: tagline }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "a",
          {
            href: helpHref,
            className: "mt-2 inline-block text-[var(--orx-accent)] hover:underline",
            children: "View docs \u2192"
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "flex items-center gap-3 border-b border-[var(--orx-line)] bg-[var(--orx-surface)] px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--orx-line)] text-[var(--orx-ink)] md:hidden",
            onClick: () => setMobileOpen(!mobileOpen),
            "aria-expanded": mobileOpen,
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            children: /* @__PURE__ */ jsxRuntime.jsx(MenuIcon, { open: mobileOpen })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(Link, { href: "/", className: "min-w-0 md:hidden", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntime.jsx(OrstraxProductBrand, { productName, size: "sm", LinkComponent }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "hidden min-w-0 md:block", children: [
          /* @__PURE__ */ jsxRuntime.jsx(OrstraxProductBrand, { productName, size: "sm", LinkComponent }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "hidden text-[11px] text-[var(--orx-muted)] lg:block", children: tagline })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-w-0 flex-1 justify-end md:justify-center", children: headerContent }),
        renderAccountMenu ? renderAccountMenu(user) : accountMenu ? accountMenu : /* @__PURE__ */ jsxRuntime.jsx(DefaultAccountMenu, { user })
      ] }),
      mobileOpen ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-b border-[var(--orx-line)] bg-[var(--orx-bg)] p-4 md:hidden", children: nav }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("main", { className: "flex-1 p-4 md:p-8", children })
    ] })
  ] }) });
}
function MenuIcon({ open }) {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "18", height: "18", viewBox: "0 0 18 18", "aria-hidden": true, className: "block", children: open ? /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M4 4 L14 14 M14 4 L4 14",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "flex h-8 w-8 items-center justify-center rounded-full bg-[var(--orx-navy)] text-xs font-medium text-white",
      "aria-label": user.displayName,
      children: initials(user.displayName)
    }
  ) });
}

exports.AuthDescription = AuthDescription;
exports.AuthFooter = AuthFooter;
exports.AuthLayout = AuthLayout;
exports.Badge = Badge;
exports.Button = Button;
exports.Card = Card;
exports.Divider = Divider;
exports.EmptyState = EmptyState;
exports.FormField = FormField;
exports.Input = Input;
exports.Metric = Metric;
exports.ORSTRAX_MARK_HREF = ORSTRAX_MARK_HREF;
exports.ORSTRAX_THEME_DEFAULT_VERSION = ORSTRAX_THEME_DEFAULT_VERSION;
exports.ORSTRAX_UI_DEFAULT_ORIGIN = ORSTRAX_UI_DEFAULT_ORIGIN;
exports.ORSTRAX_URLS = ORSTRAX_URLS;
exports.ORSTRAX_WORDMARK_HREF = ORSTRAX_WORDMARK_HREF;
exports.OrstraxAppShell = OrstraxAppShell;
exports.OrstraxProductBrand = OrstraxProductBrand;
exports.PageHeader = PageHeader;
exports.Panel = Panel;
exports.PrimaryButton = PrimaryButton;
exports.SecondaryButton = SecondaryButton;
exports.TextLink = TextLink;
exports.Textarea = Textarea;
exports.colors = colors;
exports.cssVars = cssVars;
exports.firebaseAuthCode = firebaseAuthCode;
exports.friendlyAuthMessage = friendlyAuthMessage;
exports.initials = initials;
exports.orstraxAssetHref = orstraxAssetHref;
exports.orstraxThemeHref = orstraxThemeHref;
exports.orstraxThemeVersion = orstraxThemeVersion;
exports.orstraxUiOrigin = orstraxUiOrigin;
exports.radius = radius;
exports.spacing = spacing;
exports.typography = typography;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map