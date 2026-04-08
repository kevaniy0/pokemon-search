import type { Data, Pokemon, PokemonByNames } from '../../src/types/pokemon';
export const mockPokemonNames: PokemonByNames[] = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
  { name: 'spearow', url: 'https://pokeapi.co/api/v2/pokemon/spearow' },
];
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
  pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/21.svg',
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
export const mockPokemonApi: Data = {
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
    front_default: null,
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',
      },
    },
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
