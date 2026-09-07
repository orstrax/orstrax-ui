/**
 * Runtime URLs for the centrally hosted Orstrax theme and brand assets.
 *
 * CSS and canonical images are loaded from the UI host at request time.
 * This module only builds those URLs — it does not bundle the theme.
 */
declare const ORSTRAX_UI_DEFAULT_ORIGIN = "https://ui.orstrax.io";
declare const ORSTRAX_THEME_DEFAULT_VERSION = "v1.0.5";
declare const ORSTRAX_URLS: {
    readonly company: "https://orstrax.com";
    readonly hub: "https://www.orstrax.io";
    readonly desk: "https://desk.orstrax.io";
    readonly admin: "https://admin.orstrax.io";
    readonly orders: "https://orderflow.orstrax.io";
    readonly ordersHelp: "https://desk.orstrax.io/orderflow";
    readonly ui: "https://ui.orstrax.io";
};
declare function orstraxUiOrigin(): string;
declare function orstraxThemeVersion(): string;
declare function orstraxThemeHref(version?: string): string;
declare function orstraxAssetHref(file: string): string;
declare const ORSTRAX_WORDMARK_HREF = "https://ui.orstrax.io/assets/orstrax-wordmark.png";
declare const ORSTRAX_MARK_HREF = "https://ui.orstrax.io/assets/orstrax-mark.png";

export { ORSTRAX_MARK_HREF, ORSTRAX_THEME_DEFAULT_VERSION, ORSTRAX_UI_DEFAULT_ORIGIN, ORSTRAX_URLS, ORSTRAX_WORDMARK_HREF, orstraxAssetHref, orstraxThemeHref, orstraxThemeVersion, orstraxUiOrigin };
