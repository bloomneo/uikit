/**
 * <Combobox> — searchable Select.
 *
 * For dropdowns with more than ~20 options where typing-to-filter beats
 * scrolling. Built on the existing Command (cmdk) + Popover primitives so it
 * doesn't add new dependencies.
 *
 * The API is intentionally close to <Select>:
 *
 *   <Combobox
 *     value={country}
 *     onChange={setCountry}
 *     options={[
 *       { value: 'us', label: 'United States' },
 *       { value: 'in', label: 'India' },
 *       { value: 'uk', label: 'United Kingdom' },
 *     ]}
 *     placeholder="Select a country"
 *     searchPlaceholder="Search countries…"
 *   />
 *
 * Pass `clearable` to allow setting back to undefined. Pass `disabled` to
 * lock. Pass `renderOption` if you need icons / two-line entries.
 */
import * as React from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    /** Disable this specific option. */
    disabled?: boolean;
}
export interface ComboboxProps {
    /** Currently-selected value, or undefined for "no selection". */
    value?: string;
    /** Called when the user picks an option. Receives undefined when cleared. */
    onChange?: (value: string | undefined) => void;
    /** The full list of options. */
    options: ComboboxOption[];
    /** Placeholder shown in the trigger when no value is selected. */
    placeholder?: string;
    /** Placeholder for the search input inside the popover. */
    searchPlaceholder?: string;
    /** Text shown when the search finds no results. */
    emptyMessage?: string;
    /** Allow the user to clear the selection (shows an X button). */
    clearable?: boolean;
    /** Disable the entire combobox. */
    disabled?: boolean;
    /** Custom option renderer. Receives the option and the selected state. */
    renderOption?: (option: ComboboxOption, isSelected: boolean) => React.ReactNode;
    /** Class name on the trigger button. */
    className?: string;
    /** Width of the popover content. Default: matches the trigger. */
    contentWidth?: 'trigger' | 'auto' | string;
}
export declare function Combobox({ value, onChange, options, placeholder, searchPlaceholder, emptyMessage, clearable, disabled, renderOption, className, contentWidth, }: ComboboxProps): React.JSX.Element;
//# sourceMappingURL=combobox.d.ts.map