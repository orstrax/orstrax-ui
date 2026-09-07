import React from "react";
import { orstraxAssetHref } from "../runtime";

/**
 * Size configurations for the product brand component.
 * Matches the exact sizing used in Desk.
 */
const SIZES = {
  sm: { logo: "h-5", text: "text-sm", gap: "gap-1.5" },
  md: { logo: "h-7", text: "text-base", gap: "gap-2" },
  lg: { logo: "h-8 sm:h-9", text: "text-xl sm:text-2xl", gap: "gap-2.5" },
} as const;

export interface OrstraxProductBrandProps {
  /** Product name to display next to the wordmark (e.g., "Desk", "Orders", "Admin") */
  productName: string;
  
  /** Optional href for link wrapper */
  href?: string;
  
  /** Size variant */
  size?: keyof typeof SIZES;
  
  /** Color tone */
  tone?: "ink" | "muted";
  
  /** Additional CSS classes */
  className?: string;
  
  /** Optional link component (e.g., Next.js Link) */
  LinkComponent?: React.ElementType;
  
  /** Optional custom wordmark image source (defaults to shared Orstrax wordmark) */
  wordmarkSrc?: string;
}

/**
 * OrstraxProductBrand
 * 
 * Displays the canonical Orstrax wordmark + product name treatment.
 * This component reproduces the exact branding approach used in Desk:
 * 
 * - Same proportions and spacing
 * - Same baseline alignment
 * - Same responsive behavior
 * - Same mobile treatment
 * 
 * The wordmark itself is the exact shared canonical asset from Desk.
 * 
 * @example
 * ```tsx
 * <OrstraxProductBrand productName="Desk" />
 * <OrstraxProductBrand productName="Orders" size="lg" href="/" />
 * <OrstraxProductBrand productName="Admin" tone="muted" />
 * ```
 */
export function OrstraxProductBrand({
  productName,
  href,
  size = "sm",
  tone = "ink",
  className = "",
  LinkComponent,
  wordmarkSrc,
}: OrstraxProductBrandProps) {
  const scale = SIZES[size];
  
  const content = (
    <span className={`inline-flex items-end ${scale.gap} ${className}`}>
      <img
        src={wordmarkSrc || orstraxAssetHref("orstrax-wordmark.png")}
        alt="Orstrax"
        className={`block ${scale.logo} w-auto max-w-[min(100%,11rem)] shrink-0 object-contain object-left`}
      />
      <span
        className={`${scale.text} font-semibold leading-none tracking-tight ${
          tone === "muted" ? "text-[var(--orx-muted)]" : "text-[var(--orx-ink)]"
        }`}
      >
        {productName}
      </span>
    </span>
  );
  
  if (href) {
    const Link = LinkComponent || "a";
    return (
      <Link href={href} className="inline-flex max-w-full items-end" aria-label={`Orstrax ${productName}`}>
        {content}
      </Link>
    );
  }
  
  return (
    <span className="inline-flex max-w-full items-end" role="img" aria-label={`Orstrax ${productName}`}>
      {content}
    </span>
  );
}
