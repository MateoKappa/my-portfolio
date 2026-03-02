# Data Model Documentation

## Overview

This portfolio website is a **frontend-focused Next.js application** with **no backend database or server-side data persistence**. The architecture is entirely **client-side rendered** with hardcoded content structured as TypeScript objects and React components. This document describes the **data structures, content models, and type definitions** that organize portfolio information throughout the application.

---

## Core Data Structures

### 1. Experience Entry Model

**Location:** `src/components/sections/experience.tsx`

```typescript
interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;           // e.g., "Jan 2023 - Present"
  highlights: string[];     // Array of achievement bullets
  techStack: string[];      // Technologies used
  icon?: React.ReactNode;   // Company/role icon
  backgroundColor?: string; // Tailwind color class for card
}
```

**Purpose:** Represents individual work positions displayed in the experience timeline section. Each entry contains role metadata, duration, key accomplishments, and associated technologies.

**Example Structure:**
- `role`: "Senior Full-Stack Engineer"
- `company`: "Tech Startup Inc"
- `period`: "Mar 2022 - Present"
- `highlights`: ["Led migration to Next.js", "Improved performance by 40%"]
- `techStack`: ["Next.js", "React", "TypeScript", "PostgreSQL"]

**Cardinality:** 1:N relationship with the portfolio (7 entries in current implementation)

---

### 2. Project Entry Model

**Location:** `src/components/sections/projects.tsx`

```typescript
interface ProjectEntry {
  id: string;
  title: string;
  subtitle: string;         // Short tagline
  year: number;             // Release/completion year
  description: string;      // Detailed project overview
  highlights: string[];     // Key features/achievements
  techStack: string[];      // Technologies used
  imageUrl?: string;        // Project thumbnail (optional)
  links?: {
    demo?: string;          // Live demo URL
    github?: string;        // GitHub repository URL
    case_study?: string;    // Detailed case study URL
  };
  featured: boolean;        // Whether to highlight in grid
}
```

**Purpose:** Represents completed projects showcased in the portfolio. Includes comprehensive metadata for display and navigation to external resources.

**Example Structure:**
- `title`: "E-Commerce Platform"
- `subtitle`: "Full-stack marketplace with real-time inventory"
- `year`: 2023
- `description`: "A scalable e-commerce solution built with Next.js..."
- `techStack`: ["Next.js", "Stripe API", "PostgreSQL", "Redis"]
- `links`: { demo: "https://...", github: "https://..." }

**Cardinality:** 1:N relationship with the portfolio (7 projects in current implementation)

---

### 3. Skill Category Model

**Location:** `src/components/sections/skills.tsx`

```typescript
interface SkillCategory {
  id: string;
  name: string;             // Category name (e.g., "Frontend")
  skills: Skill[];          // Array of individual skills
}

interface Skill {
  id: string;
  name: string;             // Skill name (e.g., "React")
  proficiency?: string;     // Optional: "Expert", "Advanced", "Intermediate"
  yearsOfExperience?: number;
  icon?: string;            // Lucide icon name
}
```

**Purpose:** Organizes technical skills into logical categories for easy scanning and filtering. Supports proficiency levels and experience duration.

**Categories (6 total):**
1. **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Vue.js
2. **Backend**: Node.js, Express, Python, Django, FastAPI
3. **Database**: PostgreSQL, MongoDB, Redis, Firebase
4. **AI/ML**: TensorFlow, PyTorch, Scikit-learn, LangChain
5. **Mobile**: React Native, Flutter, Swift
6. **Infrastructure**: Docker, Kubernetes, AWS, CI/CD

**Cardinality:** 1:N (category to skills), with 6 categories and ~40 total skills

---

### 4. Social Link Model

**Location:** `src/components/navbar.tsx`, `src/app/page.tsx`

```typescript
interface SocialLink {
  platform: string;         // "email", "linkedin", "github", "twitter"
  url: string;              // Full URL or mailto: link
  icon: React.ReactNode;    // Lucide icon component
  label: string;            // Accessible label
}
```

**Purpose:** Defines external contact and social media links displayed in navbar, hero, and contact sections.

**Implemented Links:**
- Email: `mailto:your.email@example.com`
- LinkedIn: `https://linkedin.com/in/...`
- GitHub: `https://github.com/...`
- Twitter/X: `https://twitter.com/...`

**Cardinality:** 1:N (portfolio to links), typically 3-4 links

---

### 5. Navigation Menu Model

**Location:** `src/components/navbar.tsx`

```typescript
interface NavLink {
  label: string;            // Display text
  href: string;             // Internal anchor or external URL
  target?: "_blank" | "_self";
  icon?: React.ReactNode;   // Optional icon
}
```

**Purpose:** Defines navigation structure for the fixed navbar component.

**Current Navigation:**
- Home (`#home`)
- About (`#about`)
- Experience (`#experience`)
- Projects (`#projects`)
- Skills (`#skills`)
- Contact (`#contact`)

**Cardinality:** Fixed set of 6 primary navigation items

---

### 6. Section Label Model

**Location:** `src/components/sections/*` (shared pattern)

```typescript
interface SectionLabel {
  number: string;           // e.g., "01", "02"
  title: string;            // e.g., "About Me"
  subtitle?: string;        // Optional descriptive text
}
```

