import React from "react";
import { OrstraxProductBrand } from "../components/OrstraxProductBrand";

export interface AuthLayoutProps {
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
export function AuthLayout({
  productName,
  tagline,
  title,
  children,
  LinkComponent,
  brandHref = "/",
  wordmarkSrc,
  footer,
}: AuthLayoutProps) {
  const year = new Date().getFullYear();
  return (
    <div className="orstrax-auth desk-login">
      <svg
        className="orstrax-auth-motif orstrax-auth-motif-desktop"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMinYMin slice"
        aria-hidden
      >
        <g fill="none" stroke="#1f2a37" strokeWidth="1.2">
          <path d="M20 80 C 80 140, 40 220, 120 280" />
          <path d="M40 90 C 20 180, 160 210, 90 300" />
          <path d="M10 200 C 140 240, 20 320, 110 390" />
          <path d="M80 40 C 10 120, 180 160, 60 250" />
        </g>
      </svg>
      <div className="orstrax-auth-panel">
        <OrstraxProductBrand
          productName={productName}
          size="lg"
          href={brandHref}
          LinkComponent={LinkComponent}
          wordmarkSrc={wordmarkSrc}
        />
        <p className="orstrax-auth-tagline">{tagline}</p>
        <h1 className="orstrax-display desk-display orstrax-auth-title">{title}</h1>
        <div className="orstrax-auth-form">{children}</div>
        {footer !== undefined ? (
          footer
        ) : (
          <AuthFooter>
            <a href="https://orstrax.io/privacy">Privacy</a>
            <a href="https://desk.orstrax.io/help">Help</a>
            <span>© {year} Orstrax LLC</span>
          </AuthFooter>
        )}
      </div>
    </div>
  );
}

export function AuthFooter({ children }: { children: React.ReactNode }) {
  return <footer className="orstrax-auth-footer">{children}</footer>;
}

export function AuthDescription({ children }: { children: React.ReactNode }) {
  return <p className="orstrax-auth-description">{children}</p>;
}
