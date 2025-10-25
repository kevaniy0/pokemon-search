import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';
import type { Pokemon } from '../../types/pokemon';
import { useState } from 'react';
import CardDescription from '../CardDescription';

type SelectedState = null | Pokemon;

const CardList = (props: PokemonDataProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedState>(null);
  const { isLoading, results } = props;

  const handleCardClick = (pokemon: Pokemon): void => {
    setSelectedPokemon(() => pokemon);
  };

  const closeCard = () => {
    setSelectedPokemon(() => null);
  };

  if (!results || results.length === 0) {
    return (
      <div>
        <p className="text-center font-medium text-gray-900">No results</p>
      </div>
    );
  }
  return (
    <div
      className={`cards-wrapper flex font-medium text-gray-600 ${isLoading ? 'opacity-20' : 'opacity-100'}`}
    >
      <ul className="grid grid-cols-3 gap-7 justify-items-center w-max mx-auto">
        {results.map((item) => (
          <li className="flex flex-col items-center w-max" key={item.name}>
            <Card
              onClick={() => {
                handleCardClick(item);
              }}
              name={item.name}
              pic={item.pic}
            />
          </li>
        ))}
      </ul>
      {selectedPokemon ? (
        <CardDescription
          onClick={closeCard}
          abilities={selectedPokemon.abilities
            .map((item) => item.ability.name)
            .join(', ')}
          name={selectedPokemon.name}
          pic={selectedPokemon.pic}
          type={selectedPokemon.types.map((item) => item.type.name).join(', ')}
          height={selectedPokemon.height}
          weight={selectedPokemon.weight}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default CardList;
