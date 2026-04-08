import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';
import Button from '../Button';
import CloseButton from 'assets/close_card.svg';
import { useGetPokemonByNameQuery } from '@/services/pokemonAPI';
import { normalizedError } from '@/services/normalizeError';
import Error from 'assets/Error.png';

const CardDescription = () => {
  const { name = '' } = useParams();
  const [searchParams] = useSearchParams();
  const { isLoading } = useOutletContext<{ isLoading: boolean }>();
  const searchQuery = searchParams.get('search');
  const searchPage = searchParams.get('page');
  const navigate = useNavigate();
  const { data, error } = useGetPokemonByNameQuery(name);
  if (error) {
    const correctError = normalizedError(error);
    return (
      <div className="flex flex-col items-center rounded-2xl border-2 text-xDark dark:bg-xLight dark:border-xLight p-4 text-[13px] lg:text-2xl">
        <img
          src={Error}
          width="150px"
          height="150px"
          alt="error-response"
        ></img>
        <div>{correctError.message}</div>
      </div>
    );
  }
  if (!data) return null;

  const handleClickClose = () => {
    if (searchQuery) {
      navigate(`/home?search=${searchQuery}&page=${searchPage}`);
    } else {
      navigate(`..`);
    }
  };

  return (
    <div
      data-testid={`card-description-test`}
      className={`${isLoading ? 'opacity-20' : 'opacity-100'} card-description h-[100%] rounded-2xl border-2 text-xDark dark:bg-xLight dark:border-xLight p-4 relative`}
    >
      <div className="flex flex-col h-[100%] justify-between ">
        <div className="flex h-1/2 justify-center">
          <img
            src={data.pic}
            alt={data.name}
            className="max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <ul className="flex flex-col text-[13px] lg:text-2xl">
          <li>
            <b>Name:</b> {data.name}
          </li>
          <li>
            <b>Type:</b> {data.types.map((obj) => obj.type.name).join(', ')}
          </li>
          <li>
            <b>Abilities:</b>{' '}
            {data.abilities.map((obj) => obj.ability.name).join(', ')}
          </li>
          <li>
            <b>Height:</b> {data.height}
          </li>
          <li>
            <b>Weight:</b> {data.weight}
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
