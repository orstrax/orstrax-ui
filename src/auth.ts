/** Map Firebase Auth client errors to customer-safe copy. Never surface raw Firebase strings. */

const MESSAGES: Record<string, string> = {
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
  "auth/invalid-api-key": "Sign-in is temporarily unavailable. Try again shortly.",
};

export function firebaseAuthCode(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const code = "code" in error ? String((error as { code?: unknown }).code || "") : "";
  if (code.startsWith("auth/")) return code.replace(/\.$/, "");
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/auth\/[a-z0-9.-]+/i);
  return match ? match[0].toLowerCase().replace(/\.$/, "") : null;
}

export function friendlyAuthMessage(error: unknown, fallback = "Something went wrong. Try again."): string {
  const code = firebaseAuthCode(error);
  if (code && MESSAGES[code]) return MESSAGES[code];
  const message = error instanceof Error ? error.message : "";
  if (!message) return fallback;
  if (/firebase/i.test(message) || /auth\//i.test(message)) return fallback;
  return message;
}
