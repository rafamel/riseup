import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';

import Page from './page';

test('renders without crashing (1)', () => {
  expect(() => render(<Page />)).not.toThrow();
});

test('renders without crashing (2)', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  expect(() => act(() => root.render(<Page />))).not.toThrow();
  act(() => root.unmount());
});
