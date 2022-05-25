import { test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

import Page from '../../pages/index';

test('renders without crashing (1)', () => {
  expect(() => render(<Page />)).not.toThrow();
});

test('renders without crashing (2)', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  expect(() => root.render(<Page />)).not.toThrow();
  root.unmount();
});
