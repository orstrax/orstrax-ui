import React from "react";
import { orstraxAssetHref } from "../runtime";

export interface OrstraxProductBrandProps {
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
export function OrstraxProductBrand({
  productName,
  href,
  size = "sm",
  tone = "accent",
  className = "",
  LinkComponent,
  wordmarkSrc,
}: OrstraxProductBrandProps) {
  const toneClass =
    tone === "muted" ? "orstrax-lockup-name--muted" : tone === "ink" ? "orstrax-lockup-name--ink" : "";

  const content = (
    <span className={`orstrax-lockup orstrax-lockup--${size} ${className}`.trim()}>
      <img
        src={wordmarkSrc || orstraxAssetHref("orstrax-wordmark.png")}
        alt="Orstrax"
        className="orstrax-lockup-mark"
      />
      <span className={`orstrax-lockup-name ${toneClass}`.trim()}>{productName}</span>
    </span>
  );

  if (href) {
    const Link = LinkComponent || "a";
    return (
      <Link href={href} className="orstrax-lockup-link inline-flex max-w-full items-end" aria-label={`Orstrax ${productName}`}>
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
