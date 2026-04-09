import HomePage from '@/pages/Home';
import { render, screen, waitFor } from '@testing-library/react';
import { mockPokemon } from '../__mocks__/pokemon';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { pokemonAPI } from '@/services/pokemonAPI';
import { MemoryRouter, useParams, useNavigate } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { usePokemonData } from '@/hooks/usePokemonData';
import type { usePokemonDataResults } from '@/hooks/usePokemonData';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});
vi.mock('@/hooks/usePokemonData', () => ({
  usePokemonData: vi.fn(),
}));

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

describe('HomePage', () => {
  let store: ReturnType<typeof createTestStore>;
  const defaultMockData: usePokemonDataResults = {
    data: {
      count: 22,
      results: [
        { name: 'bulbasaur', url: 'dasdasdas' },
        { name: 'ivysaur', url: 'dasdasdas' },
        { name: 'venusaur', url: 'dasdasdas' },
        { name: 'spearow4', url: 'dasdasdas' },
        { name: 'spearow5', url: 'dasdasdas' },
        { name: 'spearow6', url: 'dasdasdas' },
        { name: 'spearow7', url: 'dasdasdas' },
        { name: 'spearow8', url: 'dasdasdas' },
        { name: 'spearow9', url: 'dasdasdas' },
      ],
    },
    mode: 'AllPokemons',
    isLoading: false,
    isFetching: false,
    error: undefined,
    currentPage: 1,
    searchQuery: '',
  };
  let mockNavigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    store = createTestStore();
    vi.resetAllMocks();
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useParams).mockReturnValue({ page: '1' });
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      currentPage: 1,
      searchQuery: '',
    });
  });

  it('should display previous saved search item from localStorage on mount', async () => {
    localStorage.setItem('PokemonSearchitem', mockPokemon.name);
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const input = await waitFor(() =>
      screen.getByDisplayValue(mockPokemon.name)
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockPokemon.name);
  });

  it('should display empty input value if localStorage is clear', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const input = await waitFor(() =>
      screen.getByPlaceholderText(/type a pokemon name/i)
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should update input value when user types something', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const input = await waitFor(() =>
      screen.getByPlaceholderText(/type a pokemon name/i)
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    await userEvent.type(input, 'testing-input');
    expect(input).toHaveValue('testing-input');
  });

  it('should navigate to /home/1 when currentPage and searchQuery are empty', async () => {
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      currentPage: 0,
      searchQuery: '',
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home/1');
    });
  });

  it('should render SkeletonCardList when isLoading is true', async () => {
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      isLoading: true,
      data: null,
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const skeleton = await waitFor(() =>
      screen.getByTestId('skeleton-card-list-test')
    );
    expect(skeleton).toBeInTheDocument();
  });

  it('should render Results when data is available', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const pagination = await waitFor(() =>
      screen.getByTestId('pagination-component')
    );
    expect(pagination).toBeInTheDocument();
  });

  it('should render empty fragment when no data and not loading', async () => {
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      data: null,
      isLoading: false,
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const pagination = screen.queryByTestId('pagination-component');
    expect(pagination).not.toBeInTheDocument();
    const skeleton = screen.queryByTestId('skeleton-card-list-test');
    expect(skeleton).not.toBeInTheDocument();
  });

  it('should call navigate with correct path in AllPokemons mode on page change', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const pagination = await waitFor(() =>
      screen.getByTestId('pagination-component')
    );
    expect(pagination).toBeInTheDocument();
    const page2Button = screen.getByText('2');
    await userEvent.click(page2Button);
    expect(mockNavigate).toHaveBeenCalledWith('/home/2');
  });

  it('should call navigate with correct path in Search mode on page change', async () => {
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      mode: 'Search',
      searchQuery: 'pikachu',
      currentPage: 1,
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/home?search=pikachu&page=1']}>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const pagination = await waitFor(() =>
      screen.getByTestId('pagination-component')
    );
    expect(pagination).toBeInTheDocument();
    const page2Button = screen.getByText('2');
    await userEvent.click(page2Button);
    expect(mockNavigate).toHaveBeenCalledWith('/home?search=pikachu&page=2');
  });

  it('should save to localStorage and navigate on search', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const input = await waitFor(() =>
      screen.getByPlaceholderText(/type a pokemon name/i)
    );
    await userEvent.type(input, 'pikachu');
    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);
    expect(localStorage.getItem('PokemonSearchitem')).toBe('pikachu');
    expect(mockNavigate).toHaveBeenCalledWith('/home?search=pikachu&page=1');
  });

  it('should not navigate on search with empty input', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should clear localStorage and navigate to /home/1 on close search', async () => {
    localStorage.setItem('PokemonSearchitem', 'pikachu');
    vi.mocked(usePokemonData).mockReturnValue({
      ...defaultMockData,
      mode: 'Search',
      searchQuery: 'pikachu',
      currentPage: 1,
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/home?search=pikachu&page=1']}>
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const closeButton = await waitFor(() => screen.getByText('❌'));
    await userEvent.click(closeButton);
    expect(localStorage.getItem('PokemonSearchitem')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/home/1');
  });
});
