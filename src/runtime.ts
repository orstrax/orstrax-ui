/**
 * Runtime URLs for the centrally hosted Orstrax theme and brand assets.
 *
 * CSS and canonical images are loaded from the UI host at request time.
 * This module only builds those URLs — it does not bundle the theme.
 */

export const ORSTRAX_UI_DEFAULT_ORIGIN = "https://ui.orstrax.io";
export const ORSTRAX_THEME_DEFAULT_VERSION = "v1.0.5";

export const ORSTRAX_URLS = {
  company: "https://orstrax.com",
  hub: "https://www.orstrax.io",
  desk: "https://desk.orstrax.io",
  admin: "https://admin.orstrax.io",
  orders: "https://orderflow.orstrax.io",
  ordersHelp: "https://desk.orstrax.io/orderflow",
  ui: ORSTRAX_UI_DEFAULT_ORIGIN,
} as const;

function readEnv(name: string): string | undefined {
  const runtime = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return runtime.process?.env?.[name];
}

export function orstraxUiOrigin(): string {
  return (readEnv("NEXT_PUBLIC_ORSTRAX_UI_ORIGIN") || ORSTRAX_UI_DEFAULT_ORIGIN).replace(/\/$/, "");
}

export function orstraxThemeVersion(): string {
  return (readEnv("NEXT_PUBLIC_ORSTRAX_THEME_VERSION") || ORSTRAX_THEME_DEFAULT_VERSION).replace(/^\/+|\/+$/g, "");
}

export function orstraxThemeHref(version = orstraxThemeVersion()): string {
  return `${orstraxUiOrigin()}/theme/${version}/orstrax.css`;
}

export function orstraxAssetHref(file: string): string {
  return `${orstraxUiOrigin()}/assets/${file.replace(/^\/+/, "")}`;
}

export const ORSTRAX_WORDMARK_HREF = `${ORSTRAX_UI_DEFAULT_ORIGIN}/assets/orstrax-wordmark.png`;
export const ORSTRAX_MARK_HREF = `${ORSTRAX_UI_DEFAULT_ORIGIN}/assets/orstrax-mark.png`;
