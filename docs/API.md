# API Documentation

## Overview

This portfolio website is a **static Next.js application** with no backend API endpoints. The site is entirely client-side rendered with pre-built static pages and interactive components. However, this document outlines the architecture for potential API integrations and describes the data structures used throughout the application.

## Architecture

The portfolio follows a **JAMstack approach**:
- **Frontend**: Next.js 16 with React 19 (SSG/SSR)
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + custom components
- **Type Safety**: TypeScript with strict mode

**No authentication** is currently implemented, as this is a public portfolio website.

---

## Component Data Structures

### Hero Section Data

**Location**: `src/components/sections/hero.tsx`

The hero section displays personal branding with cursor-tracking 3D transforms and particle animations.

```typescript
interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  status: "Available" | "Open to opportunities";
  statusColor: "green" | "amber";
  profileImage: string;
  contactLinks: Array<{
    platform: "email" | "linkedin" | "github";
    url: string;
    icon: React.ReactNode;
  }>;
}
```

**Features**:
- Cursor-tracking 3D perspective transforms via `useMotionValue` and `useSpring`
- Parallax text effects responding to mouse movement
- Ambient particle animations
- Responsive profile image card with light reflection

---

### Experience Section Data

**Location**: `src/components/sections/experience.tsx`

Displays professional work history in an animated bento grid layout.

```typescript
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string; // e.g., "2023 - Present"
  highlights: string[];
  techStack: string[];
  icon?: React.ReactNode;
  backgroundColor?: string; // Tailwind color class
}

interface ExperienceData {
  items: ExperienceItem[];
}
```

**Example**:
```typescript
{
  id: "exp-1",
  role: "Senior Frontend Engineer",
  company: "TechCorp",
  period: "2023 - Present",
  highlights: [
    "Led migration to React 19",
    "Improved Core Web Vitals by 40%"
  ],
  techStack: ["React", "TypeScript", "Tailwind CSS"],
  backgroundColor: "bg-blue-500/10"
}
```

**Rendering**: Uses `BentoCard` components with staggered Framer Motion animations (`StaggerContainer` pattern).

---

### Projects Section Data

**Location**: `src/components/sections/projects.tsx`

Showcases completed projects with metadata and technology highlights.

```typescript
interface ProjectHighlight {
  title: string;
  description: string;
}

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  description: string;
  highlights: ProjectHighlight[];
  techStack: string[];
  links?: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  image?: string;
  featured?: boolean;
}

interface ProjectsData {
  items: ProjectItem[];
}
```

**Rendering**: 2-column responsive grid with viewport-triggered reveals and hover state transitions.

---

### Skills Section Data

**Location**: `src/components/sections/skills.tsx`

Categorized technology stack organized by domain.

```typescript
interface SkillCategory {
  name: string; // e.g., "Frontend", "Backend"
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
}
```

**Example**:
```typescript
{
  name: "Frontend",
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"]
},
{
  name: "Backend",
  skills: ["Node.js", "Express", "PostgreSQL", "GraphQL"]
}
```

**Rendering**: Responsive grid (1 column mobile, 2+ columns desktop) with staggered badge animations.

---

### Contact Section Data

**Location**: `src/components/sections/contact.tsx`

Call-to-action section with contact methods and availability status.

```typescript
interface ContactData {
  heading: string;
  subheading: string;
  availability: {
    status: "available" | "unavailable";
    message: string;
  };
  contactMethods: Array<{
    type: "email" | "linkedin" | "github";
    label: string;
    url: string;
    icon: React.ReactNode;
  }>;
}
```

**Features**:
- Pulsing green availability indicator
- Arrow-icon buttons for each contact method
- Staggered entrance animations via Framer Motion

---

## UI Component API Reference

### Button Component

**Location**: `src/components/ui/button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
}
```

**Usage**:
```tsx
<Button variant="default" size="lg">
  Hire Me
</Button>

<Button variant="ghost" size="icon">
  <GithubIcon />
</Button>
```

---

### Badge Component

