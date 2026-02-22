export type Data = {
  abilities: PokemonAbilities[];
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
};
export type Pokemon = {
  abilities: PokemonAbilities[];
  name: string;
  height: number;
  weight: number;
  pic: string;
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
