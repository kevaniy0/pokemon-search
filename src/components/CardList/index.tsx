import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';
import { useNavigate } from 'react-router';

const CardList = (props: PokemonDataProps) => {
  const navigate = useNavigate();
  const { isLoading, results } = props;

  const handleCardClick = (name: string): void => {
    navigate(`pokemon/${name}`);
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
      className={`cards-wrapper flex font-medium text-gray-600 ${isLoading ? 'opacity-20' : 'opacity-100'}`}
    >
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center w-max mx-auto">
        {results.map((item) => (
          <li className="flex flex-col items-center w-max" key={item.name}>
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
