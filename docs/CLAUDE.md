# CLAUDE.md

## Project Overview

This is a **modern personal portfolio website** built with **Next.js 16 and React 19**, showcasing a developer's work, skills, and experience through an interactive, animated interface. The project combines cutting-edge web technologies with smooth user experience patterns, featuring a component-driven architecture, advanced animations via Framer Motion, and accessible UI primitives from shadcn/ui and Radix UI.

### Key Characteristics
- **Framework**: Next.js 16 with React 19 (App Router)
- **Styling**: Tailwind CSS v4 with custom design tokens (gold primary `#c9a96e`, dark theme)
- **Animations**: Framer Motion with cursor tracking, parallax effects, and staggered entrance animations
- **UI Library**: shadcn/ui components (badge, button, card, separator) + Radix UI primitives
- **Type Safety**: TypeScript strict mode with path aliases (`@/*`)
- **Accessibility**: ARIA attributes, focus management, semantic HTML
- **Design Pattern**: Bento grid layouts, glass-morphism effects, motion-wrapped sections

---

## Tech Stack

### Core Dependencies
- **Next.js 16**: React framework with built-in optimization and App Router
- **React 19**: Latest React with improved performance and features
- **Framer Motion 11**: Animation library for interactive motion effects
- **Tailwind CSS 4**: Utility-first CSS framework with CSS variables
- **TypeScript 5**: Strict type checking and developer experience
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library with consistent design
- **CVA (Class Variance Authority)**: Type-safe component variant management
- **clsx + tailwind-merge**: Safe Tailwind class composition

### Development Tools
- **ESLint**: Code quality with Next.js and TypeScript rules
- **PostCSS**: CSS processing pipeline
- **shadcn/cli**: Component scaffolding and management

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata, fonts, CSS variables
│   ├── page.tsx            # Homepage orchestrating all sections
│   └── globals.css         # Design system, animations, theme variables
├── components/
│   ├── ui/                 # shadcn/ui base components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── separator.tsx
│   ├── sections/           # Page sections (hero, about, experience, etc.)
│   │   ├── hero.tsx        # Cursor-tracking 3D hero with parallax
│   │   ├── about.tsx       # Bio + experience timeline
│   │   ├── experience.tsx  # Work history with bento cards
│   │   ├── skills.tsx      # Categorized tech stack
│   │   ├── projects.tsx    # Portfolio projects grid
│   │   └── contact.tsx     # CTA with contact buttons
│   ├── navbar.tsx          # Fixed header with scroll effects
│   ├── bento-grid.tsx      # Responsive grid layout system
│   └── motion-wrapper.tsx  # Reusable Framer Motion patterns
├── lib/
│   └── utils.ts            # Utility functions (cn for class composition)
└── config/
    └── components.json     # shadcn/ui configuration
```

---

## Key Conventions & Patterns

### Component Architecture
- **Section Components**: Each major section (hero, about, projects) is a self-contained component exported from `src/components/sections/`
- **Motion Wrapping**: Use `MotionCard`, `StaggerContainer`, `SlideIn`, `ScaleIn` from `motion-wrapper.tsx` for consistent animations
- **Compound Components**: Card system uses subcomponents (CardHeader, CardTitle, CardContent) for flexible composition
- **CVA Variants**: Button, badge, and custom components use CVA for type-safe variant management

### Styling Approach
- **Tailwind-first**: All styling via Tailwind utilities; custom CSS only in `globals.css` for design system
- **CSS Variables**: Theme colors defined as `--primary`, `--secondary`, etc. in `:root` for dark mode support
- **Glass-morphism**: Use `backdrop-blur-md bg-white/10` pattern for frosted glass effects
- **Responsive Design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints (1 col → 3 cols → 4 cols in bento grids)

### Animation Patterns
- **Entrance Animations**: Wrap sections with `StaggerContainer` + child `SlideIn`/`ScaleIn` for cascading reveals
- **Cursor Tracking**: Hero section uses `useMotionValue` + `useSpring` for 3D tilt effects
- **Scroll Triggers**: Use Framer Motion's `whileInView` for viewport-triggered animations
- **Stagger Variants**: Use `custom` prop with `transition.delayChildren` for sequential element reveals

### TypeScript & Imports
- **Path Aliases**: Always use `@/components`, `@/lib`, `@/ui` instead of relative paths
- **Strict Mode**: All components fully typed; avoid `any` type
- **Props Interfaces**: Define component props as `interface ComponentProps extends HTMLAttributes<HTMLElement>`

### Accessibility
- **Semantic HTML**: Use `<section>`, `<nav>`, `<article>` for meaningful structure
- **ARIA Attributes**: Add `aria-label`, `aria-describedby` for interactive elements
- **Focus Management**: Buttons include focus rings via Tailwind's `focus-visible:ring`
- **Color Contrast**: Ensure text meets WCAG AA standards (gold on dark background verified)

---

## Essential Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build           # Production build
npm start               # Run production build

# Code Quality
npm run lint            # Run ESLint
npm run lint -- --fix   # Auto-fix linting issues

# Component Management
npx shadcn-ui@latest add [component]  # Add new shadcn component
npx shadcn-ui@latest init             # Initialize shadcn setup
```

