<!--
Copyright (c) 2026 Contributors to the Eclipse Foundation

See the NOTICE file(s) distributed with this work for additional
information regarding copyright ownership.

This work is licensed under the Creative Commons Attribution 4.0
International License. To view a copy of this license, visit
https://creativecommons.org/licenses/by/4.0/legalcode.

SPDX-License-Identifier: CC-BY-4.0
-->

# Eclipse Tractus-X — Design Guidelines Brief (for a PowerPoint deck)

> 👋 Hi! I'm the **KIT Master Builder**. This file is a ready-to-send brief for **Claude Design**.
> Paste the whole document into Claude Design and ask it to generate a PowerPoint (`.pptx`) that
> documents the Eclipse Tractus-X visual design system: logo usage, color palettes, gradients,
> typography, and component styling. Every value below is taken directly from this repository, so the
> deck will be faithful to the real design system.

---

## 0. Instructions for Claude Design

**Goal:** Produce a clean, professional **PowerPoint brand & design-guidelines deck** for the Eclipse
Tractus-X project.

**Deliverable:** A `.pptx` file, 16:9, roughly **12–16 slides**, using the structure in
[Section 8 — Suggested Slide Deck Outline](#8-suggested-slide-deck-outline).

**Design direction for the deck itself:**
- Use the Tractus-X palette below. Lead with **orange `#FAA023`** as the accent and the new
  **blue gradient (`#046B99` → `#002060`)** for section dividers and hero/title slides.
- Typography: **Manrope** (fallback: Inter / Arial / system sans-serif).
- Keep slides minimal and airy — generous whitespace, one idea per slide, large color swatches.
- Show every color with its **HEX value** printed on the swatch.
- Render gradients as full-bleed rectangles with the direction/angle labeled.
- Where a logo is referenced, show it on **both light and dark backgrounds**.
- Do **not** distort, recolor, or add effects to the primary logo.

---

## 1. Brand Overview

| Property | Value |
|---|---|
| Project name | **Eclipse Tractus-X** |
| Tagline | *Where We Build Dataspaces* |
| Governance | Eclipse Foundation project |
| Website | https://eclipse-tractusx.github.io |
| Character | Open, technical, trustworthy, collaborative, modern |

---

## 2. Color Palette

### 2.1 Primary — Tractus-X Orange
The core brand accent used for links, buttons, highlights, and calls to action.

| Token | HEX | Usage |
|---|---|---|
| `--ifm-color-primary` | `#FAA023` | Primary accent (base) |
| `--ifm-color-primary-dark` | `#F99407` | Hover / darker accent |
| `--ifm-color-primary-darker` | `#ED8C05` | Darker accent |
| `--ifm-color-primary-darkest` | `#C37304` | Darkest accent |
| `--ifm-color-primary-light` | `#FBAC3F` | Light accent |
| `--ifm-color-primary-lighter` | `#FBB24D` | Lighter accent |
| `--ifm-color-primary-lightest` | `#FCC477` | Lightest accent / subtle fills |

### 2.2 Secondary — Tractus-X Green
Taken from the official logo mark; used as a complementary accent.

| Token | HEX | Usage |
|---|---|---|
| Logo green | `#AFC72D` | Secondary accent, logo leaf/mark |

### 2.3 Blue Gradient (NEW — please feature prominently)
A signature blue gradient to be used for **hero slides, section dividers, banners, and title panels**.

| Property | Value |
|---|---|
| Direction | Left → Right (horizontal, `90deg`) |
| Start (0%) | `#046B99` |
| End (100%) | `#002060` |
| CSS | `linear-gradient(90deg, #046B99 0%, #002060 100%)` |

Also provide a **135° diagonal** variant to match the KIT gradient convention used across the site:
`linear-gradient(135deg, #046B99 0%, #002060 100%)`.

### 2.4 Neutrals & UI

| Token | Light theme | Dark theme |
|---|---|---|
| Background | `#FFFFFF` | `#000000` |
| Navbar background | `#F0F0F0` | `#000000` |
| Heading / base text | `#000000` | `#FFFFFF` |
| Menu / muted text | `#00000099` (60% black) | `#FFFFFF` |
| Card border | `rgba(0,0,0,0.3)` | `rgba(255,255,255,0.3)` |
| Secondary darkest | `#626262` | `#000000` |

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Primary typeface | **Manrope** (Regular) | Bundled as `static/font/Manrope-Regular.ttf` |
| Fallbacks | Inter, Arial, system sans-serif | Use when Manrope is unavailable |
| Button/label weight | 700 (bold) | Used by the gradient button component |

Guidance for the deck: use Manrope for all headings and body. Titles large and bold; body text
comfortable and legible; avoid condensed or decorative fonts.

---

## 4. Logo System

All logo assets live under `static/img/tx-logos/`.

| Asset | File | Use |
|---|---|---|
| Primary logo (SVG) | `logo_tractus-x.svg` | Main navbar/brand logo. Colors: orange `#FAA023` + green `#AFC72D` |
| "Where We Build Dataspaces" — light | `241215_Tractus-X_..._Logo_Light.png` | Lockup for light backgrounds |
| "Where We Build Dataspaces" — dark | `241215_Tractus-X_..._Logo_Dark.png` | Lockup for dark backgrounds |
| Gradient brand background | `221103_TractusX_Gradient*.png` | Full-bleed brand backdrop (slim/smaller variants available) |
| Seasonal (Xmas) | `logo-tractus-x-xmas.drawio.svg` | Optional festive variant |
| Seasonal (Easter) | `logo-tractus-x-easter.drawio.svg` | Optional festive variant |
| Eclipse Foundation (white) | `static/img/EF_registered_wht_svg.svg` | Foundation attribution |
| Eclipse Dataspace WG | `static/img/edwg-logo-white.svg` | Working-group attribution |

**Logo usage rules:**
- Preserve clear space around the logo; never crowd it.
- Never stretch, rotate, recolor, or add drop shadows to the primary logo.
- Use the light lockup on dark backgrounds and the dark lockup on light backgrounds.
- Keep the orange/green relationship intact.

---

## 5. KIT 3D Logo & Gradient Convention

Individual KITs each have a **primary color** and a matching **gradient**, following a consistent
recipe (from `data/kitsData.js`):

```
colors: {
  primary:  '#2316E3',
  gradient: 'linear-gradient(135deg, #3372CC 0%, #2316E3 100%)'
}
```

**Convention:** `linear-gradient(135deg, <lighter shade> 0%, <primary> 100%)`.

Real examples to show as swatches in the deck:

| KIT accent | Primary | Gradient |
|---|---|---|
| Blue | `#2316E3` | `linear-gradient(135deg, #3372CC 0%, #2316E3 100%)` |
| Red/Pink | `#EA3650` | `linear-gradient(135deg, #F08B9B 0%, #EA3650 100%)` |
| Orange | `#F45D3C` | `linear-gradient(135deg, #FFBD59 0%, #F45D3C 100%)` |
| Purple | `#9653ED` | `linear-gradient(135deg, #E5CCFF 0%, #9653ED 100%)` |
| **Deep blue (new)** | `#002060` | `linear-gradient(135deg, #046B99 0%, #002060 100%)` |

---

## 6. Component Styling Patterns

### 6.1 Gradient Button (`src/components/2.0/GradientButton`)
- Shape: pill/rounded rectangle, `border-radius: 12px`.
- Padding: `18px 28px`; text weight `700`; text color white.
- Background: a CSS gradient (per-instance). Includes a colored box-shadow that intensifies on hover.
- **Apply the blue gradient** as a button style:
  - `background: linear-gradient(135deg, #046B99 0%, #002060 100%)`
  - `box-shadow: rgba(4, 107, 153, 0.3)` → hover `rgba(4, 107, 153, 0.4)`

### 6.2 Cards & surfaces
- Rounded corners, subtle 30%-opacity border, generous internal padding.
- Light/dark aware: swap background and border tokens per theme (see Section 2.4).

### 6.3 Light & Dark mode
The site supports both themes. Every color choice must be checked for contrast in both. Keep the
orange accent identical across themes; swap only backgrounds, text, and borders.

---

## 7. Accessibility & Do/Don't

**Do**
- Maintain WCAG AA contrast (≥ 4.5:1 for body text) on both light and dark backgrounds.
- Reserve the orange for accents and interactive elements, not large text blocks.
- Use the blue gradient for impact areas (heroes, dividers) with **white** text on top.

**Don't**
- Don't place mid-tone text directly on the middle of a gradient without checking contrast.
- Don't recolor or distort logos.
- Don't introduce off-palette colors; derive tints/shades from the tokens above.

---

## 8. Suggested Slide Deck Outline

1. **Title slide** — full-bleed blue gradient (`#046B99` → `#002060`), Tractus-X light logo, deck title.
2. **Brand overview** — name, tagline, character, website (Section 1).
3. **Primary palette** — orange swatches with all 7 tokens + HEX (Section 2.1).
4. **Secondary color** — green `#AFC72D` in context with the logo (Section 2.2).
5. **Blue gradient (feature slide)** — big swatch, direction label, both `90deg` and `135deg` CSS (Section 2.3).
6. **Neutrals & UI tokens** — light vs dark table (Section 2.4).
7. **Typography** — Manrope specimen, weights, fallbacks (Section 3).
8. **Logo system** — primary logo + lockups on light and dark (Section 4).
9. **Logo do's & don'ts** — clear space, misuse examples (Section 4).
10. **KIT gradient convention** — 5 example gradient swatches incl. the new deep blue (Section 5).
11. **Components: Gradient button** — show the blue-gradient button state (Section 6.1).
12. **Components: Cards & themes** — light/dark surfaces (Sections 6.2–6.3).
13. **Accessibility & Do/Don't** — contrast guidance (Section 7).
14. **Closing / contact** — website, GitHub, Eclipse Foundation + EDWG logos on a gradient panel.

---

## 9. Quick Copy-Paste Values

```
# Primary (orange)
#FAA023  #F99407  #ED8C05  #C37304  #FBAC3F  #FBB24D  #FCC477

# Secondary (green)
#AFC72D

# Blue gradient (NEW)
linear-gradient(90deg,  #046B99 0%, #002060 100%)   /* left -> right */
linear-gradient(135deg, #046B99 0%, #002060 100%)   /* diagonal variant */

# Neutrals
#FFFFFF  #F0F0F0  #000000  #626262  #00000099

# Typography
Manrope (Regular)  — fallbacks: Inter, Arial, sans-serif
```

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- This file is part of the [eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io) project.
- Copyright (c) 2026 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/eclipse-tractusx.github.io
