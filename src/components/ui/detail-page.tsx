/**
 * Pure UIKit Detail Page Components - shadcn/ui Compatible
 * @module @bloomneo/uikit
 * @file src/components/ui/detail-page.tsx
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  ValidatedInput,
  ValidatedTextarea,
  ValidatedSelect,
  FormActions
} from '@/components/ui/form';
import { 
  ArrowLeft, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  Copy,
  Trash2,
  Edit,
  MoreHorizontal
} from 'lucide-react';

// =============================================================================
// INTERFACES
// =============================================================================

interface DetailAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  position?: 'primary' | 'secondary';
}

interface StatusConfig {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  activeText?: string;
  inactiveText?: string;
  customBadge?: React.ReactNode;
}

interface MetadataField {
  label: string;
  value: string | number | boolean;
  type?: 'text' | 'date' | 'datetime' | 'boolean' | 'number' | 'json' | 'badge';
  copyable?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  formatter?: (value: any) => string | React.ReactNode;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  value: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  description?: string;
  rows?: number;
}

interface FormSection {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

interface DeleteConfirmProps {
  open: boolean;
  entity: {
    name: string;
    type: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  confirmationValue: string;
  onConfirmationChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

interface DetailPageProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onBack: () => void;
  status?: StatusConfig;
  actions?: DetailAction[];
  formSections?: FormSection[];
  metadataFields?: MetadataField[];
  sidebarCards?: React.ReactNode[];
  isEditing?: boolean;
  onFormChange?: (key: string, value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
  saving?: boolean;
  formValid?: boolean;
  loading?: boolean;
  error?: string;
  onClearError?: () => void;
  children?: React.ReactNode;
  className?: string;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const formatValue = (value: any, field: MetadataField): string | React.ReactNode => {
  if (field.formatter) {
    return field.formatter(value);
  }
  
  switch (field.type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'datetime':
      return new Date(value).toLocaleString();
    case 'boolean':
      return value ? '✅ Yes' : '❌ No';
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : value;
    case 'json':
      return (
        <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    case 'badge':
      return (
        <Badge variant={field.badgeVariant || 'default'}>
          {String(value)}
        </Badge>
      );
    default:
      return String(value);
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Generic Detail Page Layout - Pure shadcn/ui
 */
