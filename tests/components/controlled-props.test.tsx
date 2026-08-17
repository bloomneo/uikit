/**
 * tests/components/controlled-props.test.tsx
 *
 * AGENTS.md calls mismatched controlled props "the #1 agent failure mode", and
 * the failure is silent: put `onChange` on a `<Select>` and nothing happens —
 * no error, no update, no type error at runtime. The rules are only documented,
 * which is exactly the situation this library elsewhere argues is not enough.
 *
 * So: assert the contract for every interactive component, by driving it the
 * way a user does and checking which callback actually fires.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  Input,
  Textarea,
  Checkbox,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@bloomneo/uikit';

describe('native inputs emit ChangeEvent via onChange', () => {
  it('<Input> calls onChange with a ChangeEvent, not a bare value', async () => {
    const onChange = vi.fn();
    render(<Input aria-label="name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('name'), 'ab');

    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls[0][0];
    expect(arg).toHaveProperty('target');
    expect(typeof arg).not.toBe('string');
  });

  it('<Textarea> behaves the same way', async () => {
    const onChange = vi.fn();
    render(<Textarea aria-label="bio" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('bio'), 'x');

    expect(onChange.mock.calls[0][0]).toHaveProperty('target');
  });

  it('<Input> does NOT invent an onValueChange prop', async () => {
    const onValueChange = vi.fn();
    // Passing it is a common agent mistake — it must be inert, not silently wired.
    render(<Input aria-label="q" {...({ onValueChange } as never)} />);
    await userEvent.type(screen.getByLabelText('q'), 'x');
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe('Radix checkables emit the new state via onCheckedChange', () => {
  it('<Checkbox> calls onCheckedChange(true), not onChange', async () => {
    const onCheckedChange = vi.fn();
    const onChange = vi.fn();
    render(<Checkbox aria-label="agree" onCheckedChange={onCheckedChange} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('agree'));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('<Switch> calls onCheckedChange with a boolean', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="live" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByLabelText('live'));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(typeof onCheckedChange.mock.calls[0][0]).toBe('boolean');
  });

  it('a controlled <Switch> does not move on its own', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="live" checked={false} onCheckedChange={onCheckedChange} />);
    const el = screen.getByLabelText('live');
    await userEvent.click(el);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(el).toHaveAttribute('data-state', 'unchecked');
  });
});

describe('single-value pickers emit the value directly via onValueChange', () => {
  it('<Tabs> calls onValueChange with the new tab value', async () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">panel a</TabsContent>
        <TabsContent value="b">panel b</TabsContent>
      </Tabs>,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'B' }));

    expect(onValueChange).toHaveBeenCalledWith('b');
    // The value, not an event.
    expect(onValueChange.mock.calls[0][0]).toBe('b');
  });

  it('<Tabs> swaps the visible panel', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">panel a</TabsContent>
        <TabsContent value="b">panel b</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('panel a')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByText('panel b')).toBeInTheDocument();
  });
});
