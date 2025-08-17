import type { Pokemon } from './pokemon';

export type PokemonDataProps = {
  results: Pokemon[];
};

export type CardProps = {
  name: string;
  abilities: string;
  pic: string;
  type: string;
  height: number;
  weight: number;
};
