/**
 * LLM-optimized type definitions for @voilajsx/uikit - COMPLETE & CONSISTENT
 * @module @voilajsx/uikit
 * @file src/types/index.ts
 */

import type {
  ComponentType,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import type {
  FieldValues,
  FieldPath,
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import type { ZodSchema } from 'zod';

/**
 * @llm-rule Component Categories for Clear Selection:
 * 
 * COMPOUND-ONLY LAYOUTS (require child components):
 * - AdminLayout: Dashboard/admin interfaces → AdminLayout.Header + AdminLayout.Sidebar + AdminLayout.Content
 * - PageLayout: Public websites → PageLayout.Header + PageLayout.Content + PageLayout.Footer
 * 
 * SINGLE-USE LAYOUTS (accept direct content as children):
 * - AuthLayout: Login/signup pages → Pass form content directly
 * - BlankLayout: Error/simple pages → Pass page content directly
 * - PopupLayout: Extensions/modals → Pass popup content directly
 * 
 * SECTION COMPONENTS (page building blocks):
 * - Header: Navigation headers with responsive behavior
 * - Footer: Page footers with navigation and branding
 * - Container: Content areas with optional sidebars
 * 
 * UI COMPONENTS (interactive elements):
 * - All shadcn/ui components with semantic color system
 * - Enhanced DataTable: Professional data tables with sorting/filtering
 * - Motion: Animation components with presets and gestures
 * - EnhancedForm: React Hook Form + Zod validation system
 */

/**
 * @llm-decision-tree Component Selection Rules
 * 
 * What are you building?
 * ├── Admin dashboard/CRM/analytics → AdminLayout scheme="sidebar|compact"
 * ├── Company website/blog/docs → PageLayout scheme="default|sidebar"
 * ├── Login/signup/onboarding → AuthLayout scheme="simple|card|split|hero"
 * ├── Error page/maintenance/about → BlankLayout scheme="simple|card"
 * └── Chrome extension/popup/overlay → PopupLayout scheme="modal|drawer|floating"
 */

/**
 * Standardized size variants - CONSISTENT across ALL components
 * @llm-rule Use same sizes everywhere for predictability
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * System color scheme preference
 * @llm-rule mode: System-level light/dark preference
 */
export type Mode = 'light' | 'dark';

/**
 * Pre-bundled theme options
 * @llm-rule theme: Pre-bundled CSS themes included in package
 */
export type Theme = 'base' | 'elegant' | 'metro' | 'studio' | 'vivid';

/**
 * Semantic tone system for component emphasis
 * @llm-rule tone: Component-level visual emphasis
 * clean → Pure, minimal, white/light backgrounds (most websites)
 * subtle → Muted, supporting, gray areas (admin panels)
 * brand → Primary colored, branded elements (headers, CTAs)
 * contrast → High emphasis, dark/bold areas (footers, emphasis)
 */
export type Tone = 'clean' | 'subtle' | 'brand' | 'contrast';

/**
 * @llm-defaults Context-aware tone defaults:
 * AdminLayout: "subtle" (professional gray)
 * PageLayout: "clean" (pure white)
 * AuthLayout: "clean" (focused minimal)
 * PopupLayout: "clean" (clean extension)
 * BlankLayout: "clean" (simple pages)
 * Header: "clean" (clean headers)
 * Footer: "contrast" (bold footers)
 */

/**
 * Layout scheme types - BEHAVIORAL descriptions for clear LLM understanding
 * @llm-rule All layouts use scheme for structural consistency
 */

/**
 * AdminLayout schemes - Dashboard/admin interface variations
 * sidebar: Persistent left sidebar with full navigation (classic admin dashboard)
 * compact: Icon-only sidebar that expands on hover/click (space-saving modern)
 */
export type AdminLayoutScheme = 'sidebar' | 'compact';

/**
 * PageLayout schemes - Public website variations
 * default: Simple header + content + footer (standard website)
 * sidebar: Header + content with sidebar + footer (documentation site)
 */
export type PageLayoutScheme = 'default' | 'sidebar';

/**
 * AuthLayout schemes - Authentication page variations
 * simple: Centered form without card styling (minimal login)
 * card: Elevated card container with shadow (standard login)
 * split: Left image/content + right form (modern split-screen)
 * hero: Form overlay on background image (dramatic marketing)
 */
export type AuthLayoutScheme = 'simple' | 'card' | 'split' | 'hero';

/**
 * BlankLayout schemes - Simple page variations
 * simple: Plain centered content (error pages)
 * card: Content in elevated card (maintenance pages)
 */
export type BlankLayoutScheme = 'simple' | 'card';

/**
 * PopupLayout schemes - Extension/modal variations
 * modal: Standard popup window (Chrome extensions)
 * drawer: Slide-out panel (mobile-first)
 * floating: Detached overlay (tooltips, menus)
 */
export type PopupLayoutScheme = 'modal' | 'drawer' | 'floating';

/**
 * MobileLayout schemes - Mobile navigation patterns
 * tabbed: Bottom tab navigation (iOS/Android standard)
 * stack: Stack navigation with back button (detail pages)
 * drawer: Side drawer navigation (hamburger menu)
 */
export type MobileLayoutScheme = 'tabbed' | 'stack' | 'drawer';

/**
 * Standardized navigation interface - SINGLE structure for ALL components
 * @llm-rules Navigation Usage:
 * - key: REQUIRED unique identifier
 * - label: REQUIRED display text
 * - href: USE for page navigation (routing)
 * - onClick: USE for app functions (modals, actions)
 * - items: USE for submenus (max 2 levels deep)
 * - badge: USE for notifications/counts
 * - isActive: USE for current page highlighting
 * - icon: USE lucide-react icons
 */
export interface NavigationItem {
  /** REQUIRED: Unique identifier */
  key: string;
  /** REQUIRED: Display text */
  label: string;
  /** OPTIONAL: Page navigation - USE for routing */
  href?: string;
  /** OPTIONAL: App function - USE for actions/modals */
  onClick?: () => void;
  /** OPTIONAL: Icon component from lucide-react */
  icon?: ComponentType<{ className?: string }>;
  /** OPTIONAL: Nested items - USE for dropdowns (max 2 levels) */
  items?: NavigationItem[];
  /** OPTIONAL: Badge text for notifications */
  badge?: string;
  /** OPTIONAL: Current page indicator */
  isActive?: boolean;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
}

/**
 * @llm-rule Navigation Props Hierarchy - CLEAR priority order
 * 
 * Priority Order:
 * 1. navigation?: NavigationItem[] - PRIMARY navigation items
 * 2. sidebarContent?: React.ReactNode - OVERRIDES navigation with custom JSX
 * 3. If both provided: sidebarContent takes precedence
 * 
 * Usage Examples:
 * ✅ <Sidebar navigation={navItems} />                    // Use navigation array
 * ✅ <Sidebar sidebarContent={<CustomSidebar />} />       // Use custom content
 * ❌ <Sidebar navigation={navItems} sidebarContent={jsx} /> // Confusing - avoid both
 */

/**
 * Base props that ALL components should extend
 * @llm-props Base pattern for all components
 */
export interface BaseComponentProps {
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** OPTIONAL: Inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for components that support navigation
 * @llm-props Navigation components
 */
export interface NavigationProps {
  /** RECOMMENDED: Navigation items using standard structure */
  navigation?: NavigationItem[];
  /** OPTIONAL: Current path for active state detection */
  currentPath?: string;
  /** OPTIONAL: Navigation handler function */
  onNavigate?: (href: string, item: NavigationItem) => void;
}

/**
 * Props for components that support tone theming
 * @llm-props Tone system
 */
export interface ToneProps {
  /** RECOMMENDED: Visual emphasis - clean/subtle/brand/contrast */
  tone?: Tone;
}

/**
 * Props for components that support sizing
 * @llm-props Size system  
 */
export interface SizeProps {
  /** OPTIONAL: Component size - sm/md/lg/xl/full */
  size?: Size;
}

/**
 * Standard layout scheme props - ALL layouts with schemes extend this
 * @llm-props Layout scheme base
 */
interface LayoutSchemeProps<TScheme> extends BaseComponentProps {
  /** RECOMMENDED: Layout structural arrangement */
  scheme?: TScheme;
  /** RECOMMENDED: Visual styling tone */
  tone?: Tone;
  /** OPTIONAL: Layout size */
  size?: Size;
}

/**
 * @llm-usage AdminLayout - COMPOUND-ONLY
 * <AdminLayout scheme="sidebar" tone="subtle" size="lg">
 *   <AdminLayout.Header title="Dashboard" actions={<UserMenu />} />
 *   <AdminLayout.Sidebar navigation={adminNav} logo={<Logo />} />
 *   <AdminLayout.Content>
 *     <DashboardContent />
 *   </AdminLayout.Content>
 * </AdminLayout>
 * 
 * @llm-defaults scheme="sidebar", tone="subtle", size="lg"
 */
export interface AdminLayoutProps extends LayoutSchemeProps<AdminLayoutScheme> {
  /** REQUIRED: Compound components only (Header, Sidebar, Content) */
  children: ReactNode;
  /** OPTIONAL: Default sidebar expanded state (default: true) */
  defaultSidebarOpen?: boolean;
  /** OPTIONAL: Sidebar positioning behavior (default: "relative") */
  position?: 'relative' | 'sticky' | 'fixed';
}

/**
 * AdminLayout.Header props
 */
export interface AdminHeaderProps extends BaseComponentProps, ToneProps, SizeProps {
  /** OPTIONAL: Header positioning (default: "sticky") */
  position?: 'sticky' | 'fixed' | 'relative';
  /** OPTIONAL: Page title */
  title?: string;
  /** OPTIONAL: Breadcrumb items */
  breadcrumbs?: { label: string; href?: string }[];
  /** OPTIONAL: Header actions (buttons, user menu, etc.) */
  actions?: ReactNode;
}

/**
 * AdminLayout.Sidebar props
 */
export interface AdminSidebarProps extends BaseComponentProps, ToneProps, NavigationProps {
  /** OPTIONAL: Logo component */
  logo?: ReactNode;
  /** OPTIONAL: Sidebar footer content */
  footer?: ReactNode;
  /** OPTIONAL: Sidebar positioning */
  position?: 'relative' | 'sticky' | 'fixed';
}

/**
 * AdminLayout.Content props
 */
export interface AdminContentProps extends BaseComponentProps, ToneProps, SizeProps {
  /** REQUIRED: Admin content */
  children: ReactNode;
}

/**
 * @llm-usage PageLayout - COMPOUND-ONLY
 * <PageLayout scheme="default" tone="clean" size="xl">
 *   <PageLayout.Header navigation={mainNav} logo={<Logo />} />
 *   <PageLayout.Content>
 *     <WebsiteContent />
 *   </PageLayout.Content>
 *   <PageLayout.Footer copyright="© 2024 Company" />
 * </PageLayout>
 * 
 * @llm-defaults scheme="default", tone="clean", size="xl"
 */
export interface PageLayoutProps extends LayoutSchemeProps<PageLayoutScheme> {
  /** REQUIRED: Compound components only (Header, Content, Footer) */
  children: ReactNode;
}

/**
 * PageLayout.Header props
 */
export interface PageHeaderProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** OPTIONAL: Header positioning (default: "sticky") */
  position?: 'sticky' | 'fixed' | 'relative';
  /** OPTIONAL: Logo component */
  logo?: ReactNode;
  /** OPTIONAL: Page title (used if no logo) */
  title?: string;
  /** OPTIONAL: Header actions (buttons, theme toggle, etc.) */
  actions?: ReactNode;
}

/**
 * PageLayout.Content props
 */
export interface PageContentProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** OPTIONAL: Sidebar position (default: "none") - overrides scheme */
  sidebar?: 'none' | 'left' | 'right';
  /** OPTIONAL: Custom sidebar content (overrides navigation) */
  sidebarContent?: ReactNode;
  /** OPTIONAL: Whether sidebar should be sticky */
  sidebarPosition?: 'sticky' | 'fixed' | 'relative';
  /** OPTIONAL: Breadcrumb items */
  breadcrumbs?: { label: string; href?: string }[];
  /** OPTIONAL: Page title (shown above breadcrumbs) */
  title?: string;
  /** REQUIRED: Page content */
  children: ReactNode;
}

/**
 * PageLayout.Footer props
 */
export interface PageFooterProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** OPTIONAL: Footer positioning (default: "relative") */
  position?: 'sticky' | 'fixed' | 'relative';
  /** OPTIONAL: Copyright text */
  copyright?: ReactNode;
  /** OPTIONAL: Custom footer content */
  children?: ReactNode;
}

