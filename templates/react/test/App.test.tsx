import { test } from '@jest/globals';
import assert from 'assert';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from '../src/App';

test('renders without crashing (1)', () => {
  assert.doesNotThrow(() => render(<App />));
});

test('renders without crashing (2)', () => {
  const div = document.createElement('div');
  assert.doesNotThrow(() => ReactDOM.render(<App />, div));
  ReactDOM.unmountComponentAtNode(div);
});
