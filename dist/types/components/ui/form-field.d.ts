/**
 * <FormField> — the canonical label/input/error/helper wrapper.
 * @module @bloomneo/uikit
 * @file src/components/ui/form-field.tsx
 *
 * @llm-rule WHEN: Wrapping any form input (Input, Textarea, Combobox, Select) with label + error + a11y
 * @llm-rule AVOID: Using bare <Label> + <Input> combos — FormField wires htmlFor, aria-describedby, aria-invalid automatically
 * @llm-rule NOTE: Props: `label` (required string), `error` (string), `helper` (string), `required` (boolean)
 * @llm-rule NOTE: Clones child input and merges `id`, `aria-invalid`, `aria-describedby` automatically
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 *
 * @example
 *   <FormField label="Email" required error={errors.email} helper="We'll never share it">
 *     <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
 *   </FormField>
 */
import * as React from 'react';
import { Input } from '@/components/ui/input';
export interface FormFieldProps {
    /** Required label text. */
    label: string;
    /** Optional helper / description rendered below the input. */
    helper?: React.ReactNode;
    /** Error message. When present the input is marked aria-invalid. */
    error?: React.ReactNode;
    /** Mark the field as required (shows a red asterisk after the label). */
    required?: boolean;
    /** Pre-generated id. Defaults to React.useId(). */
    id?: string;
    /** Optional class on the wrapper. */
    className?: string;
    /** Optional class on the label. */
    labelClassName?: string;
    /** The actual input. Cloned with `id`, `aria-*` props merged in. */
    children: React.ReactElement<{
        id?: string;
        'aria-invalid'?: boolean;
        'aria-describedby'?: string;
    }>;
}
export declare function FormField({ label, helper, error, required, id: idProp, className, labelClassName, children, }: FormFieldProps): React.JSX.Element;
export interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type'> {
    /** Optional accessible label for the show/hide button. */
    toggleLabel?: {
        show: string;
        hide: string;
    };
}
/**
 * Password input with a built-in show/hide toggle. Forwards every other prop
 * (including refs, onChange, value) directly to the underlying <Input>.
 */
export declare const PasswordInput: React.ForwardRefExoticComponent<Omit<PasswordInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=form-field.d.ts.map