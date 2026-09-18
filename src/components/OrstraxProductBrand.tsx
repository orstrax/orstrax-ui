import React from "react";
import { orstraxAssetHref } from "../runtime";

export interface OrstraxProductBrandProps {
  /** Product name beside the shared X (e.g. "Orderflow", "Desk", "Admin") */
  productName: string;

  /** Optional href for link wrapper */
  href?: string;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Color tone. Default product navy is #13293d. */
  tone?: "product" | "accent" | "ink" | "muted";

  /** Additional CSS classes */
  className?: string;

  /** Optional link component (e.g., Next.js Link) */
  LinkComponent?: React.ElementType;

  /** Optional hosted X / mark override. Defaults to the shared Orstrax X. */
  markSrc?: string;

  /** @deprecated Use markSrc. Kept so older AuthLayout callers keep working. */
  wordmarkSrc?: string;
}

/**
 * Shared Orstrax family mark + product name.
 * Visuals (X asset, Semplicita, #13293d, sizes) come from the hosted theme.
 */
export function OrstraxProductBrand({
  productName,
  href,
  size = "sm",
  tone = "product",
  className = "",
  LinkComponent,
  markSrc,
  wordmarkSrc,
}: OrstraxProductBrandProps) {
  const toneClass =
    tone === "muted"
      ? "orstrax-lockup-name--muted"
      : tone === "ink"
        ? "orstrax-lockup-name--ink"
        : tone === "accent"
          ? "orstrax-lockup-name--accent"
          : "";

  const content = (
    <span className={`orstrax-lockup orstrax-lockup--${size} ${className}`.trim()}>
      <img
        src={markSrc || wordmarkSrc || orstraxAssetHref("orstrax-x.png")}
        alt=""
        className="orstrax-lockup-mark"
      />
      <span className={`orstrax-lockup-name ${toneClass}`.trim()}>{productName}</span>
    </span>
  );

  if (href) {
    const Link = LinkComponent || "a";
    return (
      <Link href={href} className="orstrax-lockup-link inline-flex max-w-full items-center" aria-label={productName}>
        {content}
      </Link>
    );
  }

  return (
    <span className="inline-flex max-w-full items-center" role="img" aria-label={productName}>
      {content}
    </span>
  );
}
