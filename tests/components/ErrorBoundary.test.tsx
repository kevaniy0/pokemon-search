import { render, screen } from '@testing-library/react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import React from 'react';

class ProblemChild extends React.Component {
  render(): React.ReactNode {
    throw new Error('test error');
    return <div></div>;
  }
}

describe('ErrorBoundary', () => {
  it('should render fallbackUI', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    screen.debug();
  });
  it('should log error in console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
    const errorArg = consoleSpy.mock.calls[0][1];
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe('test error');
    consoleSpy.mockRestore();
  });
});
