import { render, screen } from '@testing-library/react';
import TopControls from 'src/views/TopControls';

describe('TopControls', () => {
  const stub = {
    value: 'cotrol',
    onChange: () => {},
    onClick: () => Promise.resolve(),
    error: null,
  };
  it('should show Loader when isLoading prop true ', () => {
    render(
      <TopControls
        value={stub.value}
        onChange={stub.onChange}
        onClick={stub.onClick}
        isLoading={true}
        error={stub.error}
      />
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
  it('should hide loader when isLoading prop false', () => {
    render(
      <TopControls
        value={stub.value}
        onChange={stub.onChange}
        onClick={stub.onClick}
        isLoading={false}
        error={stub.error}
      />
    );
    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
  });
});
