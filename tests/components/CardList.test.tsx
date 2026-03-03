import { render, screen } from '@testing-library/react';
import CardList from 'src/components/CardList';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import { MemoryRouter, useNavigate } from 'react-router';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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
  const mockNavigate = vi.fn();
  const store = createTestStore();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });
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
  it('should navigate to pokemon card when card is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList results={[mockPokemon]} />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByText(mockPokemon.name);
    await user.click(card);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`pokemon/${mockPokemon.name}`);
  });
});
