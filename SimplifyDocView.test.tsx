
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimplifyDocView } from '../components/SimplifyDocView';

describe('SimplifyDocView Component', () => {
  const defaultProps = {
    documentText: "Sample text",
    setDocumentText: vi.fn(),
    language: "English" as any,
    readingLevel: "everyday" as any,
    onSelectClauseToClarify: vi.fn(),
    result: {
      riskScore: 75,
      summary: "Test summary",
      keyObligations: ["Obligation 1"],
      redFlags: ["Flag 1"],
      clauses: [{ original: "Original", simplified: "Simplified", isRedFlag: true }]
    },
    setResult: vi.fn(),
    isLoading: false,
    setIsLoading: vi.fn(),
    error: null,
    setError: vi.fn(),
  };

  it('renders correctly', () => {
    render(<SimplifyDocView {...defaultProps} />);
    expect(screen.getByText(/Risk Score/i)).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<SimplifyDocView {...defaultProps} isLoading={true} />);
    expect(screen.getByText(/AI is analyzing/i)).toBeInTheDocument();
  });

  it('handles error state', () => {
    render(<SimplifyDocView {...defaultProps} error="Analysis failed" />);
    expect(screen.getByText(/Analysis failed/i)).toBeInTheDocument();
  });

  it('simulates analyze button click', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, headers: { get: () => 'application/json' }, json: async () => ({}) });
    render(<SimplifyDocView {...defaultProps} result={null} />);
    const btn = screen.getByText(/Simplify & Scan Document/i);
    fireEvent.click(btn);
    await waitFor(() => {
      expect(defaultProps.setIsLoading).toHaveBeenCalledWith(true);
    });
  });
});
