import { useState } from 'react';
import { Combobox, type ComboboxOption } from '@bloomneo/uikit';

const COUNTRIES: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'in', label: 'India' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

export default function ComboboxExample() {
  const [country, setCountry] = useState<string | undefined>();

  return (
    <div className="max-w-xs">
      <Combobox
        value={country}
        onValueChange={setCountry}
        options={COUNTRIES}
        placeholder="Select a country"
        searchPlaceholder="Search countries…"
        clearable
      />
      {country && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {COUNTRIES.find((c) => c.value === country)?.label}
        </p>
      )}
    </div>
  );
}
