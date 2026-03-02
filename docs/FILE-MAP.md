# FILE-MAP.md

## Portfolio Website - Directory & File Reference

This document provides a comprehensive map of the portfolio website project structure, organized by directory with detailed descriptions of each file's purpose, responsibilities, and integration points within the architecture.

---

## Project Root Configuration Files

### `package.json`
**Purpose:** Project metadata and dependency management  
**Key Responsibilities:**
- Defines npm scripts for development (`next dev`), production build (`next build`), and linting
- Specifies exact versions of core dependencies: Next.js 16, React 19, Framer Motion, Tailwind CSS v4, TypeScript 5
- Includes development tools: ESLint, shadcn CLI, PostCSS
- Exports project metadata (name, version, author, license)

**Integration Points:** Referenced by npm/yarn for all package installation and script execution

---

### `tsconfig.json`
**Purpose:** TypeScript compiler configuration  
**Key Responsibilities:**
- Enables strict mode for type safety across the entire codebase
- Configures ES2017 as compilation target for modern JavaScript support
- Establishes path aliases (`@/*` → `./src/*`) for clean, absolute imports throughout the project
- Integrates Next.js plugin for enhanced type support and automatic type generation
- Sets module resolution to `bundler` for optimal Next.js compatibility

**Integration Points:** Used by TypeScript compiler, IDEs, and build tools; enables type checking in all `.ts` and `.tsx` files

---

### `next.config.ts`
**Purpose:** Next.js framework configuration  
**Key Responsibilities:**
- Serves as the primary configuration entry point for Next.js 16 build and runtime settings
- Currently minimal (placeholder state), ready for future optimizations such as image optimization, API routes, or middleware configuration
- Maintains TypeScript configuration for type-safe Next.js settings

**Integration Points:** Loaded by Next.js during build and development server startup

---

### `postcss.config.mjs`
**Purpose:** PostCSS processing pipeline configuration  
**Key Responsibilities:**
- Integrates Tailwind CSS v4 as the primary PostCSS plugin
- Enables processing of Tailwind directives (`@tailwind`, `@apply`, `@layer`) in CSS files
- Supports custom CSS features and vendor prefixing

**Integration Points:** Processes all CSS imports and `<style>` blocks during build; works in conjunction with Tailwind configuration

---

### `eslint.config.mjs`
**Purpose:** Code quality and linting standards  
**Key Responsibilities:**
- Enforces Next.js core web vitals best practices
- Enables TypeScript-aware linting for type safety
- Overrides default ignores to exclude Next.js build artifacts (`.next/`, `out/`) and generated types
- Maintains strict code quality standards across the project

**Integration Points:** Runs on pre-commit hooks and CI/CD pipelines; integrated with development environment

---

### `components.json`
**Purpose:** shadcn/ui configuration and component scaffolding  
**Key Responsibilities:**
- Specifies New York style for shadcn/ui component templates
- Enables React Server Component (RSC) and TypeScript support for generated components
- Configures Tailwind CSS with CSS variables for theming
- Establishes path aliases for UI components (`@/components`, `@/ui`, `@/lib`, `@/hooks`)
- Specifies Lucide React as the icon library for all UI components

**Integration Points:** Used by shadcn CLI for component generation; influences all imported UI components

---

### `.gitignore`
**Purpose:** Version control exclusion rules  
**Key Responsibilities:**
- Excludes Node.js dependencies (`node_modules/`)
- Ignores Next.js build artifacts (`.next/`, `/out/`, `/build/`)
- Prevents environment files from being committed (`.env.local`, `.env*.local`)
- Excludes IDE metadata (`.vscode/`, `.idea/`, `*.swp`)
- Preserves Yarn configuration patches for reproducible builds

**Integration Points:** Enforced by Git during all commit operations

---

### `package-lock.json`
**Purpose:** Dependency lock file for reproducible builds  
**Key Responsibilities:**
- Pins exact versions of all npm packages and transitive dependencies
- Documents complete dependency tree with resolved versions
- Ensures identical installations across development, CI/CD, and production environments
- Includes integrity hashes for security verification

