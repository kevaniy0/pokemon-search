import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from '@/services/pokemonAPI';
import { usePokemonData } from '@/hooks/usePokemonData';
import * as router from 'react-router';
import * as pokemonAPIHooks from '@/services/pokemonAPI';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/services/pokemonAPI', async () => {
  const actual = await vi.importActual('@/services/pokemonAPI');
  return {
    ...actual,
    useGetPokemonByPageQuery: vi.fn(),
    useGetPokemonsAllListQuery: vi.fn(),
  };
});
const createTestStore = () =>
  configureStore({
    reducer: {
      [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });

describe('usePokemonData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it('should filter and paginate results of search', () => {
    vi.mocked(router.useParams).mockReturnValue({});
    const mockSearchParams = new URLSearchParams('?search=cha&page=1');
    vi.mocked(router.useSearchParams).mockReturnValue([
      mockSearchParams,
      vi.fn(),
    ]);
    const allPokemons = {
      results: [
        { name: 'charmander' },
        { name: 'charmeleon' },
        { name: 'charizard' },
        { name: 'bulbasaur' },
        { name: 'ivysaur' },
      ],
    };
    vi.mocked(pokemonAPIHooks.useGetPokemonsAllListQuery).mockReturnValue({
      data: allPokemons,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });
    vi.mocked(pokemonAPIHooks.useGetPokemonByPageQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
    const { result } = renderHook(() => usePokemonData(), { wrapper });
    expect(result.current.data).toEqual({
      count: 3,
      results: [
        { name: 'charmander' },
        { name: 'charmeleon' },
        { name: 'charizard' },
      ],
    });
    expect(result.current.mode).toBe('Search');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchQuery).toBe('cha');
  });
  it('return null if showSearchPokemons.data is undefined', () => {
    vi.mocked(router.useParams).mockReturnValue({});
    const mockSearchParams = new URLSearchParams('?search=cha&page=1');
    vi.mocked(router.useSearchParams).mockReturnValue([
      mockSearchParams,
      vi.fn(),
    ]);

    vi.mocked(pokemonAPIHooks.useGetPokemonsAllListQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={createTestStore()}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    const { result } = renderHook(() => usePokemonData(), { wrapper });
    expect(result.current.data).toBeNull();
  });
});
