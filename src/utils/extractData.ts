import type { Pokemon } from '../types/pokemon';

const extractData = (data: Pokemon): Pokemon => {
  return {
    abilities: data.abilities,
    name: data.name,
    height: data.height,
    weight: data.weight,
    sprites: {
      front_default: data.sprites.front_default,
    },
    types: data.types,
  };
};

export default extractData;
