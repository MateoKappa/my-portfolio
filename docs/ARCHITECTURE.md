# Architecture Documentation

## System Overview

This portfolio website is a **modern, component-driven Next.js 16 application** that showcases a professional profile through animated, responsive sections. The architecture prioritizes **developer experience, performance, and accessibility** by leveraging React 19's latest features, TypeScript strict mode, and a carefully curated set of UI libraries.

### Core Technology Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: React 19 with Server Components (RSC)
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion for declarative motion
- **UI Primitives**: Radix UI (via shadcn/ui) for accessible components
- **Type Safety**: TypeScript 5 with strict mode enabled
- **Icons**: Lucide React for consistent iconography
- **Utilities**: clsx + tailwind-merge for safe class composition

---

## Architectural Layers

### 1. **Presentation Layer** (`src/components/`)

This layer contains all user-facing UI components organized into three subcategories:

#### **UI Primitives** (`src/components/ui/`)
Reusable, unstyled-by-default components built on Radix UI foundations:
- **Badge**: Multi-variant status/tag component with CVA support (6 variants: default, secondary, destructive, outline, ghost, link)
- **Button**: Polymorphic button with 8 size options and full accessibility features
- **Card**: Compound component system (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) supporting flexible layouts
- **Separator**: Horizontal/vertical divider with decorative mode

These components use the **Slot pattern** from Radix UI to support polymorphic rendering (`asChild` prop), enabling flexible composition without prop drilling.

#### **Motion Components** (`src/components/motion-wrapper.tsx`)
Reusable Framer Motion patterns encapsulated as React components:
- **StaggerContainer**: Parent wrapper that orchestrates sequential animations for children
- **MotionCard**: Card with entrance scale animation and hover effects
- **MotionText**: Text elements with fade-in animations
- **SlideIn/ScaleIn**: Directional entrance animations
- **FloatingOrb**: Ambient particle effect with perpetual floating motion
- **MagneticWrapper**: Mouse-tracking wrapper for interactive magnetic effects
- **AnimatedText**: Character-by-character reveal animation

These components abstract Framer Motion's `variants`, `initial`, `animate`, and `whileHover` patterns, reducing boilerplate across sections.

#### **Layout Components** (`src/components/bento-grid.tsx`)
Responsive grid system with glass-morphism styling:
- **BentoGrid**: Responsive container (1 col mobile → 3 cols tablet → 4 cols desktop)
- **BentoCard**: Individual grid item with backdrop blur, border, and smooth transitions

### 2. **Section Layer** (`src/components/sections/`)

Full-page sections that compose UI primitives and motion components into cohesive content areas:

- **Hero**: Cursor-tracking 3D transforms using `useMotionValue` and `useSpring` hooks; parallax text effects; profile image with tilt and reflection
- **About**: Two-column layout with bio and interactive experience timeline; staggered entrance animations
- **Experience**: Seven work positions in bento cards with role, company, period, highlights, and tech stack badges; cascading reveal animations
- **Skills**: Categorized tech stack (Frontend, Backend, Database, AI/ML, Mobile, Infrastructure) in responsive grid with hover effects
- **Projects**: Seven completed projects in 2-column grid with metadata, descriptions, highlights, and tech stacks; viewport-triggered reveals
- **Contact**: CTA section with email/LinkedIn/GitHub buttons, availability indicator with pulsing animation

Each section follows a consistent pattern:
1. **SectionLabel** helper for numbered headers
2. **Framer Motion wrapper** for entrance animations
3. **Semantic HTML** for accessibility
4. **Responsive design** via Tailwind breakpoints

### 3. **Layout Layer** (`src/app/`)

- **Root Layout** (`layout.tsx`): Metadata setup (SEO, OpenGraph), Google Fonts injection, CSS variable initialization
- **Home Page** (`page.tsx`): Orchestrates all sections in semantic order with navbar and footer

---

## Request Lifecycle

### 1. **Initial Page Load**

```
Browser Request
    ↓
Next.js Server (App Router)
    ↓
Root Layout (layout.tsx)
    ├─ Metadata generation
    ├─ Font loading (Instrument Serif, DM Sans)
    └─ CSS variable injection
    ↓
Home Page (page.tsx)
    ├─ Navbar (fixed, scroll-aware)
    ├─ Hero (client-side motion)
    ├─ About (staggered animations)
    ├─ Experience (bento cards)
    ├─ Skills (grid layout)
    ├─ Projects (viewport triggers)
    ├─ Contact (CTA section)
    └─ Footer (social links)
    ↓
Browser Renders HTML + Hydrates React
    ↓
Framer Motion Initializes (motion listeners)
    ↓
Client-Side Interactivity Active
```

### 2. **Client-Side Interactions**

