import './index.scss';
import CardList from '../../components/CardList';
import type { PokemonDataProps } from '../../types/props';

const SectionTitle = 'Results';

const Results = (props: PokemonDataProps) => {
  const { results } = props;
  if (props.forceError) {
    throw new Error('Искусственная ошибка');
  }

  return (
    <section className="flex-1 mb-2.5">
      <h2 className="text-3xl font-bold text-center my-6 text-gray-600">
        {SectionTitle}
      </h2>
      <CardList isLoading={props.isLoading} results={results} />
    </section>
  );
};

export default Results;
