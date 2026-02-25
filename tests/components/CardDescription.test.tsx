import { screen } from '@testing-library/react';
import CardDescription from 'components/CardDescription';
import { useOutletContext } from 'react-router';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import { renderWithRouter } from 'tests/test-utils/renderWithRoutes';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

describe('CardDescription', () => {
  it('should render CardDescription component', () => {
    vi.mocked(useOutletContext).mockReturnValue({ results: [mockPokemon] });
    renderWithRouter('spearow', <CardDescription />);
    screen.debug();
    const component = screen.getByText('spearow');
    expect(component).toBeInTheDocument();
  });
  it("should doesn't render component witch empty results", () => {
    vi.mocked(useOutletContext).mockReturnValue({ results: [] });
    renderWithRouter('spearow', <CardDescription />);
    screen.debug();
    const component = screen.queryByText('spearow');
    expect(component).not.toBeInTheDocument();
  });
});
