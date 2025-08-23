import type { Pokemon } from './pokemon';

export type PokemonDataProps = {
  results: Pokemon[];
  isLoading?: boolean;
  error?: string | null;
};

export type CardProps = {
  name: string;
  abilities: string;
  pic: string;
  type: string;
  height: number;
  weight: number;
};
