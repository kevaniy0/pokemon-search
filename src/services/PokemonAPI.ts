import type { Data } from '../types/pokemon';
import HttpError from './HttpError';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const getPokemon = async (name: string): Promise<Data> => {
  const correctName = name.toLowerCase().trim();
  const url = `${baseUrl}/${correctName}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new HttpError(response.status, 'Pokemon not found');
    }
    if (response.status === 400) {
      throw new HttpError(response.status, 'Bad Request');
    }
    throw new HttpError(
      response.status,
      response.statusText || 'Unknown Error'
    );
  }

  return await response.json();
};

export default getPokemon;
