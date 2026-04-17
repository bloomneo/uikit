/**
 * useApi example — data-fetching hook with loading, error, and manual call
 * triggers. Matches the canonical shape in llms.txt and AGENTS.md.
 *
 * @see src/hooks/useApi.ts — UseApiReturn<T>: { data, loading, error, call, get, post, put, delete, reset }
 *
 * Real usage: baseURL auto-detects from VITE_API_URL or localhost in dev.
 * Override via `useApi({ baseURL: 'https://api.example.com' })` when needed.
 */

import { useEffect } from 'react';
import { useApi, Button, Skeleton, toast } from '@bloomneo/uikit';

type User = { id: number; email: string; name: string };

export default function UseApiExample() {
  // Hook call — generic T flows through to `data` and every method.
  const users = useApi<User[]>();

  // GET on mount. `users.get(endpoint)` resolves with the response body,
  // but you usually don't need the return value — `users.data` updates.
  useEffect(() => {
    users.get('/api/users').catch((err) => {
      toast.error(`Failed to load users: ${err.message}`);
    });
  }, []);

  // POST example — creating a user on button click.
  async function createUser() {
    try {
      const u = await users.post<User>('/api/users', { email: 'x@y.com', name: 'Alice' });
      toast.success(`Created ${u.email}`);
      await users.get('/api/users'); // refetch the list
    } catch (err: any) {
      toast.error(`Create failed: ${err.message}`);
    }
  }

  // Loading: render a skeleton.
  if (users.loading && !users.data) {
    return <Skeleton className="h-40 w-full" />;
  }

  // Error: show the string. Pair with a retry button.
  if (users.error && !users.data) {
    return (
      <div className="p-4">
        <p className="text-destructive">Failed: {users.error}</p>
        <Button onClick={() => users.get('/api/users')}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <ul>
        {users.data?.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
      <Button onClick={createUser} disabled={users.loading}>
        {users.loading ? 'Creating…' : 'Create user'}
      </Button>
    </div>
  );
}