export function DetailPageLayout({
  title,
  subtitle,
  icon: Icon,
  onBack,
  status,
  actions = [],
  formSections = [],
  metadataFields = [],
  sidebarCards = [],
  isEditing = false,
  onFormChange,
  onSave,
  onCancel,
  saveText = 'Save Changes',
  cancelText = 'Cancel',
  saving = false,
  formValid = true,
  loading = false,
  error,
  onClearError,
  children,
  className = ''
}: DetailPageProps) {
  
  const deleteAction = actions.find(a => a.variant === 'destructive');
  const editAction = actions.find(a => a.id === 'edit');
  const otherActions = actions.filter(a => a.variant !== 'destructive' && a.id !== 'edit');
  
  const primaryActions = [
    ...(deleteAction ? [deleteAction] : []),
    ...(editAction && !isEditing ? [editAction] : []),
    ...otherActions.filter(a => a.position !== 'secondary')
  ];
  
  const secondaryActions = otherActions.filter(a => a.position === 'secondary');

  return (
    <TooltipProvider>
      <div className={cn("min-h-screen p-6", className)}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header - Pure shadcn styling */}
          <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              
              {/* Left Section - Title + Icon */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                )}
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
                    {loading ? 'Loading...' : title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2 shrink-0 lg:ml-4">
                
                {/* Back Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onBack}
                      className="flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Back</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Go back</TooltipContent>
                </Tooltip>
                
                {/* Edit Mode Actions */}
                {isEditing && onSave && onCancel ? (
                  <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onCancel}
                      disabled={saving}
                    >
                      {cancelText}
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={saving || !formValid}
                      className="min-w-20"
                    >
                      {saving ? (
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                          <span className="hidden sm:inline">Saving...</span>
                        </div>
                      ) : (
                        saveText
                      )}
                    </Button>
                  </form>
                ) : (
                  <>
                    {/* Primary Actions */}
                    {primaryActions.slice(0, 2).map((action) => (
                      <Tooltip key={action.id}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={action.variant || 'default'}
                            size="sm"
                            onClick={action.onClick}
                            disabled={action.disabled || loading}
                            className="flex items-center gap-1.5"
                          >
                            <action.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {action.loading ? 'Loading...' : action.label}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">{action.label}</TooltipContent>
                      </Tooltip>
                    ))}

                    {/* More Actions Dropdown */}
                    {(primaryActions.length > 2 || secondaryActions.length > 0) && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="px-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">More actions</TooltipContent>
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                {error}
                {onClearError && (
                  <Button variant="outline" size="sm" onClick={onClearError}>
                    Dismiss
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Status Banner */}
          {status && <StatusBanner {...status} />}

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              {formSections.map((section, index) => (
                <FormSectionCard
                  key={index}
                  section={section}
                  isEditing={isEditing}
                  onFieldChange={onFormChange}
                />
              ))}
              {children}
            </div>

            <div className="space-y-6">
              {metadataFields.length > 0 && (
                <MetadataCard data={metadataFields} />
              )}
              {sidebarCards}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/**
 * Status banner - Pure shadcn styling
 */
function StatusBanner({
  active,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
  activeText = 'Entity is operational and accessible',
  inactiveText = 'Entity is inactive and cannot access services',
  customBadge
}: StatusConfig) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              active ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
            )}>
              {active ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Status: {active ? activeLabel : inactiveLabel}
              </h3>
              <p className="text-sm text-muted-foreground">
                {active ? activeText : inactiveText}
              </p>
            </div>
          </div>
          {customBadge || (
            <Badge variant={active ? 'default' : 'secondary'} className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                active ? "bg-green-500" : "bg-orange-500"
              )} />
              {active ? activeLabel : inactiveLabel}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Metadata card - Pure shadcn styling
 */
function MetadataCard({ 
  data,
  title = 'Metadata'
}: { 
  data: MetadataField[];
  title?: string;
}) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-0">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="space-y-3">
          {data.map((field, index) => (
            <div key={index}>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                {field.icon && <field.icon className="w-3 h-3" />}
                {field.label}
              </label>
              <div className="flex items-center gap-2 mt-1">
                {field.copyable ? (
                  <>
                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded border flex-1 break-all">
                      {formatValue(field.value, field)}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(String(field.value))}
                          className="h-8 w-8 p-0 shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy {field.label}</TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  <div className="text-sm break-words">{formatValue(field.value, field)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Form section card - Pure shadcn styling
 */
function FormSectionCard({
  section,
  isEditing,
  onFieldChange
}: {
  section: FormSection;
  isEditing: boolean;
  onFieldChange?: (key: string, value: any) => void;
}) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-0">
        <CardTitle className="flex items-center gap-3">
          {section.icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <section.icon className="w-4 h-4 text-primary" />
            </div>
          )}
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {section.title}
          </span>
        </CardTitle>
        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {section.fields.map((field) => (
            <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <DynamicFormField
                field={field}
                isEditing={isEditing}
                onChange={(value) => onFieldChange?.(field.key, value)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Dynamic form field renderer
 */
function DynamicFormField({
  field,
  isEditing,
  onChange
}: {
  field: FormField;
  isEditing: boolean;
  onChange: (value: any) => void;
}) {
  const baseProps = {
    label: field.label,
    value: String(field.value || ''),
    onChange: onChange,
    disabled: !isEditing || field.disabled,
    required: field.required,
    placeholder: field.placeholder
  };

  switch (field.type) {
    case 'textarea':
      return (
        <ValidatedTextarea
          {...baseProps}
          rows={field.rows || 3}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
        />
      );
    
    case 'select':
      return (
        <ValidatedSelect
          {...baseProps}
          options={field.options || []}
        />
      );
    
    case 'email':
      return (
        <ValidatedInput
          {...baseProps}
          type="email"
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          pattern={field.validation?.pattern}
        />
      );
    
    case 'password':
      return (
        <ValidatedInput
          {...baseProps}
          type="password"
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          showPasswordStrength={true}
          showPasswordToggle={true}
        />
      );
    
    case 'number':
      return (
        <ValidatedInput
          {...baseProps}
          type="number"
        />
      );
    
    default:
      return (
        <ValidatedInput
          {...baseProps}
          type="text"
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          pattern={field.validation?.pattern}
        />
      );
  }
}

/**
 * Delete confirmation dialog - Pure shadcn styling
 */
export function DeleteConfirmDialog({
  open,
  entity,
  confirmationValue,
  onConfirmationChange,
  onConfirm,
  onCancel,
  loading = false
}: DeleteConfirmProps) {
  const isConfirmValid = confirmationValue === entity.name;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isConfirmValid && !loading) {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-destructive">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            Delete {entity.type}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the {entity.type.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {entity.icon ? (
                    <entity.icon className="w-4 h-4 text-primary" />
                  ) : (
                    <span className="text-primary font-bold text-sm">
                      {entity.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{entity.name}</p>
                  <p className="text-sm text-muted-foreground">{entity.type}</p>
                </div>
              </div>
            </div>

            <ValidatedInput
              required
              label={`Type "${entity.name}" to confirm:`}
              placeholder={entity.name}
              value={confirmationValue}
              onChange={onConfirmationChange}
            />
          </div>

          <DialogFooter className="mt-6">
            <FormActions
              submitText={`Delete ${entity.type}`}
              cancelText="Cancel"
              showCancel
              loading={loading}
              disabled={!isConfirmValid}
              onCancel={onCancel}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}