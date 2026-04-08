import {
  limitPerPage,
  useGetPokemonByPageQuery,
  useGetPokemonsAllListQuery,
} from '@/services/pokemonAPI';
import type { DataList } from '@/types/pokemon';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';
import { useParams, useSearchParams } from 'react-router';

export type usePokemonDataResults = {
  data: DataList | null;
  mode: 'Search' | 'AllPokemons';
  isLoading: boolean;
  isFetching: boolean;
  currentPage: number;
  error: FetchBaseQueryError | SerializedError | undefined;
  searchQuery: string;
};

export const usePokemonData = (): usePokemonDataResults => {
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const searchPageQuery = searchParams.get('page') || 1;
  const isSearchMode = !!searchQuery;
  const currentPage = isSearchMode ? Number(searchPageQuery) : Number(page);
  const showAllPokemons = useGetPokemonByPageQuery(currentPage - 1, {
    skip: isSearchMode || !page,
  });
  const showSearchPokemons = useGetPokemonsAllListQuery(undefined, {
    skip: !isSearchMode,
  });

  const activeQuery = isSearchMode ? showSearchPokemons : showAllPokemons;

  let data = null;
  if (isSearchMode && showSearchPokemons.data) {
    const matches =
      showSearchPokemons.data.results.filter(({ name }) => {
        return name.includes(searchQuery.toLowerCase());
      }) ?? [];
    const startIndex = (currentPage - 1) * limitPerPage;
    const results = [...matches].splice(startIndex, limitPerPage);
    data = {
      count: matches.length,
      results: results,
    };
  } else if (!isSearchMode && showAllPokemons.data) {
    data = showAllPokemons.data;
  }
  return {
    data,
    mode: isSearchMode ? 'Search' : 'AllPokemons',
    isLoading: activeQuery.isLoading,
    isFetching: activeQuery.isFetching,
    error: activeQuery.error,
    currentPage,
    searchQuery,
  };
};
