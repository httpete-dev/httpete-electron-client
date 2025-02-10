import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  overlay?: boolean;
}

const sizeClasses = {
  sm: {
    wrapper: 'w-16 h-16',
    outer: 'w-16 h-16',
    middle: 'w-10 h-10',
    inner: 'w-6 h-6',
    text: 'text-sm mt-20'
  },
  md: {
    wrapper: 'w-24 h-24',
    outer: 'w-24 h-24',
    middle: 'w-16 h-16',
    inner: 'w-8 h-8',
    text: 'text-base mt-28'
  },
  lg: {
    wrapper: 'w-32 h-32',
    outer: 'w-32 h-32',
    middle: 'w-20 h-20',
    inner: 'w-10 h-10',
    text: 'text-xl mt-40'
  }
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  overlay = false
}) => {
  const sizes = sizeClasses[size];
  
  const spinner = (
    <div className={cn("relative flex items-center justify-center", sizes.wrapper, className)}>
      {/* Largest circle - spins clockwise */}
      <div className={cn(
        "absolute border-4 border-primary border-t-transparent rounded-full animate-spin",
        sizes.outer
      )} />

      {/* Medium circle - spins counter-clockwise */}
      <div className={cn(
        "absolute border-4 border-primary border-t-transparent rounded-full animate-[spin_1s_linear_infinite_reverse]",
        sizes.middle
      )} />

      {/* Smallest circle - spins clockwise */}
      <div className={cn(
        "absolute border-4 border-primary border-t-transparent rounded-full animate-spin",
        sizes.inner
      )} />

      {/* Loading text */}
      <span className={cn("absolute text-primary", sizes.text)}>Loading...</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 