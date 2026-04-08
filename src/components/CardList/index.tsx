import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';
import type { Pokemon } from '@/types/pokemon';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useGetPokemonsByNamesQuery } from '@/services/pokemonAPI';
import { SkeletonCardList } from '../Skeleton';
import { normalizedError } from '@/services/normalizeError';
import Error from 'assets/Error.png';

const CardList = (props: PokemonDataProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const searchPage = searchParams.get('page');
  const ArrayNames = props.results.map((item) => item.name);
  const { data, error, isLoading, isFetching } =
    useGetPokemonsByNamesQuery(ArrayNames);

  const handleCardClick = (name: string): void => {
    if (props.mode === 'AllPokemons') {
      navigate(`/home/${page}/pokemon/${name}`);
    }
    if (props.mode === 'Search') {
      navigate(`pokemon/${name}?search=${searchQuery}&page=${searchPage}`, {
        relative: 'path',
      });
    }
  };

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
  if (isLoading) return <SkeletonCardList />;
  if (!data) return null;
  if (data && data.length === 0) {
    return (
      <div className=" text-xDark dark:text-xLight text-[13px] lg:text-2xl">
        No results
      </div>
    );
  }
  return (
    <div
      data-testid="loading-opacity"
      className={`relative cards-wrapper flex font-medium text-gray-600 `}
    >
      <ul
        className={`grid grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center w-max mx-auto ${isFetching ? 'opacity-20' : 'opacity-100'}`}
      >
        {data.map((item: Pokemon, index: number) => (
          <li
            className="flex flex-col items-center w-max"
            key={item.name + index}
          >
            <Card
              onClick={() => {
                handleCardClick(item.name);
              }}
              name={item.name}
              pic={item.pic}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