/**
 * @llm-usage AuthLayout - SINGLE component with props
 * <AuthLayout scheme="card" tone="clean" size="md" title="Sign In" logo={<Logo />}>
 *   <LoginForm />
 * </AuthLayout>
 * 
 * @llm-defaults scheme="card", tone="clean", size="md"
 */
export interface AuthLayoutProps extends LayoutSchemeProps<AuthLayoutScheme> {
  /** REQUIRED: Form content */
  children: ReactNode;
  /** OPTIONAL: Page title */
  title?: string;
  /** OPTIONAL: Page subtitle */
  subtitle?: string;
  /** OPTIONAL: Logo component */
  logo?: ReactNode;
  /** OPTIONAL: Footer content */
  footer?: ReactNode;
  /** OPTIONAL: Container props for customization */
  containerProps?: HTMLAttributes<HTMLDivElement>;
  
  // Split scheme props
  /** OPTIONAL: Left side content for split scheme */
  splitContent?: ReactNode;
  /** OPTIONAL: Custom background classes for split scheme left side (colors, gradients, images, patterns) */
  splitBackground?: string;
  
  // Hero scheme props  
  /** OPTIONAL: Background image URL for hero scheme */
  imageUrl?: string;
  /** OPTIONAL: Image alt text */
  imageAlt?: string;
  /** OPTIONAL: Image overlay */
  imageOverlay?: 'light' | 'dark' | 'none';
  
