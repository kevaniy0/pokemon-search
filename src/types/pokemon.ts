export type Pokemon = {
  abilities: PokemonAbilities[];
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
};

export type AppError = {
  status: number;
  message: string;
  source: 'http' | 'unexpected';
};

export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonAbilities = {
  ability: {
    name: string;
  };
};
