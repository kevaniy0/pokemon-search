import type { Pokemon } from '@/types/pokemon';

export const validatePokemonData = (value: unknown): value is Pokemon[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.name === 'string' &&
        typeof item.height === 'number' &&
        typeof item.weight === 'number' &&
        typeof item.pic === 'string' &&
        Array.isArray(item.abilities) &&
        Array.isArray(item.types)
    )
  );
};
