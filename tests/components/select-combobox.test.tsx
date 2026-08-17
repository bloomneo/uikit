/**
 * tests/components/select-combobox.test.tsx
 *
 * AGENTS.md names exactly two components in its #1 failure mode:
 *
 *   "Never use `onChange` on <Select> or <Combobox> — both use
 *    onValueChange(newValue). Using onChange fails silently."
 *
 * The first pass of these tests covered that contract using `<Tabs>` as a
 * stand-in for "single-value picker", which left the two components the
 * documentation actually names untested. Both are also the fiddliest things
 * here — Select is a Radix portal, Combobox is cmdk inside a Popover — so
 * "it renders and the callback fires" is worth pinning down.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Combobox,
} from '@bloomneo/uikit';

const OPTIONS = [
  { value: 'sky', label: 'Sky' },
  { value: 'teal', label: 'Teal' },
  { value: 'violet', label: 'Violet' },
];

describe('<Select>', () => {
  function Subject({ onValueChange }: { onValueChange?: (v: string) => void }) {
    return (
      <Select onValueChange={onValueChange}>
        <SelectTrigger aria-label="colour">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  it('renders the placeholder before anything is chosen', () => {
    render(<Subject />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('opens and calls onValueChange with the VALUE, not the label or an event', async () => {
    const onValueChange = vi.fn();
    render(<Subject onValueChange={onValueChange} />);

    await userEvent.click(screen.getByLabelText('colour'));
    await userEvent.click(await screen.findByText('Teal'));

    expect(onValueChange).toHaveBeenCalledWith('teal');
    expect(onValueChange.mock.calls[0][0]).toBe('teal'); // not 'Teal', not an event
  });

  it('ignores onChange — the documented silent failure', async () => {
    const onChange = vi.fn();
    render(
      <Select {...({ onChange } as never)}>
        <SelectTrigger aria-label="colour">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sky">Sky</SelectItem>
        </SelectContent>
      </Select>,
    );

    await userEvent.click(screen.getByLabelText('colour'));
    await userEvent.click(await screen.findByText('Sky'));

    // This is the whole point of the rule: no error, no update, nothing.
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows the chosen label in the trigger afterwards', async () => {
    render(<Subject />);
    await userEvent.click(screen.getByLabelText('colour'));
    await userEvent.click(await screen.findByText('Violet'));
    expect(screen.getByLabelText('colour')).toHaveTextContent('Violet');
  });
});

describe('<Combobox>', () => {
  it('calls onValueChange with the value when an option is picked', async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={OPTIONS} onValueChange={onValueChange} placeholder="Pick one" />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(await screen.findByText('Teal'));

    expect(onValueChange).toHaveBeenCalledWith('teal');
  });

  it('filters options as you type', async () => {
    render(<Combobox options={OPTIONS} placeholder="Pick one" />);
    await userEvent.click(screen.getByRole('combobox'));

    const search = await screen.findByPlaceholderText(/search/i);
    await userEvent.type(search, 'vio');

    expect(screen.getByText('Violet')).toBeInTheDocument();
    expect(screen.queryByText('Teal')).toBeNull();
  });

  it('shows the empty message when nothing matches', async () => {
    render(<Combobox options={OPTIONS} placeholder="Pick one" emptyMessage="No colours" />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.type(await screen.findByPlaceholderText(/search/i), 'zzz');

    expect(screen.getByText('No colours')).toBeInTheDocument();
  });

  it('ignores onChange, the same way Select does', async () => {
    const onChange = vi.fn();
    render(<Combobox options={OPTIONS} placeholder="Pick one" {...({ onChange } as never)} />);

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(await screen.findByText('Sky'));

    expect(onChange).not.toHaveBeenCalled();
  });
});
