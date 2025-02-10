import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingWrapper } from '../LoadingWrapper';

describe('LoadingWrapper', () => {
  it('renders children when not loading', () => {
    render(
      <LoadingWrapper isLoading={false}>
        <div>Test content</div>
      </LoadingWrapper>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders loading spinner when loading', () => {
    render(
      <LoadingWrapper isLoading={true}>
        <div>Test content</div>
      </LoadingWrapper>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('applies custom className when loading', () => {
    const customClass = 'custom-class';
    render(
      <LoadingWrapper isLoading={true} className={customClass}>
        <div>Test content</div>
      </LoadingWrapper>
    );
    expect(screen.getByText('Loading...').parentElement?.parentElement)
      .toHaveClass(customClass);
  });

  it('passes spinnerSize prop to LoadingSpinner', () => {
    render(
      <LoadingWrapper isLoading={true} spinnerSize="sm">
        <div>Test content</div>
      </LoadingWrapper>
    );
    expect(screen.getByText('Loading...')).toHaveClass('text-sm');
  });
}); 