**Integration Points:** Automatically used by npm during `npm install`; critical for team collaboration and deployment consistency

---

## Source Directory (`src/`)

### `src/app/`
**Purpose:** Next.js App Router configuration and root layout  

#### `layout.tsx`
**Purpose:** Root layout wrapper for the entire application  
**Key Responsibilities:**
- Defines global metadata (title, description, OpenGraph tags for social sharing)
- Imports Google Fonts (Instrument Serif for headings, DM Sans for body text)
- Wraps application with proper HTML structure and semantic markup
- Injects CSS custom properties for typography variables
- Sets up viewport and charset meta tags for SEO and rendering

**Integration Points:** Wraps all pages and components; metadata cascades to child routes

#### `page.tsx`
**Purpose:** Homepage entry point  
**Key Responsibilities:**
- Orchestrates the main portfolio layout by composing all major sections
- Imports and renders: Navbar, Hero, About, Skills, Experience, Projects, Contact sections
- Maintains semantic HTML structure with proper heading hierarchy
- Includes footer with social media links and copyright information
- Serves as the primary user entry point

**Integration Points:** Rendered at `/` route; imports all major section components

#### `globals.css`
**Purpose:** Global design system and visual effects  
**Key Responsibilities:**
- Establishes Tailwind CSS v4 directives and custom layer definitions
- Defines CSS custom properties for dark theme (primary gold: `#c9a96e`, secondary: `#6b7280`)
- Configures typography with font-family variables for Instrument Serif and DM Sans
- Implements visual effects:
  - Film grain overlay (fixed pseudo-element with noise pattern)
  - Ambient glow gradient (radial gradient background animation)
  - Smooth scrollbar styling with custom thumb and track colors
- Defines keyframe animations (marquee for scrolling text effects)
- Sets base styles for HTML elements (dark background, light text)

**Integration Points:** Imported in root layout; affects all components globally

---

## Components Directory (`src/components/`)

### `navbar.tsx`
**Purpose:** Fixed navigation header with scroll-aware styling  
**Key Responsibilities:**
- Renders fixed header with logo and navigation links
- Implements scroll detection to apply glass-morphism backdrop blur effect
- Displays responsive link menu (hidden on mobile, visible on desktop)
- Includes "Hire me" CTA button with hover effects
- Animates logo on mount with Framer Motion
- Maintains navigation state and active link highlighting

**Integration Points:** Imported in root page; visible on all pages; communicates scroll position via window listeners

---

### `bento-grid.tsx`
**Purpose:** Reusable grid layout system  
**Key Responsibilities:**
- Exports `BentoGrid` wrapper component with responsive column configuration:
  - 1 column on mobile (sm)
  - 3 columns on tablet (md)
  - 4 columns on desktop (lg)
- Exports `BentoCard` component with:
  - Glass-morphism styling (backdrop blur, semi-transparent background)
  - Smooth hover transitions and scale effects
  - Support for custom icons and background colors
  - Flexible content composition via children
- Provides foundation for organizing content in modern grid layouts

**Integration Points:** Used in Experience, Projects, and Skills sections; supports flexible card-based layouts

---

### `motion-wrapper.tsx`
**Purpose:** Centralized animation utility library  
**Key Responsibilities:**
- Exports 8 reusable motion components:
  - `MotionCard`: Card with entrance animation and hover effects
  - `MotionText`: Text with staggered character animations
  - `FloatingOrb`: Animated floating element with parallax
  - `StaggerContainer`: Parent wrapper for sequential child animations
  - `SlideIn`: Directional slide entrance animations
  - `ScaleIn`: Scale-based entrance animations
  - `AnimatedText`: Character-level animation effects
  - `MagneticWrapper`: Mouse-tracking magnetic effect
- Implements Framer Motion patterns for consistent animation behavior
- Provides 3D perspective transforms and interactive mouse-tracking
- Supports viewport-triggered animations for performance optimization

