import type { Pokemon } from '@/types/pokemon';
import { validatePokemonData } from '@/utils/validateData';
import { useEffect, useState } from 'react';

type PokemonStorage = {
  searchItem: string;
  results: Pokemon[];
  isInitialized: boolean;
};

export const usePokemonStorage = () => {
  const [state, setState] = useState<PokemonStorage>({
    searchItem: '',
    results: [],
    isInitialized: false,
  });
  const updateResults = (results: Pokemon[]) => {
    localStorage.setItem('searchHistory', JSON.stringify(results));
    setState((prev) => ({ ...prev, results }));
  };

  const updateSearchValue = (value: string) => {
    localStorage.setItem('searchItem', value);
    setState((prev) => ({ ...prev, searchItem: value }));
  };
  const updateLastPage = (page: number) => {
    localStorage.setItem('pokemonLastPage', String(page));
  };

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    const searchItem = localStorage.getItem('searchItem') || '';

    if (!history) {
      setState((prev) => ({ ...prev, isInitialized: true }));
      return;
    }
    try {
      const parsedData: unknown = JSON.parse(history);
      if (validatePokemonData(parsedData)) {
        setState((prev) => ({
          ...prev,
          results: parsedData,
          searchItem,
        }));
      } else {
        throw new Error('Invalid Pokemon data format');
      }
    } catch (error) {
      localStorage.removeItem('searchHistory');
      localStorage.removeItem('searchItem');
      if (error instanceof Error) {
        console.error('Failed to parse search history:', error.message);
      } else {
        console.error('unknown localstorage error:', error);
      }
    } finally {
      setState((prev) => ({
        ...prev,
        isInitialized: true,
      }));
    }
  }, []);

  return {
    ...state,
    updateResults,
    updateLastPage,
    updateSearchValue,
  };
};
