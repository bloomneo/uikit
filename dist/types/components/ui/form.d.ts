/**
 * Unified Form System - Simple Components + React Hook Form Integration
 * @module @bloomneo/uikit
 * @file src/components/ui/form.tsx
 */
import * as React from 'react';
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function FormControl({ ...props }: React.ComponentProps<typeof Slot>): import("react/jsx-runtime").JSX.Element;
declare function FormDescription({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element;
declare function FormMessage({ className, ...props }: React.ComponentProps<"p">): import("react/jsx-runtime").JSX.Element | null;
/**
 * Validated Input - Form input with built-in validation and enhanced features
 */
export interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    showPasswordStrength?: boolean;
    showPasswordToggle?: boolean;
}
declare const ValidatedInput: React.ForwardRefExoticComponent<ValidatedInputProps & React.RefAttributes<HTMLInputElement>>;
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
declare const ValidatedTextarea: React.ForwardRefExoticComponent<ValidatedTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
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
    options: Array<{
        label: string;
        value: string;
        disabled?: boolean;
    }>;
    clearable?: boolean;
    className?: string;
}
declare const ValidatedSelect: React.ForwardRefExoticComponent<ValidatedSelectProps & React.RefAttributes<HTMLDivElement>>;
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
declare const ValidatedCheckbox: React.ForwardRefExoticComponent<ValidatedCheckboxProps & React.RefAttributes<HTMLDivElement>>;
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
declare const FormActions: React.ForwardRefExoticComponent<FormActionsProps & React.RefAttributes<HTMLDivElement>>;
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, ValidatedInput, ValidatedTextarea, ValidatedSelect, ValidatedCheckbox, FormActions, };
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
//# sourceMappingURL=form.d.ts.map