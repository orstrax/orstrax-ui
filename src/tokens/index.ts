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
export const colors = {
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
  accent: "#2f5da8",
} as const;

/**
 * Typography tokens
 * Inter for UI, Source Serif 4 for display headings.
 */
export const typography = {
  /** Primary UI font family */
  fontFamily: {
    sans: "var(--font-inter, ui-sans-serif, system-ui, sans-serif)",
    serif: "var(--font-source-serif, ui-serif, Georgia, serif)",
  },
  
  /** Display serif styling */
  display: {
    fontFamily: "var(--font-source-serif, ui-serif, Georgia, serif)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
} as const;

/**
 * Spacing scale
 * Generous but restrained spacing.
 */
export const spacing = {
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
  "3xl": "3rem",
} as const;

/**
 * Border radius tokens
 */
export const radius = {
  /** Standard radius for most elements - 0.625rem (10px) */
  default: "0.625rem",
  /** Smaller radius for compact elements - 0.5rem (8px) */
  sm: "0.5rem",
  /** Larger radius for cards - 0.75rem (12px) */
  lg: "0.75rem",
  /** Pill/button radius - 0.5rem (8px) */
  button: "0.5rem",
  /** Full rounded for pills - 9999px */
  full: "9999px",
} as const;

/**
 * CSS custom properties for runtime theming
 * Use these in components for consistency with Desk.
 */
export const cssVars = {
  "--orx-bg": colors.bg,
  "--orx-surface": colors.surface,
  "--orx-ink": colors.ink,
  "--orx-muted": colors.muted,
  "--orx-line": colors.line,
  "--orx-navy": colors.navy,
  "--orx-accent": colors.accent,
  "--orx-radius": radius.default,
} as const;
