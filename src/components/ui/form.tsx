/**
 * Unified Form System - Simple Components + React Hook Form Integration
 * @module @bloomneo/uikit
 * @file src/components/ui/form.tsx
 */

import * as React from 'react';
import { forwardRef, useState, useCallback } from 'react';
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff
} from 'lucide-react';

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Debounced hook for smooth validation
 */
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Password strength calculation
 */
const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z\d]/.test(password)) score += 15;
  
  if (score < 30) return { score, label: 'Weak', color: 'text-destructive' };
  if (score < 60) return { score, label: 'Medium', color: 'text-orange-600' };
  return { score, label: 'Strong', color: 'text-green-600' };
};

// =============================================================================
// REACT HOOK FORM INTEGRATION (Advanced Usage)
// =============================================================================

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

// =============================================================================
// SIMPLE FORM COMPONENTS (Recommended for 90% of use cases)
// =============================================================================

/**
 * Validated Input - Form input with built-in validation and enhanced features
 */
export interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  // Standard React Props
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  
  // HTML5 Standard Props
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  
  // UI Props
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  
  // Enhanced Features
  showPasswordStrength?: boolean;
  showPasswordToggle?: boolean;
}

const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(({
  value = '',
  onChange,
  onFocus,
  onBlur,
  type = 'text',
  required = false,
  minLength,
  maxLength,
  pattern,
  label,
  placeholder,
  disabled = false,
  showPasswordStrength = false,
  showPasswordToggle = true,
  className,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // ✅ Sync internal state with external value changes
  React.useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  const debouncedValue = useDebounce(inputValue, 300);

  const validateValue = useCallback((val: string): { isValid: boolean; message: string } => {
    if (required && !val.trim()) {
      return { isValid: false, message: 'This field is required' };
    }

    if (!val.trim() && !required) {
      return { isValid: true, message: '' };
    }

    if (minLength && val.length < minLength) {
      return { isValid: false, message: `Minimum ${minLength} characters required` };
    }
    if (maxLength && val.length > maxLength) {
      return { isValid: false, message: `Maximum ${maxLength} characters allowed` };
    }

    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    if (type === 'url' && !/^https?:\/\/.+\..+/.test(val)) {
      return { isValid: false, message: 'Please enter a valid URL' };
    }
    if (type === 'tel' && !/^[\+]?[1-9][\d]{0,15}$/.test(val)) {
      return { isValid: false, message: 'Please enter a valid phone number' };
    }

    if (pattern && !new RegExp(pattern).test(val)) {
      return { isValid: false, message: 'Please match the required format' };
    }

    return { isValid: true, message: '' };
  }, [required, minLength, maxLength, type, pattern]);

  React.useEffect(() => {
    if (touched) {
      const result = validateValue(debouncedValue);
      setIsValid(result.isValid);
      setErrorMessage(result.message);
    }
  }, [debouncedValue, validateValue, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    const result = validateValue(inputValue);
    setIsValid(result.isValid);
    setErrorMessage(result.message);
    onBlur?.();
  };

  const actualType = type === 'password' && showPassword ? 'text' : type;
  const hasError = touched && !isValid;
  const hasSuccess = touched && isValid && inputValue;
  const passwordStrength = type === 'password' && showPasswordStrength ? calculatePasswordStrength(inputValue) : null;

  return (
    <div className="space-y-2">
      {label && (
        <Label 
          className={cn(
            'text-foreground',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={actualType}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'bg-background border-border text-foreground',
            hasError && 'border-destructive focus:border-destructive',
            hasSuccess && 'border-green-500',
            (type === 'password' && showPasswordToggle) && 'pr-10',
            className
          )}
        />

        {type === 'password' && showPasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}

        {touched && inputValue && !showPasswordToggle && (
          <div className="absolute right-3 top-2.5">
            {isValid ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>

      {passwordStrength && inputValue && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Password strength</span>
            <span className={passwordStrength.color}>{passwordStrength.label}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                passwordStrength.score < 30 && 'bg-destructive',
                passwordStrength.score >= 30 && passwordStrength.score < 60 && 'bg-orange-500',
                passwordStrength.score >= 60 && 'bg-green-500'
              )}
              style={{ width: `${passwordStrength.score}%` }}
            />
          </div>
        </div>
      )}

      {hasError && errorMessage && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </div>
      )}
    </div>
  );
});

ValidatedInput.displayName = 'ValidatedInput';

/**
 * Validated Textarea - Form textarea with built-in validation and enhanced features
 */
export interface ValidatedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  showCharCount?: boolean;
}

const ValidatedTextarea = forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(({
  value = '',
  onChange,
  onFocus,
  onBlur,
  required = false,
  minLength,
  maxLength,
  label,
  placeholder,
  disabled = false,
  rows = 3,
  showCharCount = true,
  className,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Sync internal state with external value changes
  React.useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const debouncedValue = useDebounce(inputValue, 300);

  const validateValue = useCallback((val: string): { isValid: boolean; message: string } => {
    if (required && !val.trim()) {
      return { isValid: false, message: 'This field is required' };
    }
    if (!val.trim() && !required) {
      return { isValid: true, message: '' };
    }
    if (minLength && val.length < minLength) {
      return { isValid: false, message: `Minimum ${minLength} characters required` };
    }
    if (maxLength && val.length > maxLength) {
      return { isValid: false, message: `Maximum ${maxLength} characters allowed` };
    }
    return { isValid: true, message: '' };
  }, [required, minLength, maxLength]);

  React.useEffect(() => {
    if (touched) {
      const result = validateValue(debouncedValue);
      setIsValid(result.isValid);
      setErrorMessage(result.message);
    }
  }, [debouncedValue, validateValue, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    
    setInputValue(newValue);
    onChange?.(newValue);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    const result = validateValue(inputValue);
    setIsValid(result.isValid);
    setErrorMessage(result.message);
    onBlur?.();
  };

  const hasError = touched && !isValid;
  const hasSuccess = touched && isValid && inputValue;

  return (
    <div className="space-y-2">
      {label && (
        <Label 
          className={cn(
            'text-foreground',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </Label>
      )}

      <Textarea
        {...props}
        ref={ref}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={cn(
          'bg-background border-border text-foreground',
          hasError && 'border-destructive focus:border-destructive',
          hasSuccess && 'border-green-500',
          className
        )}
      />

      {(showCharCount && maxLength) && (
        <div className="text-xs text-muted-foreground text-right">
          {inputValue.length} / {maxLength}
        </div>
      )}

      {hasError && errorMessage && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </div>
      )}
    </div>
  );
});

ValidatedTextarea.displayName = 'ValidatedTextarea';

/**
 * Validated Select - Form select with built-in validation
 */
export interface ValidatedSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  clearable?: boolean;
  className?: string;
}

const ValidatedSelect = forwardRef<HTMLDivElement, ValidatedSelectProps>(({
  value = '',
  onChange,
  required = false,
  disabled = false,
  label,
  placeholder = 'Select an option...',
  options,
  clearable = false,
  className,
}, ref) => {
  const [selectValue, setSelectValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Sync internal state with external value changes
  React.useEffect(() => {
    setSelectValue(value || '');
  }, [value]);

  const validateValue = useCallback((val: string): { isValid: boolean; message: string } => {
    if (required && !val) {
      return { isValid: false, message: 'Please select an option' };
    }
    return { isValid: true, message: '' };
  }, [required]);

  const handleValueChange = (newValue: string) => {
    setTouched(true);
    setSelectValue(newValue);
    const result = validateValue(newValue);
    setIsValid(result.isValid);
    setErrorMessage(result.message);
    onChange?.(newValue);
  };

  const hasError = touched && !isValid;

  return (
    <div className="space-y-2" ref={ref}>
      {label && (
        <Label 
          className={cn(
            'text-foreground',
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
        </Label>
      )}

      <Select
        value={selectValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'bg-background border-border text-foreground',
            hasError && 'border-destructive focus:border-destructive',
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {clearable && selectValue && (
            <SelectItem value="" className="text-muted-foreground">
              Clear selection
            </SelectItem>
          )}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="text-foreground"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasError && errorMessage && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </div>
      )}
    </div>
  );
});

ValidatedSelect.displayName = 'ValidatedSelect';

/**
 * Validated Checkbox - Form checkbox with built-in validation
 */
export interface ValidatedCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  label: string;
  description?: string;
  className?: string;
}

const ValidatedCheckbox = forwardRef<HTMLDivElement, ValidatedCheckboxProps>(({
  checked = false,
  onChange,
  required = false,
  disabled = false,
  label,
  description,
  className,
}, ref) => {
  const [checkedValue, setCheckedValue] = useState(checked);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Sync internal state with external value changes
  React.useEffect(() => {
    setCheckedValue(checked || false);
  }, [checked]);

  const validateValue = useCallback((val: boolean): { isValid: boolean; message: string } => {
    if (required && !val) {
      return { isValid: false, message: 'This field is required' };
    }
    return { isValid: true, message: '' };
  }, [required]);

  const handleChange = (newChecked: boolean) => {
    setTouched(true);
    setCheckedValue(newChecked);
    const result = validateValue(newChecked);
    setIsValid(result.isValid);
    setErrorMessage(result.message);
    onChange?.(newChecked);
  };

  const hasError = touched && !isValid;

  return (
    <div className={cn('space-y-2', className)} ref={ref}>
      <div className="flex items-start space-x-2">
        <Checkbox
          checked={checkedValue}
          onCheckedChange={handleChange}
          disabled={disabled}
          className="mt-0.5"
        />
        <div className="space-y-1 flex-1">
          <Label 
            className={cn(
              'text-sm font-medium leading-none text-foreground cursor-pointer',
              required && "after:content-['*'] after:ml-0.5 after:text-destructive"
            )}
          >
            {label}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {hasError && errorMessage && (
        <div className="flex items-center gap-1 text-sm text-destructive ml-6">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </div>
      )}
    </div>
  );
});

ValidatedCheckbox.displayName = 'ValidatedCheckbox';

/**
 * Form Actions - Submit/Cancel buttons with loading states
 */
export interface FormActionsProps {
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onCancel?: () => void;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(({
  submitText = 'Submit',
  cancelText = 'Cancel',
  showCancel = false,
  loading = false,
  disabled = false,
  onCancel,
  align = 'right',
  className,
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        'flex gap-2',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        className
      )}
    >
      {showCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="border-border"
        >
          {cancelText}
        </Button>
      )}
      
      <Button
        type="submit"
        disabled={loading || disabled}
        className="min-w-24 bg-primary text-primary-foreground"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </div>
        ) : (
          submitText
        )}
      </Button>
    </div>
  );
});

FormActions.displayName = 'FormActions';

// =============================================================================
// EXPORTS
// =============================================================================

export {
  // React Hook Form (Advanced)
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  
  // Simple Form Components (Recommended for 90% of use cases)
  ValidatedInput,
  ValidatedTextarea,
  ValidatedSelect,
  ValidatedCheckbox,
  FormActions,

};

/**
 * @llm-usage Validated Form Examples (Recommended for 90% of cases)
 * 
 * Basic form with validation:
 * ```jsx
 * const [email, setEmail] = useState('');
 * const [password, setPassword] = useState('');
 * 
 * <form onSubmit={handleSubmit}>
 *   <ValidatedInput
 *     type="email"
 *     required
 *     label="Email Address"
 *     value={email}
 *     onChange={setEmail}
 *     placeholder="Enter your email"
 *   />
 *   
 *   <ValidatedInput
 *     type="password"
 *     required
 *     minLength={8}
 *     label="Password"
 *     value={password}
 *     onChange={setPassword}
 *     showPasswordStrength
 *     showPasswordToggle
 *   />
 *   
 *   <FormActions
 *     submitText="Sign In"
 *     showCancel
 *     loading={isLoading}
 *     onCancel={() => router.back()}
 *   />
 * </form>
 * ```
 * 
 * Advanced React Hook Form usage (10% of cases):
 * ```jsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * 
 * const form = useForm({
 *   resolver: zodResolver(schema)
 * });
 * 
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="email"
 *       render={({ field }) => (
 *         <FormItem>
 *           <FormLabel>Email</FormLabel>
 *           <FormControl>
 *             <Input {...field} />
 *           </FormControl>
 *           <FormMessage />
 *         </FormItem>
 *       )}
 *     />
 *   </form>
 * </Form>
 * ```
 * 
 * @llm-rule Use ValidatedInput for form fields that need validation
 * @llm-rule Use Input (from shadcn) for search boxes, filters, and basic styling
 * @llm-rule ValidatedInput provides: validation, password strength, character counting, error states
 * @llm-rule Input provides: basic styling and controlled input behavior
 */