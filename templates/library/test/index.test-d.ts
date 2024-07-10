import { expectTypeOf, test } from 'vitest';

import { main } from '@/index';

test('returns Promise<any>', () => {
  expectTypeOf(main).toBeFunction();
  expectTypeOf(main()).resolves.toBeAny();
});