  // Card scheme props
  /** OPTIONAL: Additional card content for card scheme */
  cardContent?: ReactNode;
}

/**
 * @llm-usage BlankLayout - SINGLE component
 * <BlankLayout scheme="simple" tone="clean" size="lg">
 *   <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
 *   <p className="text-muted-foreground mb-6">Page not found.</p>
 *   <Button>Go Home</Button>
 * </BlankLayout>
 * 
 * @llm-defaults scheme="simple", tone="clean", size="lg"
 */
export interface BlankLayoutProps extends LayoutSchemeProps<BlankLayoutScheme> {
  /** REQUIRED: Page content */
  children: ReactNode;
}

/**
 * @llm-usage PopupLayout - SINGLE component
 * <PopupLayout scheme="modal" tone="clean" size="md" title="Extension" showClose onClose={close}>
 *   <ExtensionContent />
 * </PopupLayout>
 * 
 * @llm-defaults scheme="modal", tone="clean", size="md"
 */
export interface PopupLayoutProps extends LayoutSchemeProps<PopupLayoutScheme> {
  /** REQUIRED: Popup content */
  children: ReactNode;
  /** OPTIONAL: Popup title */
  title?: string;
  /** OPTIONAL: Popup subtitle */
  subtitle?: string;
  /** OPTIONAL: Logo/icon component */
  logo?: ReactNode;
  /** OPTIONAL: Status badge */
  badge?: ReactNode;
  /** OPTIONAL: Header action buttons */
  headerActions?: ReactNode;
  /** OPTIONAL: Show back button */
  showBack?: boolean;
  /** OPTIONAL: Show close button */
  showClose?: boolean;
  /** OPTIONAL: Show header divider */
  showDivider?: boolean;
  /** OPTIONAL: Back button handler */
  onBack?: () => void;
  /** OPTIONAL: Close button handler */
  onClose?: () => void;
  /** OPTIONAL: Footer content */
  footer?: ReactNode;
  /** OPTIONAL: Enable content scrolling */
  scrollable?: boolean;
  /** OPTIONAL: Popup positioning */
  position?: 'sticky' | 'fixed' | 'relative';
}

