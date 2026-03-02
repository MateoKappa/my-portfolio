# Contributing Conventions

This document outlines the coding patterns, naming conventions, and best practices for contributing to the Portfolio Website. Follow these guidelines to maintain consistency, readability, and quality across the codebase.

---

## Table of Contents

1. [Import Ordering](#import-ordering)
2. [Naming Conventions](#naming-conventions)
3. [Component Structure](#component-structure)
4. [TypeScript & Type Safety](#typescript--type-safety)
5. [Error Handling](#error-handling)
6. [Animation & Motion Patterns](#animation--motion-patterns)
7. [Styling Conventions](#styling-conventions)
8. [File Organization](#file-organization)

---

## Import Ordering

Maintain a consistent import order to improve readability and reduce merge conflicts. Follow this hierarchy:

### Standard Order

```typescript
// 1. React & Next.js core
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries (alphabetical)
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

// 3. Internal components (relative paths, alphabetical)
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 4. Internal utilities & hooks
import { cn } from '@/lib/utils';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

// 5. Types & constants
import type { Project } from '@/types/project';
import { ANIMATION_DURATION } from '@/constants/animations';

// 6. Styles (if using CSS modules)
import styles from './component.module.css';
```

### Path Alias Usage

Always use path aliases (`@/*`) for imports instead of relative paths:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ❌ Avoid
import { Button } from '../../../components/ui/button';
import { cn } from '../../lib/utils';
```

---

## Naming Conventions

### Components

- **PascalCase** for all component names (React convention)
- **Descriptive names** that clearly indicate purpose
- **Avoid generic names** like `Container`, `Wrapper`, `Section` unless they're truly generic utilities

```typescript
// ✅ Good
export function ProjectCard({ project }: ProjectCardProps) {}
export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {}
export function MotionWrapper({ children }: MotionWrapperProps) {}

// ❌ Avoid
export function Card({ data }: any) {}
export function Section() {}
export function Wrapper({ children }: any) {}
```

### Functions & Utilities

- **camelCase** for all function names
- **Verb-first naming** for action functions (`getProjects`, `calculateDuration`, `formatDate`)
- **Predicate functions** start with `is` or `has` (`isVisible`, `hasError`)

```typescript
// ✅ Good
export function cn(...classes: (string | undefined)[]) {}
export function formatDate(date: Date): string {}
export function isScrolled(): boolean {}

// ❌ Avoid
export function ClassNames(...classes) {}
export function date_format(date) {}
export function checkScroll() {}
```

### Variables & Constants

- **camelCase** for variables
- **UPPER_SNAKE_CASE** for constants and environment variables
- **Descriptive names** that indicate type or purpose

```typescript
// ✅ Good
const ANIMATION_DURATION = 0.3;
const MAX_PROJECTS = 7;
let isNavbarVisible = false;
const userEmail = 'contact@example.com';

// ❌ Avoid
const animDur = 0.3;
const max = 7;
let visible = false;
const email = 'contact@example.com'; // ambiguous context
```

### CSS Classes & Tailwind

- Use **kebab-case** for custom CSS class names
- Leverage **Tailwind utility classes** for styling (no custom classes unless necessary)
- Group related utilities logically

```typescript
// ✅ Good
<div className="flex items-center justify-between gap-4 rounded-lg bg-slate-900 p-4">

// ❌ Avoid
<div className="flex-between gap-4 rounded bg-dark p-4">
```

### Type & Interface Names

- **PascalCase** for all types and interfaces
- **Props suffix** for component prop types
- **Descriptive names** indicating the data structure

```typescript
// ✅ Good
interface ProjectCardProps {
  project: Project;
  onSelect?: (id: string) => void;
}

type ExperienceLevel = 'junior' | 'mid' | 'senior';

// ❌ Avoid
interface Props {}
type T = 'junior' | 'mid' | 'senior';
```

---

## Component Structure

### Functional Component Template

Follow this structure for all React components:

```typescript
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 1. Type definitions
interface ComponentNameProps {
  children?: ReactNode;
  className?: string;
  isActive?: boolean;
  onAction?: () => void;
}

// 2. Constants (if component-specific)
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 3. Component definition
export function ComponentName({
  children,
  className,
  isActive = false,
  onAction,
}: ComponentNameProps) {
  // 4. Hooks (useState, useEffect, custom hooks)
  // 5. Derived state & computations
  // 6. Event handlers
  // 7. Render

  return (
    <motion.div
      variants={ANIMATION_VARIANTS}
      initial="hidden"
      animate="visible"
      className={cn('base-styles', isActive && 'active-styles', className)}
      onClick={onAction}
    >
      {children}
    </motion.div>
  );
}

// 8. Export type for external use
export type { ComponentNameProps };
```

### Section Components Pattern

All portfolio sections follow this consistent pattern:

```typescript
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/section-label';
import { StaggerContainer } from '@/components/motion-wrapper';

interface SectionProps {
  className?: string;
}

export function SectionName({ className }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <SectionLabel number={1} title="Section Title" />
      <StaggerContainer>
        {/* Content with staggered animations */}
      </StaggerContainer>
    </section>
  );
}
```

---

## TypeScript & Type Safety

### Strict Mode Requirements

All files must comply with `strict: true` in `tsconfig.json`:

```typescript
// ✅ Good - explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User | null {
  // implementation
}

// ❌ Avoid - implicit any
function getUser(id) {
  // implementation
}

const data: any = fetchData(); // Never use 'any'
```

### Type Definitions

- Define types in the same file if used only locally
- Export types from `@/types/*` for shared types
- Use `type` for type aliases, `interface` for object shapes

```typescript
// ✅ Good
type ProjectStatus = 'active' | 'completed' | 'archived';

interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
}

// ❌ Avoid
type Project = {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'archived';
};
```

### Optional & Nullable Types

- Use `?` for optional properties
- Use `| null` for explicitly nullable values
- Avoid `undefined` in object types unless necessary

```typescript
// ✅ Good
interface CardProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  error: Error | null;
}

// ❌ Avoid
interface CardProps {
  title: string;
  subtitle: string | undefined;
  onClick: (() => void) | undefined;
  error?: Error;
}
```

---

## Error Handling

### Component Error Boundaries

Wrap sections that may throw errors with error boundaries:

```typescript
// ✅ Good - graceful degradation
export function ProjectCard({ project }: ProjectCardProps) {
  if (!project?.id) {
    return <div className="text-red-500">Invalid project data</div>;
  }

  try {
    return (
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    );
  } catch (error) {
    console.error('ProjectCard render error:', error);
    return <div className="text-red-500">Failed to render project</div>;
  }
}
```

### Async Data Handling

Use proper error states for async operations:

```typescript
// ✅ Good - explicit error handling
interface DataState {
  data: Project[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function ProjectsList() {
  const [state, setState] = useState<DataState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchProjects()
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((error) => setState({ data: null, isLoading: false, error }));
  }, []);

  if (state.isLoading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage error={state.error} />;
  if (!state.data?.length) return <EmptyState />;

  return <div>{/* render projects */}</div>;
}
```

### Console Logging

Use appropriate log levels; remove debug logs before committing:

```typescript
// ✅ Good - production-safe logging
console.error('Failed to fetch projects:', error);
console.warn('Deprecated API endpoint used');

// ❌ Avoid - debug logs in production
console.log('DEBUG: user object', user);
console.log('state:', state);
```

---

## Animation & Motion Patterns

### Framer Motion Conventions

- Define animation variants as constants outside components
- Use semantic variant names (`hidden`, `visible`, `hover`)
- Leverage `StaggerContainer` for sequential animations

```typescript
// ✅ Good - reusable variants
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.3 },
  }),
  hover: { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
};

export function AnimatedCard({ index }: { index: number }) {
  return (
    <motion.div
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
    />
  );
}
```

### Motion Component Usage

Use provided motion wrappers from `@/components/motion-wrapper`:

```typescript
// ✅ Good - use provided wrappers
import { MotionCard, StaggerContainer } from '@/components/motion-wrapper';

<StaggerContainer>
  {projects.map((project, i) => (
    <MotionCard key={project.id} index={i}>
      {/* content */}
    </MotionCard>
  ))}
</StaggerContainer>

// ❌ Avoid - duplicating animation logic
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  {/* content */}
</motion.div>
```

---

## Styling Conventions

### Tailwind CSS Usage

- Use Tailwind utilities exclusively for styling
- Leverage the `cn()` utility for conditional classes
- Group responsive prefixes logically

```typescript
// ✅ Good - organized Tailwind classes
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <div className="w-full rounded-lg bg-slate-900 p-4 md:w-1/2 lg:w-1/3">
    Content
  </div>
</div>

// ✅ Good - conditional styling with cn()
<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium transition-colors',
    isActive
      ? 'bg-gold-600 text-white'
      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
  )}
