import type { Pokemon } from '../../src/types/pokemon';
export const mockPokemon: Pokemon = {
  abilities: [
    {
      ability: {
        name: 'keen-eye',
      },
    },
    {
      ability: { name: 'sniper' },
    },
  ],
  height: 3,
  name: 'spearow',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',
  },
  types: [
    {
      type: { name: 'normal' },
    },
    {
      type: { name: 'flying' },
    },
  ],
  weight: 20,
};
