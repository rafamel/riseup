import { expect, test } from 'vitest';

import { main } from '@/index';

test(`doesn't error`, async () => {
  await expect(main()).resolves.not.toThrow();
});
