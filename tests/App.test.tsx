import { render, screen } from '@testing-library/react';
import App from '@/App';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { pokemonAPI } from '@/services/PokemonAPI';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import * as usePokemonDataModule from '@/hooks/usePokemonData';

vi.mock('@/hooks/usePokemonData', () => ({
  usePokemonData: vi.fn(),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      pokemonCards: cardsReducer,
      [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

describe('App', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.resetAllMocks();
    vi.mocked(usePokemonDataModule.usePokemonData).mockReturnValue({
      data: { count: 0, results: [] },
      mode: 'AllPokemons',
      isLoading: false,
      isFetching: false,
      error: undefined,
      currentPage: 1,
      searchQuery: '',
    });
  });

  const renderApp = (initialEntries: string[]) => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('should render Header component', () => {
    renderApp(['/home/1']);
    expect(screen.getByText('Pokémon Search')).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    renderApp(['/home/1']);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should redirect from / to /home', () => {
    renderApp(['/']);
    expect(screen.getByText('Pokémon Search')).toBeInTheDocument();
  });

  it('should render HomePage on /home route', () => {
    renderApp(['/home/1']);
    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();
  });

  it('should render AboutPage on /about route', () => {
    renderApp(['/about']);
    expect(screen.getByText(/how to use/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage on unknown route', () => {
    renderApp(['/unknown-route']);
    expect(screen.getByAltText('not found pic')).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });
});
