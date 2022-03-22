import { test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';

import Page from '../../src/pages/index';

test('renders without crashing (1)', () => {
  expect(() => render(<Page />)).not.toThrow();
});

test('renders without crashing (2)', () => {
  const div = document.createElement('div');
  expect(() => ReactDOM.render(<Page />, div)).not.toThrow();
  ReactDOM.unmountComponentAtNode(div);
});
