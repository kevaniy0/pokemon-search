import type { Pokemon } from '../types/pokemon';
import HttpError from './HttpError';
class PokemonAPI {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async getPokemon(name: string): Promise<Pokemon> {
    const correctName = name.toLowerCase().trim();
    const url = `${this.baseUrl}/${correctName}`;
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
  }
}

export default PokemonAPI;
