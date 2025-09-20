import { render, screen } from '@testing-library/react';
import CardList from 'src/components/CardList';
import { mockPokemon } from 'tests/__mocks__/pokemon';

describe('CardList', () => {
  it('should render correct number of items', () => {
    const list = [mockPokemon, mockPokemon, mockPokemon];
    render(<CardList results={list} />);
    const cards = screen.getAllByText(mockPokemon.name);
    expect(cards).toHaveLength(3);
  });
  it('should show loading state while fetching data', () => {
    render(<CardList results={[mockPokemon]} isLoading={true} />);
    const wrapper = screen.getByText('name').closest('.cards-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('opacity-20');
  });
  it('should correct display name and description', () => {
    render(<CardList results={[mockPokemon]} />);

    const name = screen.getByText(mockPokemon.name);
    expect(name).toHaveTextContent('spearow');

    const abilities = mockPokemon.abilities.reduce((acc, current) => {
      return (acc ? acc + ', ' : '') + current.ability.name;
    }, '');
    const description = screen.getByText(abilities);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(abilities);
  });
  it('should display "no results" message when results array is empty', () => {
    render(<CardList results={[]} />);
    const noResults = screen.getByText(/no results/i);
    expect(noResults).toBeInTheDocument();
  });
});
