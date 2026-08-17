/**
 * Main entry point for @bloomneo/uikit
 * @module @bloomneo/uikit
 * @file src/index.ts
 */

// Utils
export { cn } from './lib/utils';

// Types
export type * from './types';

// Styles (CSS import)
import './styles/globals.css';

// UI Components - Form & Input
export { Button } from './components/ui/button';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/textarea';
export { Label } from './components/ui/label';
export { Checkbox } from './components/ui/checkbox';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Switch } from './components/ui/switch';
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './components/ui/select';
export {
  Form,
  FormControl,
  FormDescription,
  // @llm-rule AVOID: Do not reach for `FormController` in new code — it is a
  //   legacy alias for react-hook-form's `<FormField>` controller, kept only
  //   so existing react-hook-form consumers can migrate without a rename.
  //   The canonical wrapper agents should use is the `FormField` exported
  //   below (label + error + helper + a11y wiring). Its source file
  //   `src/components/ui/form.tsx` header reiterates this rule, and
  //   AGENTS.md rule "Never do #2" bans its use in new code.
  FormField as FormController,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';

// UI Components - Display & Layout
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
export { Badge } from './components/ui/badge';
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

// UI Components - Navigation & Menu
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from './components/ui/dropdown-menu';
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './components/ui/command';

// UI Components - Overlay & Modal
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './components/ui/dialog';
export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from './components/ui/sheet';
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './components/ui/hover-card';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';

// UI Components - Data & Table
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
export { DataTable } from './components/ui/data-table';
export type {
  DataTableColumn,
  DataTableProps,
  DataTableCellValue,
  DataTableFilterValue,
  FilterConfig,
  FilterOperator,
  RowAction,
  SortConfig,
} from './components/ui/data-table';
export { Toaster } from './components/ui/sonner';

// UI Components - App Primitives (Ship 2)
export { EmptyState } from './components/ui/empty-state';
export type { EmptyStateProps } from './components/ui/empty-state';

export { PageHeader } from './components/ui/page-header';
export type { PageHeaderProps, PageHeaderCrumb } from './components/ui/page-header';

export { FormField, PasswordInput } from './components/ui/form-field';
export type { FormFieldProps, PasswordInputProps } from './components/ui/form-field';

export {
  ToastProvider,
  toast,
  useToast,
} from './components/ui/toast';
export type {
  ToastProviderProps,
  ToastOptions,
  ToastAction,
  ToastPosition,
} from './components/ui/toast';

export {
  ConfirmProvider,
  useConfirm,
  ConfirmDialog,
} from './components/ui/confirm-dialog';
export type {
  ConfirmOptions,
  DestructiveConfirmOptions,
  ConfirmDialogProps,
  UseConfirmReturn,
} from './components/ui/confirm-dialog';

// UI Components - 1.5.1 additions
export {
  PermissionGate,
  PermissionProvider,
  usePermission,
} from './components/ui/permission-gate';
export type {
  PermissionGateProps,
  PermissionProviderProps,
  PermissionContextValue,
  PermissionCheck,
  PermissionWhen,
} from './components/ui/permission-gate';

export { Combobox } from './components/ui/combobox';
export type { ComboboxProps, ComboboxOption } from './components/ui/combobox';

// Format utilities
export {
  formatCurrency,
  formatNumber,
  formatDate,
  timeAgo,
  formatBytes,
  Time,
} from './lib/format';
export type {
  FormatCurrencyOptions,
  FormatNumberOptions,
  FormatDateOptions,
  FormatBytesOptions,
  TimeAgoOptions,
  TimeProps,
  Nullable,
  DateInput,
} from './lib/format';

// FOUC prevention helper
export { foucScript, foucScriptTag } from './lib/fouc';
export type { FoucScriptOptions } from './lib/fouc';

/* ---------------------------------------------------------------------------
 * Platform detection
 *
 * These existed in src/lib/platform.ts since 2.x but were never exported, while
 * the npm description, the agent skill and the docs site all promised them. An
 * agent following the skill would write `import { isTauri } from
 * '@bloomneo/uikit'` and get undefined. Exporting them (4.1.1) is the smaller
 * change than retracting three separate claims.
 * ------------------------------------------------------------------------- */
export {
  detectPlatform,
  isBrowser,
  isNative,
  isTauri,
  isNode,
  isSSR,
  isMobile,
  isTablet,
  isDesktop,
  getDeviceType,
  getBrowserInfo,
  getOperatingSystem,
  getPlatformCapabilities,
  supportsFeature,
  PLATFORMS,
  platform,
} from './lib/platform';

// Educational error helpers (used by components, also exposed for custom use).
// Every typed subclass extends UIKitError, so `catch (err) { if (err instanceof UIKitError) ... }`
// matches every uikit error in one clause.
export {
  UIKitError,
  DataTableError,
  FormFieldError,
  ThemeError,
  ConfirmError,
  ToastError,
  PermissionError,
  requireProp,
  requireArrayProp,
  warnInDev,
} from './lib/errors';

// Theme System
export { ThemeProvider, useTheme, type Theme, type Mode } from './themes/theme-provider';

// Hooks
export {
  useApi,
  useBackendStatus,
  useLocalStorage,
  useMediaQuery,
  useBreakpoint,
  useActiveBreakpoint,
  breakpointQuery,
  BREAKPOINTS,
  useDataTable,
  usePagination,
} from './hooks';
export type {
  ApiResponse,
  ApiOptions,
  UseApiReturn,
  UseLocalStorageReturn,
  Breakpoint,
  BreakpointDirection,
  UseDataTableOptions,
  UseDataTableReturn,
  UsePaginationOptions,
  UsePaginationReturn,
  PaginationPage,
} from './hooks';