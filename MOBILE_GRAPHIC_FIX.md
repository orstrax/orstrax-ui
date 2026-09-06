# Mobile Decorative Graphic Enhancement

## Issue
User reported not seeing the decorative graphic on mobile login screen.

## Root Cause
The initial mobile implementation had several issues:
1. **Too subtle opacity**: `opacity-[0.12]` was barely visible on cream background
2. **Limited coverage**: `h-32` height was too small
3. **Sparse paths**: Only 4 simple paths didn't create enough visual presence
4. **Wrong alignment**: `xMidYMid` centering caused graphic to not start from edge

## Solution
Enhanced the mobile SVG graphic with:

### Visual Improvements
- **Increased opacity**: `0.12` → `0.15` (25% more visible)
- **Taller height**: `h-32` → `h-40` (25% more vertical space)
- **Thicker strokes**: `1.2` → `1.4` stroke width
- **More paths**: Added 5 total paths instead of 4
- **Better coverage**: Extended paths horizontally from edge to edge

### Technical Changes
```tsx
// Before
<svg
  className="pointer-events-none absolute left-0 top-0 h-32 w-full opacity-[0.12] lg:hidden"
  viewBox="0 0 400 120"
  preserveAspectRatio="xMidYMid slice"
  aria-hidden
>
  <g fill="none" stroke="#1f2a37" strokeWidth="1.2">
    <path d="M20 40 C 80 60, 140 40, 200 60" />
    <path d="M40 50 C 100 70, 160 50, 220 70" />
    <path d="M200 80 L 380 80" />
    <path d="M200 95 L 380 95" />
  </g>
</svg>

// After
<svg
  className="pointer-events-none absolute left-0 top-0 h-40 w-full opacity-[0.15] lg:hidden"
  viewBox="0 0 400 150"
  preserveAspectRatio="xMinYMin slice"
  aria-hidden
>
  <g fill="none" stroke="#1f2a37" strokeWidth="1.4">
    <path d="M0 30 C 100 50, 200 30, 300 50 C 350 55, 400 50, 450 55" />
    <path d="M0 50 C 120 75, 220 50, 320 75 C 370 80, 420 75, 470 80" />
    <path d="M50 100 L 400 100" />
    <path d="M50 120 L 400 120" />
    <path d="M50 135 L 350 135" />
  </g>
</svg>
```

## Key Changes
1. **Path extension**: Curves now extend from `M0` (left edge) with extended chains
2. **Horizontal lines**: Three staggered lines at bottom create stronger visual anchor
3. **Alignment**: `xMinYMin` ensures graphic starts from top-left corner
4. **ViewBox**: Expanded to `400 150` to accommodate taller content

## Visual Result
- Subtle but **visible** decorative element at top of mobile login
- Maintains "chaos/clarity" brand motif from desktop
- Doesn't compete with content
- Feels like natural extension of desktop treatment

## Verification
Test on mobile viewport (< 1024px) at `/desk/login` - should see abstract curved and horizontal lines at top of screen above "Orstrax Desk" branding.

## Files Changed
- `/workspace/src/layouts/AuthLayout.tsx`

## Deployed
- Committed to `orstrax-ui` main branch (commit `7122708`)
- Available for all products using `@orstrax/ui`
