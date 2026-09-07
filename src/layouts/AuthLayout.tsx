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
        className="orstrax-auth-motif orstrax-auth-motif-mobile"
        viewBox="0 0 400 150"
        preserveAspectRatio="xMinYMin slice"
        aria-hidden
      >
        <g fill="none" stroke="#1f2a37" strokeWidth="0.8">
          <path d="M0 20 C 80 40, 160 25, 240 45 C 320 30, 400 50, 480 35" />
          <path d="M0 45 C 100 70, 200 50, 300 70 C 350 75, 420 68, 480 75" />
          <path d="M0 75 C 60 88, 140 80, 200 92 C 280 85, 360 95, 480 90" />
          <path d="M20 105 C 100 110, 200 108, 300 112 C 360 110, 440 115, 480 112" />
          <path d="M40 128 C 120 130, 240 129, 340 131 C 400 130, 460 132, 480 131" />
        </g>
      </svg>
      <svg
        className="orstrax-auth-motif orstrax-auth-motif-desktop"
        viewBox="0 0 400 800"
        aria-hidden
      >
        <g fill="none" stroke="#1f2a37" strokeWidth="1.2">
          <path d="M20 80 C 80 140, 40 220, 120 280" />
          <path d="M40 90 C 20 180, 160 210, 90 300" />
          <path d="M10 200 C 140 240, 20 320, 110 390" />
          <path d="M80 40 C 10 120, 180 160, 60 250" />
          <path d="M200 420 L 360 420" />
          <path d="M200 455 L 360 455" />
          <path d="M200 490 L 360 490" />
          <path d="M200 525 L 360 525" />
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
