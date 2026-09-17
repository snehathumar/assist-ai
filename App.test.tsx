import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('LegalAssist AI Application', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
