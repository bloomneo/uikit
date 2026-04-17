/**
 * <Combobox> — searchable Select.
 * @module @bloomneo/uikit
 * @file src/components/ui/combobox.tsx
 *
 * @llm-rule WHEN: Searchable/filterable dropdowns with 10+ options (country, user, tag pickers)
 * @llm-rule AVOID: Using for static short lists — use <Select>. For action menus — use <DropdownMenu>
 * @llm-rule NOTE: Controlled: `value` + `onValueChange` — same shape as <Select>, <Slider>, <Tabs>, <Accordion>. Options: `{ value: string, label: string }[]`
 * @llm-rule NOTE: Props: `clearable`, `disabled`, `searchPlaceholder`, `emptyMessage`, `renderOption`
 * @llm-rule NOTE: Built on Command (cmdk) + Popover. The `onValueChange` receives `undefined` when the selection is cleared.
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 *
 * @example
 *   <Combobox
 *     value={country}
 *     onValueChange={setCountry}
 *     options={[
 *       { value: 'us', label: 'United States' },
 *       { value: 'in', label: 'India' },
 *     ]}
 *     placeholder="Select a country"
 *     searchPlaceholder="Search countries…"
 *   />
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
    /**
     * Called when the user picks an option. Receives `undefined` when the
     * selection is cleared via the X button (only available with
     * `clearable`) or by re-selecting the current value in `clearable` mode.
     *
     * Matches the `onValueChange` convention used by every other
     * Radix-backed single-value component (Select, Slider, Tabs,
     * Accordion). Unified with 2.0.0 — the pre-2.0 `onChange` prop is
     * gone; find-and-replace `onChange` → `onValueChange` on any Combobox.
     */
    onValueChange?: (value: string | undefined) => void;
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
export declare function Combobox({ value, onValueChange, options, placeholder, searchPlaceholder, emptyMessage, clearable, disabled, renderOption, className, contentWidth, }: ComboboxProps): React.JSX.Element;
//# sourceMappingURL=combobox.d.ts.map