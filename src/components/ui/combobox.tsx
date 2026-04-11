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
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

export function Combobox({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyMessage = 'No results.',
  clearable = false,
  disabled = false,
  renderOption,
  className,
  contentWidth = 'trigger',
}: ComboboxProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  const handleSelect = (next: string) => {
    if (next === value && clearable) {
      onChange?.(undefined);
    } else {
      onChange?.(next);
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            'w-full justify-between font-normal',
            !selected && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {clearable && selected && !disabled && (
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear selection"
                onClick={handleClear}
                className="inline-flex size-4 items-center justify-center rounded text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </span>
            )}
            <ChevronsUpDown className="size-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0', contentWidth === 'trigger' && 'w-[var(--radix-popover-trigger-width)]')}
        style={contentWidth !== 'trigger' && contentWidth !== 'auto' ? { width: contentWidth } : undefined}
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center justify-between gap-2"
                  >
                    {renderOption ? (
                      renderOption(option, isSelected)
                    ) : (
                      <>
                        <span className="truncate">{option.label}</span>
                        <Check
                          className={cn(
                            'size-4 shrink-0',
                            isSelected ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
