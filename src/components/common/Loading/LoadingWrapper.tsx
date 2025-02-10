import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
  className = '',
  spinnerSize = 'md'
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center w-full h-full min-h-[200px] ${className}`}>
        <LoadingSpinner size={spinnerSize} />
      </div>
    );
  }

  return <>{children}</>;
}; 