**Integration Points:** Imported across all section components; enables consistent motion design language

---

### `src/components/sections/`
**Purpose:** Major portfolio sections with semantic content organization  

#### `hero.tsx`
**Purpose:** Eye-catching hero section with interactive effects  
**Key Responsibilities:**
- Implements cursor-tracking 3D transforms using `useMotionValue` and `useSpring`
- Renders profile image card with:
  - Dynamic tilt effect based on mouse position
  - Light reflection animation
  - Parallax depth effect
- Displays status badge ("Available for work") with animated indicator
- Includes contact links (Email, LinkedIn, GitHub) with hover effects
- Features scroll indicator animation at bottom
- Ambient particle animation background
- Uses serif typography for impactful headline

**Integration Points:** First section on homepage; sets visual tone; uses motion-wrapper components

#### `about.tsx`
**Purpose:** Personal introduction and experience timeline  
**Key Responsibilities:**
- Renders two-column layout:
  - Left: Bio text with education details and personal background
  - Right: Interactive experience timeline with hover states
- Exports `SectionLabel` helper for numbered section headers
- Implements staggered entrance animations via Framer Motion
- Maintains consistent typography hierarchy with serif headings
- Provides context for user background and qualifications

**Integration Points:** Second section on homepage; uses motion-wrapper for animations

#### `experience.tsx`
**Purpose:** Detailed work history and professional achievements  
**Key Responsibilities:**
- Displays 7 work positions in responsive bento card grid
- Each card includes:
  - Job title and company name
  - Employment period (start/end dates)
  - Key highlights/responsibilities
  - Tech stack badges with color coding
  - Custom company icons
- Implements cascading motion animations using `custom` variant pattern
- Uses `StaggerContainer` for sequential reveal effects
- Color-codes backgrounds by company/role for visual distinction
- Responsive grid layout (1 column mobile, 2+ columns desktop)

**Integration Points:** Third section on homepage; uses bento-grid and motion-wrapper

#### `skills.tsx`
**Purpose:** Categorized technology stack showcase  
**Key Responsibilities:**
- Organizes skills into 6 categories:
  - Frontend (React, Next.js, TypeScript, Tailwind CSS)
  - Backend (Node.js, Python, PostgreSQL)
  - Database (MongoDB, Firebase, Redis)
  - AI/ML (TensorFlow, PyTorch, LangChain)
  - Mobile (React Native, Flutter)
  - Infrastructure (Docker, AWS, Kubernetes)
- Renders skills as animated badge components
- Implements staggered entrance animations with hover effects
- Uses responsive grid layout with consistent spacing
- Maintains visual hierarchy with serif section headers

**Integration Points:** Fourth section on homepage; uses badge components and motion-wrapper

#### `projects.tsx`
**Purpose:** Portfolio of completed projects with detailed metadata  
**Key Responsibilities:**
- Showcases 7 projects in responsive 2-column grid
- Each project card displays:
  - Project title and subtitle
  - Completion year
  - Detailed description
  - Key highlights/features
  - Technology stack with badges
  - Links to live demo and source code
- Implements viewport-triggered reveal animations
- Hover state transitions with scale and shadow effects
- Maintains visual consistency with serif typography
- Responsive layout (1 column mobile, 2 columns desktop)

**Integration Points:** Fifth section on homepage; uses card components and motion-wrapper

#### `contact.tsx`
**Purpose:** Call-to-action and contact information  
**Key Responsibilities:**
- Renders contact section with:
  - Prominent CTA heading ("Let's work together")
  - Email contact button with arrow icon
  - LinkedIn profile link
  - GitHub profile link
  - Availability indicator with pulsing green dot
- Implements staggered entrance animations via Framer Motion
- Uses arrow icons for visual emphasis on clickable elements
- Maintains consistent button styling with hover effects
- Provides multiple contact pathways for user engagement

**Integration Points:** Final section on homepage; uses motion-wrapper and button components

---

