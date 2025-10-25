import './index.scss';
import CardList from '../../components/CardList';
import type { PokemonDataProps } from '../../types/props';

const Results = (props: PokemonDataProps) => {
  const { results } = props;
  if (props.forceError) {
    throw new Error('Искусственная ошибка');
  }

  return (
    <section className="results-section flex flex-1 items-center">
      <CardList isLoading={props.isLoading} results={results} />
    </section>
  );
};

export default Results;
