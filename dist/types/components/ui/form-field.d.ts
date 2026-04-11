/**
 * <FormField> — the canonical label/input/error/helper wrapper.
 *
 * Handles the boring parts every form needs and gets wrong half the time:
 *
 *   • generates a stable id and wires `htmlFor` / `aria-describedby` / `aria-invalid`
 *   • renders the error message in a `role="alert"` region
 *   • supports a "required" indicator
 *   • clones the child input and merges the wired props automatically
 *
 * @example
 *   <FormField label="Email" required error={errors.email} helper="We'll never share it">
 *     <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
 *   </FormField>
 *
 * Designed to compose cleanly with the existing react-hook-form `<Form />`
 * primitives in this package — pass `<Input {...register('email')} />` as the
 * child and FormField will wire ARIA correctly without you doing a thing.
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