### `src/components/ui/`
**Purpose:** Reusable shadcn/ui component primitives  

#### `badge.tsx`
**Purpose:** Flexible badge/tag component for labels and metadata  
**Key Responsibilities:**
- Exports `Badge` component with CVA-based variants:
  - `default`: Primary gold background
  - `secondary`: Muted gray background
  - `destructive`: Red background for alerts
  - `outline`: Bordered style without fill
  - `ghost`: Minimal style with text only
  - `link`: Interactive link-style badge
- Supports flexible composition via Radix UI's Slot pattern
- Includes accessibility features (focus rings, aria-invalid states)
- Responsive icon sizing for badge content
- Used throughout portfolio for tech stack, highlights, and metadata

**Integration Points:** Imported in Experience, Skills, Projects sections; used for tag display

#### `button.tsx`
**Purpose:** Flexible button component with multiple variants  
**Key Responsibilities:**
- Exports `Button` component with CVA-based variants:
  - `default`: Primary action button
  - `destructive`: Danger action button
  - `outline`: Secondary bordered button
  - `secondary`: Muted secondary button
  - `ghost`: Minimal button without background
  - `link`: Text-only link button
- Supports 8 size options:
  - `sm`, `default`, `lg` for standard buttons
  - `icon-sm`, `icon`, `icon-lg` for icon-only buttons
- Polymorphic rendering via Radix Slot for flexible HTML elements
- Comprehensive accessibility features:
  - Focus rings for keyboard navigation
  - Disabled state styling and behavior
  - Proper ARIA attributes
- Used in Navbar, Contact, and throughout portfolio for CTAs

**Integration Points:** Imported across all sections; primary interactive element

#### `card.tsx`
**Purpose:** Compound card component system for content organization  
**Key Responsibilities:**
- Exports 7 subcomponents:
  - `Card`: Root container with border and rounded corners
  - `CardHeader`: Top section for titles and metadata
  - `CardTitle`: Semantic heading element
  - `CardDescription`: Secondary text content
  - `CardAction`: Action slot for buttons/icons
  - `CardContent`: Main content area with padding
  - `CardFooter`: Bottom section for actions or metadata
- Implements container queries for responsive internal layouts
- Uses semantic HTML structure for accessibility
- Supports flexible grid layouts and action slots
- Consistent padding and spacing conventions
- Used in Experience, Projects, and custom card implementations

**Integration Points:** Imported in sections requiring card-based layouts; foundation for BentoCard

#### `separator.tsx`
**Purpose:** Lightweight divider component  
**Key Responsibilities:**
- Wraps Radix UI's Separator primitive with Tailwind styling
- Supports horizontal and vertical orientation
- Includes decorative option for non-semantic dividers
- Consistent border color theming with CSS variables
- Used for visual separation between sections and content blocks
- Maintains accessibility with proper ARIA attributes

**Integration Points:** Imported in sections and cards requiring visual separation

---

### `src/lib/`
**Purpose:** Utility functions and helpers  

#### `utils.ts`
**Purpose:** Class composition utility  
**Key Responsibilities:**
- Exports `cn()` function that combines:
  - `clsx`: Conditional class name composition
  - `tailwind-merge`: Intelligent Tailwind CSS class merging
- Prevents style conflicts when dynamically composing Tailwind classes
- Used throughout components for conditional styling and prop-based class application
- Enables safe override of base component styles via className props

**Integration Points:** Imported in UI components and sections for dynamic class composition

---

## Architecture Patterns & Integration

### Component Hierarchy
```
layout.tsx (Root)
├── page.tsx (Homepage)
│   ├── Navbar
│   ├── Hero
│   ├── About
│   ├── Experience
│   ├── Skills
│   ├── Projects
│   ├── Contact
│   └── Footer
```

### Animation System
- **Motion Wrapper**: Centralized animation utilities (`motion-wrapper.tsx`)
- **Framer Motion**: Core animation library for entrance effects, hover states, and interactive transforms
- **Viewport Triggers**: