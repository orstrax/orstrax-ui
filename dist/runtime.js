'use strict';

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

exports.ORSTRAX_MARK_HREF = ORSTRAX_MARK_HREF;
exports.ORSTRAX_THEME_DEFAULT_VERSION = ORSTRAX_THEME_DEFAULT_VERSION;
exports.ORSTRAX_UI_DEFAULT_ORIGIN = ORSTRAX_UI_DEFAULT_ORIGIN;
exports.ORSTRAX_URLS = ORSTRAX_URLS;
exports.ORSTRAX_WORDMARK_HREF = ORSTRAX_WORDMARK_HREF;
exports.orstraxAssetHref = orstraxAssetHref;
exports.orstraxThemeHref = orstraxThemeHref;
exports.orstraxThemeVersion = orstraxThemeVersion;
exports.orstraxUiOrigin = orstraxUiOrigin;
//# sourceMappingURL=runtime.js.map
//# sourceMappingURL=runtime.js.map