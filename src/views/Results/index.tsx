import React from 'react';
import './index.scss';
import CardList from '../../components/CardList';
import type { PokemonDataProps } from '../../types/props';

const SectionTitle = 'Results';

class Results extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    const { results } = this.props;
    if (this.props.forceError) {
      throw new Error('Искусственная ошибка');
    }

    return (
      <section>
        <h2 className="text-3xl font-bold text-center my-6 text-gray-600">
          {SectionTitle}
        </h2>
        <CardList isLoading={this.props.isLoading} results={results} />
      </section>
    );
  }
}

export default Results;
