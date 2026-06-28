
# Modern UI Redesign — Glass Aurora + Bento

A site-wide visual refresh. No functional/business-logic changes. All existing content (projects, chatbot, auth, gallery sync, etc.) stays intact.

## Design Direction

**Palette (Glass Aurora)** — applied as semantic tokens in `src/index.css`:
- Background base: `#1a1a2e` (deep midnight)
- Surface / elevated: `#16213e` (steel navy)
- Primary accent: `#4ade80` (aurora green)
- Secondary accent: `#a78bfa` (lavender)
- Gradients: aurora sweep `linear-gradient(135deg, #4ade80, #a78bfa)`; surface glow `radial-gradient(circle at top, #a78bfa22, transparent)`

**Typography**:
- Headings → Space Grotesk (600/700), tight tracking
- Body → DM Sans (400/500)
- Install via `@fontsource/space-grotesk` + `@fontsource/dm-sans`, import in `src/main.tsx`, register in `tailwind.config.ts` (`font-display`, `font-sans`).

**Aesthetic — Bento + Glass**:
- Mixed-size cards (col-span 1/2, row-span 1/2) in About, TechStack, Stats, Certifications, Gallery, CodingProof.
- Frosted glass surfaces: `bg-white/5 backdrop-blur-xl border border-white/10`, soft inner glow on hover.
- Rounded `rounded-2xl` / `rounded-3xl`, generous padding, aurora-tinted shadows.
- Subtle aurora gradient borders on featured cards (conic gradient mask).

**Motion**:
- Keep existing framer-motion entrance animations.
- Add hover lift (`y: -4`, glow intensify), gradient shimmer on primary CTAs.
- Respect `prefers-reduced-motion`.

## Section-by-Section Changes

| Section | Change |
|---|---|
| Tokens (`index.css`) | Swap `--portfolio-*`, `--primary`, `--accent`, gradients, shadows to Glass Aurora values (dark + light themes) |
| `tailwind.config.ts` | Add `fontFamily.display` (Space Grotesk) + `fontFamily.sans` (DM Sans); add `backdrop-blur-xl` utility class extensions if needed |
| `main.tsx` | Import font CSS |
| Hero | Aurora gradient on name, glass CTA buttons, refined avatar ring with aurora glow |
| Sidebar | Glass panel, aurora active-link indicator |
| About | 2-col bento: profile card (large) + 3 small info tiles (education, focus, location) |
| StatsCounter | 4 glass bento tiles with aurora numbers |
| TechStack | Bento grid grouping (Languages / ML / Cloud / Tools) — varied tile sizes |
| Experience | Timeline with aurora gradient spine, glass cards |
| Projects | Keep current structure (Research/Featured/Other); restyle cards as glass with aurora accent for Research (lavender) and Featured (green), bento sizing optional for featured row |
| CodingProof | Glass tiles for LeetCode/Deep-ML stats |
| Certifications | Bento grid of cert cards |
| Gallery | Masonry already → tighten with glass overlay captions |
| Blog | Glass cards, aurora category pills |
| Contact | Glass form, aurora submit button |
| AIChatbot | Glass panel, aurora send button, keep all logic |
| BackgroundMusic / ElevenLabsWidget | Restyle floating buttons as glass orbs |

## Technical Notes

- All colors via HSL semantic tokens — no hardcoded hex in components.
- New token additions: `--aurora-green`, `--aurora-lavender`, `--gradient-aurora`, `--glass-bg`, `--glass-border`, `--shadow-aurora`.
- Add reusable utility class `.glass-card` in `index.css` `@layer components`.
- No DB / edge function / auth changes. No new dependencies beyond the two font packages.
- Files touched (approx): `src/index.css`, `tailwind.config.ts`, `src/main.tsx`, and the component files listed above. Logic in each component preserved verbatim.

## Out of Scope

- Content rewrites, new sections, new features, backend changes, chatbot logic, project data.
