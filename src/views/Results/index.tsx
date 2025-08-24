import React from 'react';
import './index.scss';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import type { PokemonDataProps } from '../../types/props';

const SectionTitle = 'Results';

class Results extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    const { results, isLoading } = this.props;
    if (isLoading)
      return (
        <section>
          <h2 className="text-3xl font-bold text-center my-6 text-gray-600">
            {SectionTitle}
          </h2>
          <Loader />
        </section>
      );
    return (
      <section>
        <h2 className="text-3xl font-bold text-center my-6 text-gray-600">
          {SectionTitle}
        </h2>
        <CardList results={results} />
      </section>
    );
  }
}

export default Results;
