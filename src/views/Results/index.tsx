import React from 'react';
import './index.scss';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import type { PokemonDataProps } from '../../types/props';

const SectionTitle = 'Results';

class Results extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    const { results, isLoading } = this.props;
    if (isLoading) return <Loader />;
    return (
      <section>
        <h2>{SectionTitle}</h2>
        <CardList results={results} />
      </section>
    );
  }
}

export default Results;