/**
 * Section component props - Header, Footer, Container
 */

/**
 * Header component props (Section component - no scheme)
 * @llm-props Header
 * REQUIRED: children
 * RECOMMENDED: tone="clean"
 * OPTIONAL: size, navigation, position
 */
export interface HeaderProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** REQUIRED: Header content */
  children: ReactNode;
  /** OPTIONAL: Header positioning (default: "sticky") */
  position?: 'sticky' | 'fixed' | 'relative';
}

/**
 * Footer component props (Section component - no scheme)
 * @llm-props Footer
 * REQUIRED: children
 * RECOMMENDED: tone="contrast"
 * OPTIONAL: size, navigation, position
 */
export interface FooterProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** REQUIRED: Footer content */
  children: ReactNode;
  /** OPTIONAL: Footer positioning (default: "relative") */
  position?: 'sticky' | 'fixed' | 'relative';
}

/**
 * Container component props (Section component - no scheme)
 * @llm-props Container
 * REQUIRED: children
 * RECOMMENDED: tone="clean"
 * OPTIONAL: size, sidebar, navigation
 */
export interface ContainerProps extends BaseComponentProps, ToneProps, SizeProps, NavigationProps {
  /** REQUIRED: Container content */
  children: ReactNode;
  /** OPTIONAL: Container positioning */
  position?: 'sticky' | 'fixed' | 'relative';
  /** OPTIONAL: Sidebar position */
  sidebar?: 'none' | 'left' | 'right';
  /** OPTIONAL: Custom sidebar content (overrides navigation) */
  sidebarContent?: ReactNode;
  /** OPTIONAL: Whether sidebar should be sticky */
  sidebarPosition?: 'sticky' | 'fixed' | 'relative';
}

