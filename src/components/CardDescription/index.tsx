import type { Pokemon } from '@/types/pokemon';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import Button from '../Button';
import CloseButton from 'assets/close_card.svg';
import { useEffect } from 'react';

type OutletContext = {
  results: Pokemon[];
};

const CardDescription = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { results } = useOutletContext<OutletContext>();
  const pokemon = results.find((item) => item.name === name);

  const handleClickClose = () => {
    navigate(`..`);
  };

  useEffect(() => {
    if (!pokemon) {
      navigate('..', { replace: true });
    }
  }, [pokemon, navigate]);

  if (!pokemon) {
    return null;
  }
  return (
    <div className="card-description rounded-2xl border-2 text-gray-900 p-4 w-[30%] h-[100%] relative">
      <div className="flex flex-col h-[100%]">
        <div className="flex h-1/2 justify-center">
          <img
            src={pokemon.pic}
            alt={pokemon.name}
            className="max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <ul className="flex flex-col h-1/2 justify-around">
          <li>Name: {pokemon.name}</li>
          <li>Type: {pokemon.types.map((obj) => obj.type.name).join(', ')}</li>
          <li>
            Abilities:{' '}
            {pokemon.abilities.map((obj) => obj.ability.name).join(', ')}
          </li>
          <li>Height: {pokemon.height}</li>
          <li>Weight: {pokemon.weight}</li>
        </ul>
        <Button
          onClick={handleClickClose}
          name=""
          className={['btn', 'close-btn']}
          element={
            <img
              src={CloseButton}
              alt="close"
              className="w-10 h-10 cursor-pointer absolute top-[-10%] left-[97%]"
            ></img>
          }
        ></Button>
      </div>
    </div>
  );
};

export default CardDescription;
