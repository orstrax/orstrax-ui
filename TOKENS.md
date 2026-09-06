# Design Token Inventory

Extracted from Orstrax Desk production UI.

## Colors

### Core Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--orx-bg` | `#f4efe6` | Warm cream page background |
| `--orx-surface` | `#fffcf7` | Light cream surface/card background |
| `--orx-ink` | `#1c1915` | Primary text color |
| `--orx-muted` | `#6f675c` | Muted/secondary text |
| `--orx-line` | `#e4dcd0` | Borders and dividers |
| `--orx-navy` | `#1f2a37` | Dark navy for primary actions and navigation |
| `--orx-accent` | `#2f5da8` | Accent blue for links and interactive elements |

### Usage in Desk

- **Page background**: Warm cream (#f4efe6)
- **Cards/modals**: Light cream surface (#fffcf7)
- **Primary text**: Dark ink (#1c1915)
- **Secondary text**: Muted brown (#6f675c)
- **Borders**: Warm beige (#e4dcd0)
- **Active navigation**: Navy (#1f2a37)
- **Links/accents**: Blue (#2f5da8)

## Typography

### Fonts

| Font | Usage | Weight | Letter Spacing |
|------|-------|--------|----------------|
| **Inter** | UI text, buttons, navigation, forms | 400-600 | Normal |
| **Source Serif 4** | Display headings, titles | 600 | -0.02em |

### Scale

| Element | Class | Size | Weight |
|---------|-------|------|--------|
| Display Heading | `.desk-display` | Varies | 600 |
| Page Title | `h1` | 2xl (1.5rem) | 600 |
| Section Header | `h2` | xl (1.25rem) | 600 |
| Subsection | `h3` | lg (1.125rem) | 600 |
| Body | `p` | base (1rem) | 400 |
| Small | `.text-sm` | sm (0.875rem) | 400 |
| Tiny | `.text-xs` | xs (0.75rem) | 400 |
| Nav Labels | `.text-[10px]` | 10px | 600, uppercase |

## Spacing

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `xs` | 0.25rem | 4px | Minimal spacing |
| `sm` | 0.5rem | 8px | Compact spacing |
| `md` | 0.75rem | 12px | Standard spacing |
| `lg` | 1rem | 16px | Comfortable spacing |
| `xl` | 1.5rem | 24px | Section gaps |
| `2xl` | 2rem | 32px | Large gaps |
| `3xl` | 3rem | 48px | Major sections |

### Common Patterns in Desk

- **Card padding**: 1rem (16px)
- **Form field gap**: 1rem (16px)
- **Section gap**: 1.5rem (24px)
- **Page margins**: 1rem mobile, 2rem desktop
- **Sidebar padding**: 1rem (16px)
- **Nav item padding**: 0.75rem 1rem (12px 16px)

## Border Radius

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `default` | 0.625rem | 10px | Standard for most elements |
| `sm` | 0.5rem | 8px | Compact elements, inputs |
| `lg` | 0.75rem | 12px | Cards, larger surfaces |
| `button` | 0.5rem | 8px | Buttons |
| `full` | 9999px | Full | Pills, avatars |

### Usage in Desk

- **Buttons**: 0.5rem (8px) - `rounded-lg`
- **Inputs**: 0.5rem (8px)
- **Cards**: 0.625rem (10px) - `var(--orx-radius)`
- **Badges**: 0.375rem (6px) - `rounded-md`
- **Nav items**: 0.5rem (8px) - `rounded-lg`

## Shadows

Desk uses minimal shadows, relying on borders and surfaces for depth.

```css
/* Rare usage - mostly borders instead */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

## Focus States

```css
:focus-visible {
  outline: 2px solid var(--orx-accent);
  outline-offset: 2px;
}
```

## Responsive Breakpoints

Desk uses standard Tailwind breakpoints:

| Breakpoint | Value |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Key Responsive Behaviors

- **Sidebar**: Hidden on mobile, visible from `md` (768px)
- **Mobile nav**: Drawer on mobile, disappears at `md`
- **Header**: Compact on mobile, full at `md`
- **Grid layouts**: Stack on mobile, grid from `md` or `lg`

## Component-Specific Tokens

### Navigation

- **Sidebar width**: 15rem (240px)
- **Nav item height**: ~40px
- **Nav section gap**: 1.25rem (20px)
- **Active nav bg**: Navy (#1f2a37)
- **Hover nav bg**: Surface (#fffcf7)

### Auth Pages

- **Max width**: 32rem (512px)
- **Padding**: 1.5rem mobile, 1.5rem desktop
- **Title size**: 2.25rem (36px)
- **Decorative lines**: Navy (#1f2a37) at 18% opacity

### Badges

- **Padding**: 0.375rem 0.5rem (6px 8px)
- **Font size**: 0.75rem (12px)
- **Font weight**: 500

### Metrics/Stats

- **Label**: 0.75rem (12px) uppercase
- **Value**: 1.5rem (24px) semibold
- **Card padding**: 1rem (16px)

## Normalization Notes

### Values Kept from Desk

- Warm cream background (#f4efe6) - **distinctive Orstrax look**
- Navy for active states (#1f2a37) - **consistent across UI**
- Source Serif 4 for display - **brand personality**
- 10px base radius - **slightly softer than standard 8px**

### Minor Inconsistencies Normalized

- Some cards used 8px, some 10px → Standardized to 10px
- Some text used gray-600, some custom brown → Standardized to --orx-muted
- Focus outlines were sometimes missing → Standardized to 2px accent

### Intentionally NOT Changed

- Button heights vary by context (auth vs. internal) - **kept as-is**
- Some spacing is tighter in dense UIs - **kept as-is**
- Form layouts vary by page - **kept flexible**
