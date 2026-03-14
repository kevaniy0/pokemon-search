export type DataList = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};
export type Data = {
  abilities: PokemonAbilities[];
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
  types: PokemonType[];
};
export type ResponseList = {
  count: number;
  pokemons: Data[];
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