**Purpose:** Consistent header pattern for all major portfolio sections with numbered identifiers.

**Sections (6 total):**
1. Hero (unnumbered)
2. About (`01`)
3. Experience (`02`)
4. Projects (`03`)
5. Skills (`04`)
6. Contact (`05`)

---

## Type System & TypeScript Definitions

### Global Type Aliases

**Location:** `tsconfig.json` (path aliases)

```typescript
// Path alias configuration
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Available Paths:**
- `@/components` → `src/components`
- `@/app` → `src/app`
- `@/lib` → `src/lib`
- `@/utils` → `src/lib/utils`

### Component Props Types

**Button Component Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
}
```

**Card Component Props:**
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
```

**Badge Component Props:**
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}
```

---

## Content Organization & Storage

### Hardcoded Content Structure

All portfolio content is **embedded directly in React components** as TypeScript constants:

**Experience Data:**
- 7 work positions stored as component state/constants
- Rendered via `.map()` in `experience.tsx`
- No external API calls or database queries

**Project Data:**
- 7 completed projects stored as component state/constants
- Displayed in responsive 2-column grid
- Includes metadata for filtering/sorting (optional enhancement)

**Skills Data:**
- 6 skill categories with ~40 total technologies
- Organized in `skills.tsx` as nested arrays
- Rendered with staggered motion animations

**About Section:**
- Bio text, education details, timeline entries
- Stored as component JSX/strings
- No dynamic data fetching

---

## Design System Data

### Color Palette

**Location:** `src/app/globals.css`

```css
:root {
  --primary: #c9a96e;       /* Gold accent */
  --primary-foreground: #1a1a1a;
  --secondary: #2d2d2d;     /* Dark gray */
  --secondary-foreground: #f5f5f5;
  --accent: #c9a96e;        /* Gold */
  --muted: #666666;
  --muted-foreground: #999999;
  --background: #0a0a0a;    /* Near black */
  --foreground: #f5f5f5;    /* Off white */
  --border: #333333;
  --input: #1a1a1a;
  --ring: #c9a96e;
}
```

**Color Usage:**
- Primary actions: Gold (#c9a96e)
- Text: Off-white (#f5f5f5) on dark backgrounds
- Borders: Dark gray (#333333)
- Interactive elements: Gold with hover transitions

### Typography System

**Location:** `src/app/layout.tsx`, `src/app/globals.css`

```typescript
// Font imports
- Instrument Serif: Headings, titles (serif)
- DM Sans: Body text, UI elements (sans-serif)
```

**Tailwind Typography Classes:**
- `text-4xl` / `text-5xl`: Section headings
- `text-xl` / `text-2xl`: Subsection titles
- `text-base`: Body text
- `text-sm` / `text-xs`: Secondary text, labels

### Animation System

**Location:** `src/components/motion-wrapper.tsx`

```typescript
interface MotionVariants {
  initial: { opacity: 0; y: 20 };
  animate: { opacity: 1; y: 0 };
  exit?: { opacity: 0; y: -20 };
  transition: { duration: 0.5; delay?: number };
}
```

**Reusable Animation Patterns:**
- `StaggerContainer`: Sequential child animations
- `SlideIn`: Entrance from left/right
- `ScaleIn`: Zoom entrance effect
- `FloatingOrb`: Continuous floating motion
- `MagneticWrapper`: Cursor-tracking interactions

---

## Relationships & Dependencies

### Component Hierarchy

```
App (page.tsx)
├── Navbar
│   └── SocialLinks
├── Hero
│   └── SocialLinks
├── About
│   └── ExperienceTimeline
├── Experience
│   └── BentoCard[]
├── Projects
│   └── BentoGrid
│       └── BentoCard[]
├── Skills
│   └── SkillCategory[]
│       └── Skill[]
├── Contact
│   └── SocialLinks
└── Footer
    └── SocialLinks
```

### Data Flow

1. **Static Content**: All portfolio data flows from hardcoded constants → React components
2. **No API Layer**: No REST/GraphQL endpoints or backend integration
3. **Client-Side Rendering**: All content rendered on the browser
4. **No Database**: No persistence layer or user data storage

---

## Future Enhancement Opportunities

### Potential Database Schema (if adding CMS)

```sql
-- Experience table
CREATE TABLE experiences (
  id UUID PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  period VARCHAR(100),
  highlights TEXT[],
  tech_stack VARCHAR(255)[],
  order_index INT,
  created_at TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  year INT,
  description TEXT,
  highlights TEXT[],
  tech_stack VARCHAR(255)[],
  image_url VARCHAR(500),
  demo_url VARCHAR(500),
  github_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  order_index INT,
  created_at TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES skill_categories(id),
  proficiency VARCHAR(50),
  years_of_experience INT,
  order_index INT
);

-- Skill categories table
CREATE TABLE skill_categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  order_index INT
);
```

---

## Summary

This portfolio website uses a **content-as-code approach** with all data embedded directly in React components. The data model is lightweight, focused on presentation, and optimized for static site generation. The TypeScript type system ensures type safety across components, while the Framer Motion animation system provides a consistent interaction model throughout the application.