---

## Design System

### Color Palette
- **Primary**: `#c9a96e` (gold) — used for accents, highlights, badges
- **Background**: `#0a0a0a` (near-black) — main dark background
- **Foreground**: `#fafafa` (off-white) — text color
- **Muted**: `#737373` (gray) — secondary text, borders
- **Accent**: Emerald green for status indicators (e.g., "Available" badge)

### Typography
- **Serif**: Instrument Serif (headings, titles)
- **Sans**: DM Sans (body text, UI elements)
- **Sizes**: Tailwind scale (sm, base, lg, xl, 2xl, 3xl, 4xl)

### Effects
- **Film Grain**: Fixed overlay with `mix-blend-mode: overlay` for texture
- **Ambient Glow**: Radial gradient background for depth
- **Smooth Scrollbar**: Custom webkit scrollbar styling
- **Marquee Animation**: Keyframe animation for scrolling text

---

## Common Development Tasks

### Adding a New Section
1. Create `src/components/sections/[section-name].tsx`
2. Wrap content with `StaggerContainer` for animations
3. Use `SectionLabel` helper for numbered headers
4. Import and add to `src/app/page.tsx`
5. Apply motion variants (SlideIn, ScaleIn) to child elements

### Creating a New Component
1. Define TypeScript interface for props
2. Use CVA for variant management if applicable
3. Apply Tailwind classes with responsive prefixes
4. Export from appropriate directory (`@/components/ui` or `@/components`)
5. Add to `components.json` if using shadcn/cli

### Styling Responsive Layouts
- Mobile: `grid-cols-1` (default)
- Tablet: `md:grid-cols-2` or `md:grid-cols-3`
- Desktop: `lg:grid-cols-4`
- Use `gap-4` or `gap-6` for consistent spacing

### Debugging Animations
- Check Framer Motion `initial`, `animate`, `exit` props
- Verify `transition` timing (duration, delay, easing)
- Use browser DevTools to inspect computed styles
- Test with `whileHover` and `whileTap` for interactive feedback

---

## Performance & Best Practices

- **Image Optimization**: Use Next.js `<Image>` component with `priority` for above-fold content
- **Code Splitting**: Sections are lazy-loaded via Next.js automatic code splitting
- **Motion Performance**: Use `transform` and `opacity` for GPU-accelerated animations (avoid `left`, `top`)
- **Bundle Size**: Keep Framer Motion usage to entrance/hover effects; avoid heavy 3D transforms
- **SEO**: Metadata defined in `layout.tsx`; semantic HTML ensures crawlability

---

## Quick Reference

| Task | File | Pattern |
|------|------|---------|
| Add animation | `motion-wrapper.tsx` | Export new motion component |
| Update theme | `globals.css` | Modify CSS custom properties |
| New UI component | `components/ui/` | Use CVA + Radix UI |
| New section | `components/sections/` | Wrap with StaggerContainer |
| Fix styling | `tailwind.config.ts` or `globals.css` | Extend Tailwind or add custom CSS |
| Type definitions | `tsconfig.json` | Path aliases already configured |

---

## Notes for AI Assistance

- **Strict TypeScript**: Always provide full type annotations; avoid implicit `any`
- **Tailwind-first**: Prefer Tailwind utilities over custom CSS; only add custom CSS for design system effects
- **Motion-first UX**: Enhance interactions with Framer Motion; prioritize smooth entrance animations for sections
- **Accessibility**: Include ARIA attributes and semantic HTML in all new components
- **Component reuse**: Leverage existing motion-wrapper patterns and shadcn/ui components before creating new ones
- **Path aliases**: Always use `@/` imports for cleaner, maintainable code