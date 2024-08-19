import { clsx } from 'clsx';

export function cx(...classes: Array<string | null>): string {
  return clsx(classes);
}