**Location**: `src/components/ui/badge.tsx`

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}
```

**Usage**:
```tsx
<Badge variant="secondary">React</Badge>
<Badge variant="outline">TypeScript</Badge>
```

---

### Card Component

**Location**: `src/components/ui/card.tsx`

Compound component system with semantic subcomponents:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Subtitle or description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

---

### BentoGrid Component

**Location**: `src/components/bento-grid.tsx`

Responsive grid layout with glass-morphism styling.

```typescript
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

**Responsive Behavior**:
- Mobile: 1 column
- Tablet (md): 3 columns
- Desktop (lg): 4 columns

---

## Motion Components API

**Location**: `src/components/motion-wrapper.tsx`

### MotionCard

Animated card with entrance effect and hover states.

```typescript
<MotionCard delay={0.1}>
  {/* Content */}
</MotionCard>
```

### StaggerContainer

Wrapper for staggered child animations.

```typescript
<StaggerContainer staggerChildren={0.1}>
  {children.map((child, i) => (
    <motion.div key={i} custom={i}>
      {child}
    </motion.div>
  ))}
</StaggerContainer>
```

### FloatingOrb

Animated floating element with parallax effect.

```typescript
<FloatingOrb delay={0} />
```

### MagneticWrapper

Interactive element that follows cursor movement.

```typescript
<MagneticWrapper>
  <Button>Interactive Button</Button>
</MagneticWrapper>
```

---

## Styling System

### CSS Variables (Global Theme)

**Location**: `src/app/globals.css`

```css
:root {
  --primary: #c9a96e;        /* Gold accent */
  --primary-foreground: #1a1a1a;
  --secondary: #2a2a2a;
  --muted: #666666;
  --muted-foreground: #999999;
  --background: #0a0a0a;    /* Dark background */
  --foreground: #ffffff;
  --border: #333333;
  --radius: 0.5rem;
}
```

### Tailwind Configuration

**Location**: `tailwind.config.ts`

- **Color Palette**: Dark theme with gold primary accent
- **Typography**: Instrument Serif (headings), DM Sans (body)
- **Spacing**: Standard Tailwind scale
- **Animations**: Custom keyframes (marquee, film grain overlay)

---

## Utility Functions

### Class Name Composition

**Location**: `src/lib/utils.ts`

```typescript
export function cn(...inputs: (string | undefined | null | false)[]): string
```

Safely combines Tailwind classes using `clsx` and `tailwind-merge` to prevent style conflicts.

**Usage**:
```typescript
const buttonClass = cn(
  "px-4 py-2 rounded",
  isActive && "bg-primary text-white"
);
```

---

## Future API Integration Points

While the current portfolio is static, the following endpoints could be integrated:

### Email Contact Form (Recommended)

```
POST /api/contact
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "message": "string",
  "subject": "string"
}

Response: 200 OK
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Blog/Articles API (Optional)

```
GET /api/articles
Response: 200 OK
[
  {
    "id": "string",
    "title": "string",
    "slug": "string",
    "excerpt": "string",
    "publishedAt": "ISO8601",
    "tags": ["string"]
  }
]
```

### Analytics Tracking (Optional)

```
POST /api/analytics/events
Content-Type: application/json

{
  "event": "page_view" | "button_click" | "section_view",
  "metadata": { [key: string]: any }
}
```

---

## Error Handling

The portfolio currently has no error states for API calls. Future implementations should follow:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

---

## Performance Considerations

- **Static Generation**: All content is pre-rendered at build time
- **Image Optimization**: Next.js Image component for responsive images
- **Code Splitting**: Automatic per-route code splitting
- **CSS-in-JS**: Tailwind CSS with PostCSS for optimized output
- **Animation Performance**: Framer Motion uses GPU-accelerated transforms

---

## Development Environment

**Node Version**: 18+ (recommended)

**Key Scripts**:
```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run lint     # ESLint + TypeScript check
npm start        # Production server
```

---

## Deployment

The portfolio is optimized for **static hosting**:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

**Build Output**: Fully static HTML/CSS/JS with no server requirements.