/**
 * Enhanced DataTable Types
 * @llm-usage Professional data tables with sorting, filtering, pagination
 */

/**
 * DataTable column definition
 */
export interface DataTableColumn<T = any> {
  /** REQUIRED: Unique column identifier */
  id: string;
  /** REQUIRED: Column header text */
  header: string;
  /** OPTIONAL: Data accessor key or function */
  accessorKey?: keyof T | string;
  accessor?: (row: T) => any;
  /** OPTIONAL: Cell renderer function */
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  /** OPTIONAL: Column width */
  width?: string | number;
  minWidth?: number;
  maxWidth?: number;
  /** OPTIONAL: Enable sorting */
  sortable?: boolean;
  /** OPTIONAL: Enable filtering */
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number' | 'boolean';
  filterOptions?: Array<{ label: string; value: any }>;
  /** OPTIONAL: Enable column resizing */
  resizable?: boolean;
  /** OPTIONAL: Hide column by default */
  hidden?: boolean;
  /** OPTIONAL: Pin column to left or right */
  pinned?: 'left' | 'right';
  /** OPTIONAL: Data type for sorting */
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  /** OPTIONAL: Custom sort function */
  sortFn?: (a: any, b: any) => number;
  /** OPTIONAL: Column group */
  group?: string;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Filter configuration
 */
export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';

export interface FilterConfig {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number' | 'boolean';
    value: any;
    operator?: FilterOperator;
  };
}

/**
 * Row action definition
 */
export interface RowAction<T = any> {
  /** REQUIRED: Action identifier */
  id: string;
  /** REQUIRED: Action label */
  label: string;
  /** OPTIONAL: Action icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** REQUIRED: Action handler */
  onClick: (row: T, index: number) => void;
  /** OPTIONAL: Conditional visibility */
  visible?: (row: T, index: number) => boolean;
  /** OPTIONAL: Action variant */
  variant?: 'default' | 'destructive' | 'secondary';
  /** OPTIONAL: Confirmation required */
  confirmation?: {
    title: string;
    description: string;
  };
}

