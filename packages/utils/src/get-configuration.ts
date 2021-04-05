import { Empty, NullaryFn, TypeGuard, UnaryFn } from 'type-core';

export function getConfiguration<T>(
  reconfigure: T | UnaryFn<T, T> | Empty,
  fetcher: NullaryFn<T>
): T {
  if (TypeGuard.isFunction(reconfigure)) {
    return reconfigure(fetcher());
  }
  return reconfigure || fetcher();
}
