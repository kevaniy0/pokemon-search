import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';
const CardList = (props: PokemonDataProps) => {
  const { isLoading, results } = props;
  if (!results || results.length === 0) {
    return (
      <div>
        <p className="text-center font-medium text-gray-600">No results</p>
      </div>
    );
  }
  return (
    <div
      className={`cards-wrapper font-medium text-gray-600 ${isLoading ? 'opacity-20' : 'opacity-100'}`}
    >
      <ul className="grid grid-cols-3 gap-7 justify-items-center w-max mx-auto">
        {results.map((item) => (
          <li className="flex flex-col items-center w-max" key={item.name}>
            <Card name={item.name} pic={item.sprites.front_default} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