/**
 * Motion Animation Types
 * @llm-usage CSS-based animations with presets and gestures
 */

/**
 * Animation transition configuration
 */
export interface AnimationTransition {
  type?: 'spring' | 'tween';
  duration?: number;
  delay?: number;
  ease?: string | number[];
  damping?: number;
  stiffness?: number;
  mass?: number;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

/**
 * Animation state configuration
 */
export interface AnimationState {
  opacity?: number;
  x?: number | string | number[];
  y?: number | string | number[];
  scale?: number | number[];
  rotate?: number | number[];
  transformOrigin?: string;
  transition?: AnimationTransition;
}

/**
 * Available animation presets
 */
export type AnimationPreset = 
  | 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeOut'
  | 'scaleIn' | 'scaleInCenter'
  | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight'
  | 'bounce' | 'elastic' | 'rubberBand' | 'pulse' | 'wobble' | 'shake';

/**
 * Motion component props
 */
export interface MotionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onAnimationStart'> {
  /** OPTIONAL: HTML element to render */
  as?: keyof React.JSX.IntrinsicElements;
  /** OPTIONAL: Animation preset */
  preset?: AnimationPreset;
  /** OPTIONAL: Custom initial state */
  initial?: AnimationState;
  /** OPTIONAL: Custom animate state */
  animate?: AnimationState;
  /** OPTIONAL: Custom exit state */
  exit?: AnimationState;
  /** OPTIONAL: Animation duration */
  duration?: 'fast' | 'normal' | 'slow' | 'slower' | 'slowest' | number;
  /** OPTIONAL: Animation delay */
  delay?: number;
  /** OPTIONAL: Animation easing */
  easing?: 'easeInOut' | 'easeOut' | 'easeIn' | 'easeOutBack' | 'easeInBack' | 'easeOutBounce' | 'linear';
  /** OPTIONAL: Trigger animation when in view */
  triggerInView?: boolean;
  /** OPTIONAL: Animation repeat count */
  repeat?: number | 'infinite';
  /** OPTIONAL: Repeat type */
  repeatType?: 'loop' | 'reverse' | 'mirror';
  /** OPTIONAL: Spring physics */
  spring?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** OPTIONAL: Gesture animations */
  whileHover?: AnimationState;
  whileTap?: AnimationState;
  whileFocus?: AnimationState;
  /** OPTIONAL: Animation callbacks */
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  /** REQUIRED: Children */
  children: React.ReactNode;
}

/**
 * Enhanced Form Types
 * @llm-usage React Hook Form + Zod validation system
 */

/**
 * Enhanced Form props with Zod validation
 */
export interface EnhancedFormProps<T extends FieldValues = FieldValues> {
  /** REQUIRED: Zod schema for validation */
  schema: ZodSchema<T>;
  /** OPTIONAL: Default values */
  defaultValues?: Partial<T>;
  /** REQUIRED: Form submission handler */
  onSubmit: (data: T) => void | Promise<void>;
  /** OPTIONAL: Error handler */
  onError?: (errors: any) => void;
  /** OPTIONAL: Loading state */
  loading?: boolean;
  /** OPTIONAL: Form mode */
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  /** OPTIONAL: Revalidate mode */
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  /** OPTIONAL: Auto-save functionality */
  autoSave?: {
    enabled: boolean;
    debounceMs?: number;
    onSave?: (data: Partial<T>) => void;
  };
  /** OPTIONAL: Form layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** OPTIONAL: Form size */
  size?: 'sm' | 'md' | 'lg';
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** REQUIRED: Form content */
  children: React.ReactNode;
}

/**
 * Form field props
 */
export interface FormFieldProps<T extends FieldValues = FieldValues> {
  /** REQUIRED: Field name */
  name: FieldPath<T>;
  /** OPTIONAL: Field label */
  label?: string;
  /** OPTIONAL: Field description */
  description?: string;
  /** OPTIONAL: Field is required */
  required?: boolean;
  /** OPTIONAL: Field variant */
  variant?: 'default' | 'inline' | 'stacked';
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** REQUIRED: Field content */
  children: React.ReactNode;
}

