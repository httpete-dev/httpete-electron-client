import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByText('Loading...')).toHaveClass('text-sm');

    rerender(<LoadingSpinner size="md" />);
    expect(screen.getByText('Loading...')).toHaveClass('text-base');

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByText('Loading...')).toHaveClass('text-xl');
  });

  it('renders with overlay', () => {
    render(<LoadingSpinner overlay />);
    expect(screen.getByText('Loading...').parentElement?.parentElement)
      .toHaveClass('fixed inset-0 bg-background/50');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="test-class" />);
    expect(screen.getByText('Loading...').parentElement)
      .toHaveClass('test-class');
  });
}); 