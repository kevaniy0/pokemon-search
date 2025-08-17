import type { Pokemon } from '../types/pokemon';
class PokemonAPI {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async getPokemon(name: string): Promise<Pokemon> {
    const correctName = name.toLowerCase().trim();
    const url = `${this.baseUrl}/${correctName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pokemon not found: ${response.status}`);
    }
    return await response.json();
  }
}

export default PokemonAPI;
