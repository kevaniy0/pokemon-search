import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI, limitPerPage } from '@/services/pokemonAPI';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

const { mockBaseQuery, mockPokemonResponse, mockPokemonListResponse } =
  vi.hoisted(() => ({
    mockBaseQuery: vi.fn().mockResolvedValue({
      data: {
        count: 1,
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        ],
      },
    }),
    mockPokemonResponse: {
      name: 'pikachu',
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.svg',
          },
        },
      },
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      height: 4,
      weight: 60,
    },
    mockPokemonListResponse: {
      count: 1,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    },
  }));

vi.mock('@reduxjs/toolkit/query/react', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit/query/react');
  return {
    ...actual,
    fetchBaseQuery: () => mockBaseQuery,
  };
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('pokemonAPI', () => {
  beforeEach(() => {
    mockBaseQuery.mockResolvedValue({ data: mockPokemonListResponse });
  });

  it('should have correct reducerPath', () => {
    expect(pokemonAPI.reducerPath).toBe('pokemonAPI');
  });

  it('should export limitPerPage constant', () => {
    expect(limitPerPage).toBe(12);
  });

  it('should have getPokemonByName endpoint', () => {
    const endpoint = pokemonAPI.endpoints.getPokemonByName;
    expect(endpoint).toBeDefined();
    expect(endpoint.name).toBe('getPokemonByName');
  });

  it('should have getPokemonsByNames endpoint', () => {
    const endpoint = pokemonAPI.endpoints.getPokemonsByNames;
    expect(endpoint).toBeDefined();
    expect(endpoint.name).toBe('getPokemonsByNames');
  });

  it('should have getPokemonsAllList endpoint', () => {
    const endpoint = pokemonAPI.endpoints.getPokemonsAllList;
    expect(endpoint).toBeDefined();
    expect(endpoint.name).toBe('getPokemonsAllList');
  });

  it('should have getPokemonByPage endpoint', () => {
    const endpoint = pokemonAPI.endpoints.getPokemonByPage;
    expect(endpoint).toBeDefined();
    expect(endpoint.name).toBe('getPokemonByPage');
  });

  it('should export hooks from pokemonAPI', () => {
    const {
      useGetPokemonByNameQuery,
      useGetPokemonByPageQuery,
      useGetPokemonsAllListQuery,
      useGetPokemonsByNamesQuery,
    } = pokemonAPI;

    expect(useGetPokemonByNameQuery).toBeDefined();
    expect(useGetPokemonByPageQuery).toBeDefined();
    expect(useGetPokemonsAllListQuery).toBeDefined();
    expect(useGetPokemonsByNamesQuery).toBeDefined();
  });

  it('should fetch pokemon list via getPokemonsAllList (covers transformResponse)', async () => {
    const { useGetPokemonsAllListQuery } = pokemonAPI;
    const { result } = renderHook(() => useGetPokemonsAllListQuery(undefined), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.results).toBeDefined();
  });

  it('should fetch pokemon by page via getPokemonByPage (covers query and transformResponse)', async () => {
    const { useGetPokemonByPageQuery } = pokemonAPI;
    const { result } = renderHook(() => useGetPokemonByPageQuery(1), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.results).toBeDefined();
  });

  it('should fetch pokemons by names and dispatch upsertQueryData (covers lines 31-37)', async () => {
    mockBaseQuery.mockResolvedValue({ data: mockPokemonResponse });

    const { useGetPokemonsByNamesQuery } = pokemonAPI;
    const { result } = renderHook(
      () => useGetPokemonsByNamesQuery(['pikachu']),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });
});
