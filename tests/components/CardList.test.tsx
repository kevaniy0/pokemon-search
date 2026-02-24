import { render, screen } from '@testing-library/react';
import CardList from 'src/components/CardList';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import { MemoryRouter } from 'react-router';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
const createTestStore = (initialState = []) => {
  return configureStore({
    reducer: {
      pokemonCards: cardsReducer,
    },
    preloadedState: {
      pokemonCards: initialState,
    },
  });
};

describe('CardList', () => {
  const store = createTestStore();
  it('should render correct number of items', () => {
    const list = [mockPokemon, mockPokemon, mockPokemon];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={list} />
        </MemoryRouter>
      </Provider>
    );
    const cards = screen.getAllByText(mockPokemon.name);
    expect(cards).toHaveLength(3);
  });
  it('should show loading state while fetching data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={[mockPokemon]} isLoading={true} />
        </MemoryRouter>
      </Provider>
    );
    const wrapper = screen.getByTestId('loading-opacity');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('opacity-20');
  });
  it('should correct display name and description', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={[mockPokemon]} />
        </MemoryRouter>
      </Provider>
    );

    const name = screen.getByText(mockPokemon.name);
    expect(name).toHaveTextContent('spearow');
  });
  it('should display "no results" message when results array is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={[]} />
        </MemoryRouter>
      </Provider>
    );
    const noResults = screen.getByText(/no results/i);
    expect(noResults).toBeInTheDocument();
  });
});
