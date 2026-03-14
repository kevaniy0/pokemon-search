import type { Pokemon } from '@/types/pokemon';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';
import Button from '../Button';
import CloseButton from 'assets/close_card.svg';
import { useEffect, useState } from 'react';
import getPokemon from '@/services/PokemonAPI';
import extractData from '@/utils/extractData';

type PokemonState = Pokemon | null;

const CardDescription = () => {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const { isLoading } = useOutletContext<{ isLoading: boolean }>();
  const searchQuery = searchParams.get('search');
  const searchPage = searchParams.get('page');
  const navigate = useNavigate();
  const [state, setState] = useState<PokemonState>(null);

  const handleClickClose = () => {
    if (searchQuery) {
      navigate(`/home?search=${searchQuery}&page=${searchPage}`);
    } else {
      navigate(`..`);
    }
  };

  useEffect(() => {
    if (!name) return;
    const pokemonFetch = async () => {
      const response = await getPokemon(name);
      const data = extractData(response);
      setState(data);
    };
    pokemonFetch();
  }, [name]);

  if (!state) return null;
  return (
    <div
      className={`${isLoading ? 'opacity-20' : 'opacity-100'} card-description h-[100%] rounded-2xl border-2 text-xDark dark:bg-xLight dark:border-xLight p-4 relative`}
    >
      <div className="flex flex-col h-[100%] justify-between ">
        <div className="flex h-1/2 justify-center">
          <img
            src={state.pic}
            alt={state.name}
            className="max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <ul className="flex flex-col text-[13px] lg:text-2xl">
          <li>
            <b>Name:</b> {state.name}
          </li>
          <li>
            <b>Type:</b> {state.types.map((obj) => obj.type.name).join(', ')}
          </li>
          <li>
            <b>Abilities:</b>{' '}
            {state.abilities.map((obj) => obj.ability.name).join(', ')}
          </li>
          <li>
            <b>Height:</b> {state.height}
          </li>
          <li>
            <b>Weight:</b> {state.weight}
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
