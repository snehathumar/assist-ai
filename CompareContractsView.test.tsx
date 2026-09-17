
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CompareContractsView } from '../components/CompareContractsView';

describe('CompareContractsView Component', () => {
  it('renders inputs and labels correctly', () => {
    render(<CompareContractsView />);
    expect(screen.getByPlaceholderText(/Paste original contract draft/i)).toBeInTheDocument();
  });

  it('handles sample selection', () => {
    render(<CompareContractsView />);
    const sampleBtn = screen.getByText(/NDA: Mutual vs One-Sided/i);
    fireEvent.click(sampleBtn);
  });
});