>
  Click me
</button>

// ❌ Avoid - custom CSS for utility purposes
<style>{`.custom-button { padding: 8px 16px; }`}</style>
```

### CSS Variables & Theme

Use CSS custom properties from `globals.css` for theming:

```typescript
// ✅ Good - theme-aware styling
<div className="bg-background text-foreground">
  <h1 className="text-primary">Heading</h1>
</div>

// ❌ Avoid - hardcoded colors
<div className="bg-slate-900 text-white">
  <h1 className="text-yellow-500">Heading</h1>
</div>
```

---

## File Organization

### Directory Structure

```
src/
├── app/                          # Next.js app router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── sections/                # Portfolio sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   └── contact.tsx
│   ├── motion-wrapper.tsx       # Animation utilities
│   ├── navbar.tsx               # Navigation
│   └── bento-grid.tsx           # Layout primitives
├── lib/
│   └── utils.ts                 # Utility functions
├── types/                       # Shared TypeScript types
│   ├── project.ts
│   └── experience.ts
├── constants/                   # App constants
│   └── animations.ts
└── hooks/                       # Custom React hooks
    └── use-scroll-trigger.ts
```

### File Naming

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: camelCase with `.ts` extension (e.g., `project.ts`)
- **Styles**: Match component name with `.module.css` (e.g., `Hero.module.css`)

---

## Summary Checklist

Before submitting a pull request, verify:

- [ ] Imports are ordered correctly (React → third-party → internal → types)
- [ ] All components use PascalCase naming
- [ ] Functions use camelCase naming
- [ ] Constants use UPPER_SNAKE_CASE