import type { Data, Pokemon } from '../types/pokemon';
import no_logo_pokemon from '@/assets/no-img-pokemon.svg';

const extractData = (data: Data): Pokemon => {
  const pic =
    data.sprites.other.dream_world.front_default ||
    data.sprites.front_default ||
    no_logo_pokemon;
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
