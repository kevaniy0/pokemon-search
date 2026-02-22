import type { Data, Pokemon } from '../types/pokemon';

const extractData = (data: Data): Pokemon => {
  const pic = data.sprites.other.dream_world.front_default;
  return {
    abilities: data.abilities,
    name: data.name,
    height: data.height,
    weight: data.weight,
    pic: pic,
    types: data.types,
  };
};

export default extractData;
