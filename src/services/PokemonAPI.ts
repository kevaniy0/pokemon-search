import type { Data, DataList, Pokemon } from '@/types/pokemon';
import extractData from '@/utils/extractData';
import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
const url = 'https://pokeapi.co/api/v2/';
export const limitPerPage = 12;

export const pokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: Data) => extractData(response),
    }),
    getPokemonsByNames: builder.query<Pokemon[], string[]>({
      async queryFn(names, _queryApi, _extraOptions, baseQuery) {
        try {
          if (names.length === 0) return { data: [] };
          const results = await Promise.all(
            names.map((name) => baseQuery(`pokemon/${name}`))
          );
          const data = results.map((res) => {
            if (res.error) throw res.error;
            return extractData(res.data as Data);
          });
          data.forEach((pokemon) => {
            _queryApi.dispatch(
              pokemonAPI.util.upsertQueryData(
                'getPokemonByName',
                pokemon.name,
                pokemon
              )
            );
          });
          return { data };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
    getPokemonsAllList: builder.query<DataList, undefined>({
      query: () => `pokemon?limit=100000&offset=0`,
      transformResponse: (response: DataList) => {
        return response;
      },
    }),
    getPokemonByPage: builder.query<DataList, number>({
      query: (page: number) =>
        `pokemon?limit=${limitPerPage}&offset=${page * limitPerPage}`,
      transformResponse: async (response: DataList) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByPageQuery,
  useGetPokemonsAllListQuery,
  useGetPokemonsByNamesQuery,
} = pokemonAPI;
