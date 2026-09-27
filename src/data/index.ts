/**
 * @bloomneo/uikit/data — React hooks for route contracts.
 *
 * @llm-rule WHEN: A page reads or writes data through a route contract (defineRoute from @bloomneo/bloom)
 * @llm-rule AVOID: useEffect + fetch per page, or useApi for routes that have contracts
 * @llm-rule NOTE: Pass the client from createClient() in @bloomneo/bloom; types come from the contract
 *
 * ```tsx
 * import { useQuery, useMutation } from '@bloomneo/uikit/data';
 *
 * const invoices = useQuery(api, listInvoices);                 // data typed from the contract
 * const save = useMutation(api, createInvoice);
 * await save.mutate({ body: { total: 5 } });
 * ```
 *
 * Contracts are read structurally (method, path, schemas), so uikit has no
 * dependency on bloom.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

/** Standard Schema v1 output type, read structurally. */
interface SchemaLike<Output = unknown> {
  readonly '~standard': { readonly types?: { readonly output: Output } };
}

/** The parts of a route contract the hooks use. */
export interface ContractLike {
  readonly method: string;
  readonly path: string;
  readonly response?: SchemaLike;
}

/** The response type a contract declares (unknown when it declares none). */
export type ResponseOf<C> = C extends { response: SchemaLike<infer O> } ? O : unknown;

/** Anything with the shape of bloom's createClient(): `call(contract, input)`. */
export interface ClientLike {
  call(contract: any, ...input: any[]): Promise<any>;
}

export interface QueryState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  /** Run the request again (e.g. after a mutation). */
  refetch: () => Promise<T | undefined>;
}

export interface QueryOptions {
  /** Skip the request until true (e.g. while a param is missing). Default true. */
  enabled?: boolean;
}

/**
 * Load a contract's data when the component mounts and whenever `input`
 * changes (compared by value).
 */
export function useQuery<C extends ContractLike>(
  client: ClientLike,
  contract: C,
  input?: unknown,
  options: QueryOptions = {},
): QueryState<ResponseOf<C>> {
  const enabled = options.enabled ?? true;
  const [data, setData] = useState<ResponseOf<C> | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(enabled);
  // Only the latest request may write state: a slow earlier answer must not
  // overwrite a newer one.
  const latest = useRef(0);
  const key = JSON.stringify(input ?? null);

  const run = useCallback(async () => {
    const id = ++latest.current;
    setLoading(true);
    setError(undefined);
    try {
      const result = (await (input === undefined ? client.call(contract) : client.call(contract, input))) as ResponseOf<C>;
      if (id === latest.current) setData(result);
      return result;
    } catch (err) {
      if (id === latest.current) setError(err instanceof Error ? err : new Error(String(err)));
      return undefined;
    } finally {
      if (id === latest.current) setLoading(false);
    }
    // `key` stands in for `input` so a new object with the same value doesn't refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, contract, key]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    void run();
  }, [run, enabled]);

  return { data, error, loading, refetch: run };
}

export interface MutationState<C extends ContractLike> {
  /** Call the route. Resolves with the response; rejects with the error. */
  mutate: (input?: unknown) => Promise<ResponseOf<C>>;
  data: ResponseOf<C> | undefined;
  error: Error | undefined;
  loading: boolean;
}

/** Call a contract on demand (create, update, delete). */
export function useMutation<C extends ContractLike>(client: ClientLike, contract: C): MutationState<C> {
  const [data, setData] = useState<ResponseOf<C> | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async (input?: unknown) => {
      setLoading(true);
      setError(undefined);
      try {
        const result = (await (input === undefined ? client.call(contract) : client.call(contract, input))) as ResponseOf<C>;
        setData(result);
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [client, contract],
  );

  return { mutate, data, error, loading };
}
