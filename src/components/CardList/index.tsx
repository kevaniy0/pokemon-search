import React from 'react';
import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';

class CardList extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    const results = this.props.results;

    return (
      <div>
        {results.map((item) => {
          const abilities = item.abilities
            .map((value) => value.ability.name)
            .join(' / ');
          return (
            <Card
              key={item.name}
              name={item.name}
              abilities={abilities}
              type={item.types[0].type.name}
              pic={item.sprites.front_default}
              height={item.height}
              weight={item.weight}
            ></Card>
          );
        })}
      </div>
    );
  }
}

export default CardList;
