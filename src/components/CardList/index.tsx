import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';
import { useNavigate, useParams, useSearchParams } from 'react-router';

const CardList = (props: PokemonDataProps) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const searchPage = searchParams.get('page');
  const { isLoading, results } = props;

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

  if (!results || results.length === 0) {
    return (
      <div>
        <p className="text-center font-bold text-xDark dark:text-xLight">
          No results
        </p>
      </div>
    );
  }
  return (
    <div
      data-testid="loading-opacity"
      className={`relative cards-wrapper flex font-medium text-gray-600 `}
    >
      <ul
        className={`grid grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center w-max mx-auto ${isLoading ? 'opacity-20' : 'opacity-100'}`}
      >
        {results.map((item, index) => (
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
