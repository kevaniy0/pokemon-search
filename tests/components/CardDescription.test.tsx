import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardDescription from 'components/CardDescription';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { mockPokemon } from 'tests/__mocks__/pokemon';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

describe('CardDescription', () => {
  const mockNavigate = vi.fn();
  const mockPokemonData = mockPokemon;
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });
  it('should render CardDescription component', () => {
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({ results: [mockPokemon] });
    render(<CardDescription />);
    const component = screen.getByText('spearow');
    expect(component).toBeInTheDocument();
  });
  it('should not render component with empty results', () => {
    vi.mocked(useParams).mockReturnValue({ name: '' });
    vi.mocked(useOutletContext).mockReturnValue({ results: [] });
    render(<CardDescription />);
    const component = screen.queryByText('spearow');
    expect(component).not.toBeInTheDocument();
  });
  it('should navigate up one level when close button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({
      results: [mockPokemonData],
    });
    render(<CardDescription />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('..');
  });
  it('should redirect with useEffect when pokemon not found in results array', () => {
    vi.mocked(useParams).mockReturnValue({ name: 'test-not-found-name' });
    vi.mocked(useOutletContext).mockReturnValue({
      results: [mockPokemonData],
    });
    render(<CardDescription />);

    expect(mockNavigate).toHaveBeenCalledWith('..', { replace: true });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