**Scroll Events**:
- Navbar backdrop blur effect triggered by scroll position
- Viewport-triggered animations for projects section (Framer Motion's `whileInView`)
- Parallax text effects in hero section

**Mouse Events**:
- Hero section cursor tracking (3D tilt effect)
- Magnetic wrapper effects on buttons
- Hover state transitions on cards and buttons

**Animation Lifecycle**:
- Initial animations fire on mount (`initial` → `animate`)
- Hover animations trigger on pointer enter (`whileHover`)
- Viewport animations trigger when element enters viewport (`whileInView`)

---

## Design Patterns

### 1. **Component Composition**

**Compound Components** (Card system):
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```
Provides semantic structure without prop explosion.

**Polymorphic Components** (Button, Badge):
```typescript
<Button asChild>
  <a href="/contact">Contact</a>
</Button>
```
Uses Radix UI's Slot pattern to render as any element while preserving styles and accessibility.

### 2. **Motion Patterns**

**Stagger Animation** (Experience section):
```typescript
<StaggerContainer>
  {experiences.map((exp, i) => (
    <BentoCard key={i} custom={i}>
      {/* Cascading reveal based on index */}
    </BentoCard>
  ))}
</StaggerContainer>
```
Parent container controls timing; children animate with delay based on `custom` prop.

**Viewport-Triggered Animation** (Projects section):
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Animates when 30% visible */}
</motion.div>
```

**Cursor-Tracking 3D Transform** (Hero section):
```typescript
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]));

<motion.div
  style={{ rotateX }}
  onMouseMove={(e) => {
    x.set(e.clientX - rect.left - rect.width / 2);
  }}
>
```
Converts mouse position to 3D rotation via motion values and springs.

### 3. **Styling Patterns**

**CSS Custom Properties** (globals.css):
```css
:root {
  --primary: #c9a96e; /* Gold */
  --background: #0a0a0a; /* Near-black */
  --foreground: #fafafa; /* Off-white */
  --font-serif: 'Instrument Serif';
  --font-sans: 'DM Sans';
}
```
Enables theme consistency and dark mode support without runtime overhead.

**Tailwind CVA Integration** (Badge, Button):
```typescript
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
  }
);
```
Type-safe variant management with compile-time checking.

**Glass-Morphism** (Navbar, Bento Cards):
```css
backdrop-blur-md bg-white/10 border border-white/20
```
Creates frosted glass effect with transparency and blur.

### 4. **Accessibility Patterns**

- **Semantic HTML**: `<nav>`, `<section>`, `<article>`, `<footer>` for screen readers
- **ARIA Attributes**: `aria-label`, `aria-invalid`, `aria-disabled` on interactive elements
- **Focus Management**: Visible focus rings on buttons via Tailwind's `focus-visible`
- **Color Contrast**: Gold (#c9a96e) on dark background meets WCAG AA standards
- **Icon Accessibility**: Lucide React icons paired with text labels or `aria-label`

---

## Integration Points

### 1. **External Services**

- **Google Fonts**: Instrument Serif (headings) and DM Sans (body) loaded via `next/font/google`
- **Social Links**: Hardcoded in contact section (email, LinkedIn, GitHub)

### 2. **Build-Time Optimizations**

- **Font Subsetting**: Google Fonts automatically subsets to used characters
- **CSS Purging**: Tailwind v4 removes unused styles at build time
- **Tree Shaking**: Unused motion components excluded from bundle
- **Image Optimization**: Next.js `<Image>` component (if used) provides automatic optimization

### 3. **Development Tools**

- **ESLint**: Enforces code quality with Next.js core web vitals rules
- **TypeScript**: Strict mode catches type errors at compile time
- **shadcn/ui CLI**: Manages component scaffolding and updates

---

## Performance Considerations

### 1. **Code Splitting**

- Sections lazy-loaded via dynamic imports (potential future optimization)
- Motion components tree-shaken if unused

### 2. **Rendering Strategy**

- **Server Components**: Layout and static sections render on server
- **Client Components**: Motion-heavy sections (Hero, Experience) marked with `'use client'`
- **Hydration**: React 19 partial hydration reduces JS payload

### 3. **Animation Performance**

- Framer Motion uses `transform` and `opacity` (GPU-accelerated)
- Avoids expensive properties like `width`, `height`, `left`, `top`
- `will-change` hints applied to frequently-animated elements

---

## Type Safety

### Path Aliases

```json
{
  "@/*": "./src/*",
  "@/components": "./src/components",
  "@/ui": "./src/components/ui",
  "@/lib": "./src/lib"
}
```
Enables clean imports: `import { Button } from '@/ui/button'`

### Strict TypeScript Config

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true
}
```
Catches potential runtime errors at compile time.

---

## Future Extensibility

The architecture supports easy additions:
- **New Sections**: Create file in `src/components/sections/`, follow motion pattern
- **New UI Components**: Use shadcn/ui CLI or create in `src/components/ui/`
- **Theme Variants**: Extend CSS custom properties in `globals.css`
- **CMS Integration**: Replace hardcoded content with API calls (Contentful, Sanity, etc.)
- **Analytics**: Inject tracking via Framer Motion's `onAnimationComplete` callbacks