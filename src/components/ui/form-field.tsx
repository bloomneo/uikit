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
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { warnInDev } from '@/lib/errors';

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

export function FormField({
  label,
  helper,
  error,
  required,
  id: idProp,
  className,
  labelClassName,
  children,
}: FormFieldProps): React.JSX.Element {
  if (!children) {
    warnInDev('FormField', 'requires a child input element. Pass <Input />, <Textarea />, or <Combobox /> as children.', 'form-field');
  }

  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const helperId = helper ? id + '-helper' : undefined;
  const errorId = error ? id + '-error' : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  const child = React.cloneElement(children, {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  });

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className={cn('text-sm font-medium leading-none text-foreground', labelClassName)}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {child}
      {helper && !error && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* <PasswordInput>                                                            */
/* ------------------------------------------------------------------------- */

export interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof Input>, 'type'> {
  /** Optional accessible label for the show/hide button. */
  toggleLabel?: { show: string; hide: string };
}

/**
 * Password input with a built-in show/hide toggle. Forwards every other prop
 * (including refs, onChange, value) directly to the underlying <Input>.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { className, toggleLabel = { show: 'Show password', hide: 'Hide password' }, ...rest },
    ref
  ) {
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? toggleLabel.hide : toggleLabel.show}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
