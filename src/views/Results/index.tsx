import React from 'react';
import './index.scss';
import CardList from '../../components/CardList';
import type { PokemonDataProps } from '../../types/props';

const SectionTitle = 'Results';

class Results extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    return (
      <section>
        <h2>{SectionTitle}</h2>
        <CardList results={this.props.results} />
      </section>
    );
  }
}

export default Results;
