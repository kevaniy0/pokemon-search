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
    <div className="card-description h-[100%] rounded-2xl border-2 text-gray-900 p-4 relative">
      <div className="flex flex-col h-[100%] justify-between ">
        <div className="flex h-1/2 justify-center">
          <img
            src={pokemon.pic}
            alt={pokemon.name}
            className="max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <ul className="flex flex-col text-[13px] lg:text-2xl">
          <li>
            <b>Name:</b> {pokemon.name}
          </li>
          <li>
            <b>Type:</b> {pokemon.types.map((obj) => obj.type.name).join(', ')}
          </li>
          <li>
            <b>Abilities:</b>{' '}
            {pokemon.abilities.map((obj) => obj.ability.name).join(', ')}
          </li>
          <li>
            <b>Height:</b> {pokemon.height}
          </li>
          <li>
            <b>Weight:</b> {pokemon.weight}
          </li>
        </ul>
        <Button
          onClick={handleClickClose}
          name=""
          className={['btn', 'close-btn']}
          element={
            <img
              src={CloseButton}
              alt="close"
              className="w-8 h-8 md:w-10 md:h-10 cursor-pointer absolute top-[-7%] left-[94%] md:top-[-9%] md:left-[97%]"
            ></img>
          }
        ></Button>
      </div>
    </div>
  );
};

export default CardDescription;
