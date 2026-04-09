import { render, screen } from '@testing-library/react';
import CardList from '@/components/CardList';
import { mockPokemon, mockPokemonNames } from '../__mocks__/pokemon';
import { MemoryRouter, useNavigate, useParams } from 'react-router';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { pokemonAPI } from '@/services/pokemonAPI';
import * as pokemonAPIHooks from '@/services/pokemonAPI';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});
vi.mock('@/services/pokemonAPI', async () => {
  const actual = await vi.importActual('@/services/pokemonAPI');
  return {
    ...actual,
    useGetPokemonsByNamesQuery: vi.fn(),
  };
});

const createTestStore = (initialState: string[] = []) => {
  return configureStore({
    reducer: {
      pokemonCards: cardsReducer,
      [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    },
    preloadedState: {
      pokemonCards: initialState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

describe('CardList', () => {
  const mockNavigate = vi.fn();
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.resetAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({ page: '1' });
  });
  it('should not render component when data is undefined', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const cardList = screen.queryByTestId('loading-opacity');
    expect(cardList).not.toBeInTheDocument();
  });
  it('should render no results text if array is empty', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const results = screen.queryByText(/no results/i);
    expect(results).toBeInTheDocument();
  });
  it('should render correct number of items', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon, mockPokemon, mockPokemon],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const cards = screen.getAllByText(mockPokemon.name);
    expect(cards).toHaveLength(3);
  });
  it('should show loading state while fetching data', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon, mockPokemon, mockPokemon],
      error: undefined,
      isLoading: true,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const wrapper = screen.getByTestId('skeleton-card-list-test');
    expect(wrapper).toBeInTheDocument();
  });
  it('should correct display name and description', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );

    const name = screen.getByText(mockPokemon.name);
    expect(name).toHaveTextContent('spearow');
  });
  it('should display "no results" message when results array is empty', () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={[]} />
        </MemoryRouter>
      </Provider>
    );
    const noResults = screen.getByText(/no results/i);
    expect(noResults).toBeInTheDocument();
  });
  it('should correct navigate to pokemon card when card is clicked if AllPokemons mode', async () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="AllPokemons" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByText(mockPokemon.name);
    await user.click(card);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/home/1/pokemon/${mockPokemon.name}`
    );
  });
  it('should correct navigate to pokemon card when card is clicked if search mode', async () => {
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon],
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/home?search=spearow&page=1`]}>
          <CardList mode="Search" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByText(mockPokemon.name);
    await user.click(card);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `pokemon/${mockPokemon.name}?search=${mockPokemon.name}&page=1`,
      { relative: 'path' }
    );
  });
  it('should render fallback UI when get error', () => {
    const mockError: FetchBaseQueryError = {
      status: 404,
      data: { message: 'Pokemon not found' },
    };
    vi.mocked(pokemonAPIHooks.useGetPokemonsByNamesQuery).mockReturnValue({
      data: [mockPokemon],
      error: mockError,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList mode="Search" results={mockPokemonNames} />
        </MemoryRouter>
      </Provider>
    );
    const fallback = screen.getByRole('img');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('alt', 'error-response');
  });
});
