/**
 * tests/components/data-hooks.test.tsx — useQuery / useMutation against a
 * fake contract client (the shape of bloom's createClient()).
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import * as React from 'react';
import { useQuery, useMutation } from '@bloomneo/uikit/data';

const listPlans = { method: 'GET', path: '/api/plans' } as const;
const createPlan = { method: 'POST', path: '/api/plans' } as const;

function fakeClient(handler: (contract: any, input?: any) => any) {
  return { call: vi.fn(async (contract: any, input?: any) => handler(contract, input)) };
}

describe('useQuery', () => {
  it('loads on mount and exposes data', async () => {
    const client = fakeClient(() => ['free', 'pro']);
    function Plans() {
      const { data, loading } = useQuery(client, listPlans);
      return <p>{loading ? 'loading' : (data as string[]).join(',')}</p>;
    }
    render(<Plans />);
    expect(await screen.findByText('free,pro')).toBeTruthy();
    expect(client.call).toHaveBeenCalledTimes(1);
  });

  it('refetches when input changes by value, not by identity', async () => {
    const client = fakeClient((_c, input) => `page ${input.query.page}`);
    function Page({ page }: { page: number }) {
      const { data } = useQuery(client, listPlans, { query: { page } });
      return <p>{String(data ?? '')}</p>;
    }
    const { rerender } = render(<Page page={1} />);
    expect(await screen.findByText('page 1')).toBeTruthy();
    rerender(<Page page={1} />);
    rerender(<Page page={2} />);
    expect(await screen.findByText('page 2')).toBeTruthy();
    expect(client.call).toHaveBeenCalledTimes(2);
  });

  it('exposes the error and does not call when disabled', async () => {
    const failing = fakeClient(() => {
      throw new Error('No such plan');
    });
    function Broken() {
      const { error } = useQuery(failing, listPlans);
      return <p>{error?.message ?? ''}</p>;
    }
    render(<Broken />);
    expect(await screen.findByText('No such plan')).toBeTruthy();

    const idle = fakeClient(() => 'x');
    function Off() {
      const { loading } = useQuery(idle, listPlans, undefined, { enabled: false });
      return <p>{loading ? 'loading' : 'idle'}</p>;
    }
    render(<Off />);
    expect(await screen.findByText('idle')).toBeTruthy();
    expect(idle.call).not.toHaveBeenCalled();
  });
});

describe('useMutation', () => {
  it('calls on demand with the input and returns the response', async () => {
    const client = fakeClient((_c, input) => ({ id: 'p1', ...input.body }));
    let result: any;
    function Create() {
      const save = useMutation(client, createPlan);
      return (
        <button onClick={async () => (result = await save.mutate({ body: { name: 'team' } }))}>
          {save.loading ? 'saving' : 'save'}
        </button>
      );
    }
    render(<Create />);
    expect(client.call).not.toHaveBeenCalled();
    await act(async () => {
      screen.getByText('save').click();
    });
    await waitFor(() => expect(result).toEqual({ id: 'p1', name: 'team' }));
    expect(client.call).toHaveBeenCalledWith(createPlan, { body: { name: 'team' } });
  });
});
