import { pokemonAPI } from '@/services/pokemonAPI';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardDescription from 'components/CardDescription';
import { Provider } from 'react-redux';
import * as pokemonAPIHooks from '@/services/pokemonAPI';
import {
  MemoryRouter,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router';
import { mockPokemon } from '../__mocks__/pokemon';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});
vi.mock('@/services/pokemonAPI', async () => {
  const actual = await vi.importActual('@/services/pokemonAPI');
  return {
    ...actual,
    useGetPokemonByNameQuery: vi.fn(),
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

describe('CardDescription', () => {
  const mockNavigate = vi.fn();
  const mockPokemonData = mockPokemon;
  let store: ReturnType<typeof createTestStore>;
  const user = userEvent.setup();
  beforeEach(() => {
    store = createTestStore();
    vi.resetAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });
  it('should render CardDescription component', () => {
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({ results: [mockPokemon] });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );
    const component = screen.getByText('spearow');
    expect(component).toBeInTheDocument();
  });
  it('should not render component with empty results', () => {
    vi.mocked(useParams).mockReturnValue({ name: '' });
    vi.mocked(useOutletContext).mockReturnValue({ results: [] });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: '',
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );
    const component = screen.queryByText('spearow');
    expect(component).not.toBeInTheDocument();
  });
  it('should navigate up one level when close button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({
      results: [mockPokemonData],
    });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('..');
  });
  it('should show fallback ui when error is true', () => {
    const mockError: FetchBaseQueryError = {
      status: 404,
      data: { message: 'Pokemon not found' },
    };
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({ results: [mockPokemon] });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: mockError,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );
    const message = screen.queryByText('Pokemon not found');
    expect(message).toBeInTheDocument();
  });
  it('should correct navigate when clicked on close button', async () => {
    vi.mocked(useParams).mockReturnValue({ name: mockPokemonData.name });
    vi.mocked(useOutletContext).mockReturnValue({ results: [mockPokemon] });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/pokemon/spearow?search=pikachu&page=2']}
        >
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/home?search=pikachu&page=2');
  });
  it('should render nothing when data is undefined', () => {
    vi.mocked(useParams).mockReturnValue({ name: 'spearow' });
    vi.mocked(useOutletContext).mockReturnValue({ results: [] });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/spearow/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-description')).not.toBeInTheDocument();
  });
  it('should apply blur for background when isLoading is true', () => {
    vi.mocked(useParams).mockReturnValue({ name: 'spearow' });
    vi.mocked(useOutletContext).mockReturnValue({ isLoading: true });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );

    const cardDiv = screen.queryByTestId('card-description-test');
    expect(cardDiv).toHaveClass('opacity-20');
    expect(cardDiv).not.toHaveClass('opacity-100');
  });

  it('should not apply blur for background when isLoading is false', () => {
    vi.mocked(useParams).mockReturnValue({ name: 'spearow' });
    vi.mocked(useOutletContext).mockReturnValue({ isLoading: false });
    vi.mocked(pokemonAPIHooks.useGetPokemonByNameQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardDescription />
        </MemoryRouter>
      </Provider>
    );

    const cardDiv = screen.queryByTestId('card-description-test');
    expect(cardDiv).toHaveClass('opacity-100');
    expect(cardDiv).not.toHaveClass('opacity-20');
  });
});