/**
 * Input field props
 */
export interface InputFieldProps<T extends FieldValues = FieldValues> {
  /** REQUIRED: Field name */
  name: FieldPath<T>;
  /** OPTIONAL: Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** OPTIONAL: Placeholder text */
  placeholder?: string;
  /** OPTIONAL: Input is disabled */
  disabled?: boolean;
  /** OPTIONAL: Input is readonly */
  readOnly?: boolean;
  /** OPTIONAL: Show password toggle (for password type) */
  showPasswordToggle?: boolean;
  /** OPTIONAL: Input prefix icon */
  prefixIcon?: React.ComponentType<{ className?: string }>;
  /** OPTIONAL: Input suffix icon */
  suffixIcon?: React.ComponentType<{ className?: string }>;
  /** OPTIONAL: Additional props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Select field props
 */
export interface SelectFieldProps<T extends FieldValues = FieldValues> {
  /** REQUIRED: Field name */
  name: FieldPath<T>;
  /** OPTIONAL: Placeholder text */
  placeholder?: string;
  /** REQUIRED: Select options */
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
  /** OPTIONAL: Select is disabled */
  disabled?: boolean;
  /** OPTIONAL: Allow clearing selection */
  clearable?: boolean;
}

/**
 * @llm-pattern COMPOUND-ONLY Layout Usage
 * 
 * AdminLayout (dashboard/admin):
 * <AdminLayout scheme="sidebar" tone="subtle">
 *   <AdminLayout.Header title="Dashboard" />
 *   <AdminLayout.Sidebar navigation={nav} />
 *   <AdminLayout.Content>...</AdminLayout.Content>
 * </AdminLayout>
 * 
 * PageLayout (websites):
 * <PageLayout scheme="default" tone="clean">
 *   <PageLayout.Header navigation={nav} />
 *   <PageLayout.Content>...</PageLayout.Content>
 *   <PageLayout.Footer />
 * </PageLayout>
 * 
 * AuthLayout (login/signup):
 * <AuthLayout scheme="card" tone="clean" title="Sign In">
 *   <LoginForm />
 * </AuthLayout>
 * 
 * BlankLayout (error/simple pages):
 * <BlankLayout scheme="simple" tone="clean">
 *   <ErrorContent />
 * </BlankLayout>
 * 
 * PopupLayout (extensions/modals):
 * <PopupLayout scheme="modal" tone="clean" title="Extension">
 *   <ExtensionContent />
 * </PopupLayout>
 */

/**
 * @llm-decision-tree Layout Selection Guide
 * 
 * What are you building?
 * ├── Admin dashboard/CRM/analytics → AdminLayout scheme="sidebar|compact"
 * ├── Company website/blog/docs → PageLayout scheme="default|sidebar"
 * ├── Login/signup/onboarding → AuthLayout scheme="simple|card|split|hero"
 * ├── Error page/maintenance/about → BlankLayout scheme="simple|card"
 * └── Chrome extension/popup/overlay → PopupLayout scheme="modal|drawer|floating"
 * 
 * All layouts follow consistent patterns:
 * 1. scheme prop for structural variation
 * 2. tone prop for visual emphasis  
 * 3. size prop for responsive sizing
 * 4. Compound components for flexibility (AdminLayout, PageLayout)
 * 5. Single components for simplicity (AuthLayout, BlankLayout, PopupLayout)
 */

/**
 * Platform detection types
 */
export type Platform = 'web' | 'native' | 'tauri' | 'unknown';

/**
 * Legacy theme config interface for backward compatibility
 */
export interface ThemeConfig {
  id: Theme;
  name: string;
  description?: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

/**
 * Re-export commonly used types for convenience
 */
export type {
  ComponentType,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export type {
  FieldValues,
  FieldPath,
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';

export type { ZodSchema } from 'zod';