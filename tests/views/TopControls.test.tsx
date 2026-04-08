import { render, screen } from '@testing-library/react';
import TopControls from '@/views/TopControls';
import userEvent from '@testing-library/user-event';

describe('TopControls', () => {
  const defaultProps = {
    mode: 'AllPokemons' as const,
    onCloseSearch: vi.fn(),
    value: '',
    onChange: vi.fn(),
    onClick: vi.fn().mockResolvedValue(undefined),
    isFetching: false,
    error: undefined,
  };

  it('should show Loader when isFetching is true', () => {
    render(<TopControls {...defaultProps} isFetching={true} />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should hide loader when isFetching is false', () => {
    render(<TopControls {...defaultProps} isFetching={false} />);
    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('should show close button in Search mode', () => {
    render(<TopControls {...defaultProps} mode="Search" isFetching={false} />);
    const closeButton = screen.getByText('❌');
    expect(closeButton).toBeInTheDocument();
  });

  it('should not show close button in AllPokemons mode', () => {
    render(
      <TopControls {...defaultProps} mode="AllPokemons" isFetching={false} />
    );
    const closeButton = screen.queryByText('❌');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should not show close button when isFetching is true even in Search mode', () => {
    render(<TopControls {...defaultProps} mode="Search" isFetching={true} />);
    const closeButton = screen.queryByText('❌');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should call onCloseSearch when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<TopControls {...defaultProps} mode="Search" isFetching={false} />);
    const closeButton = screen.getByText('❌');
    await user.click(closeButton);
    expect(defaultProps.onCloseSearch).toHaveBeenCalled();
  });

  it('should render input with correct value', () => {
    render(<TopControls {...defaultProps} value="pikachu" />);
    const input = screen.getByPlaceholderText('type a pokemon name');
    expect(input).toHaveValue('pikachu');
  });

  it('should render Search button', () => {
    render(<TopControls {...defaultProps} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('should call onClick when Search button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn().mockResolvedValue(undefined);
    render(<TopControls {...defaultProps} onClick={onClick} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('should call onClick when Enter is pressed in input', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn().mockResolvedValue(undefined);
    render(<TopControls {...defaultProps} onClick={onClick} />);
    const input = screen.getByPlaceholderText('type a pokemon name');
    await user.type(input, 'pikachu{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('should display error message when error is provided', () => {
    render(
      <TopControls
        {...defaultProps}
        error={{ message: 'Network error', status: 500 }}
      />
    );
    const errorMessage = screen.getByText('Network error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display error message when error is undefined', () => {
    render(<TopControls {...defaultProps} error={undefined} />);
    const errorMessage = screen.queryByText(/Network error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
