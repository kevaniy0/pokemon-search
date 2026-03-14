import type { DataList, ResponseList } from '@/types/pokemon';
import getPokemon from './PokemonAPI';
import HttpError from './HttpError';
export const limitPerPage = 12;
const url = 'https://pokeapi.co/api/v2/';
export const getListPokemons = async (page: number): Promise<ResponseList> => {
  const correctUrl = `${url}pokemon?limit=${limitPerPage}&offset=${page * limitPerPage}`;
  try {
    const response = await fetch(correctUrl);
    const data: DataList = await response.json();
    const promiseArray = data.results.map(async (item) => {
      const response = await getPokemon(item.name);
      return response;
    });
    const results = await Promise.all(promiseArray);
    return { count: data.count, pokemons: results };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown Error';
    throw new HttpError(0, message);
  }
};
