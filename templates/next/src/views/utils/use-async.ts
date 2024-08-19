/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

export type UseAsyncResponse<T> =
  | { success: null; value: null; error: null; loading: boolean }
  | { success: true; value: T; error: null; loading: boolean }
  | { success: false; value: null; error: unknown; loading: boolean };

export function useAsync<T>(
  cb: () => Promise<T> | T,
  deps: any[] = []
): UseAsyncResponse<T> {
  const loadingId = useRef(0);
  const resultId = useRef(0);
  const [response, setResponse] = useState<UseAsyncResponse<T>>({
    success: null,
    value: null,
    error: null,
    loading: false
  });

  useEffect(() => {
    const fetch = async () => {
      loadingId.current++;
      const id = loadingId.current;

      if (!response.loading) setResponse({ ...response, loading: true });
      try {
        const res = await cb();
        if (id > resultId.current) {
          resultId.current = id;
          setResponse({
            success: true,
            value: res,
            error: null,
            loading: id !== loadingId.current
          });
        }
      } catch (err) {
        if (id > resultId.current) {
          resultId.current = id;
          setResponse({
            success: false,
            value: null,
            error: err,
            loading: id !== loadingId.current
          });
        }
      }
    };

    fetch();
  }, deps);

  return response;
}
