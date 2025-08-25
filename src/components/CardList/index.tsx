import React from 'react';
import './index.scss';
import Card from '../Card';
import type { PokemonDataProps } from '../../types/props';

class CardList extends React.Component<PokemonDataProps> {
  render(): React.ReactNode {
    const { isLoading, results } = this.props;
    return (
      <div
        className={`cards-wrapper font-medium text-gray-600 ${isLoading ? 'opacity-20' : 'opacity-100'}`}
      >
        <div className="card-item flex">
          <div className="flex flex-1 h-20 justify-center items-center border border-black font-bold ">
            name
          </div>
          <div className="flex flex-1 h-20 justify-center items-center border-t border-r border-b border-black font-bold ">
            abilities
          </div>
          <div className="flex flex-1 h-20 justify-center items-center border-t border-r border-b border-black font-bold ">
            type
          </div>
          <div className="flex flex-1 h-20 justify-center items-center border-t border-r border-b border-black font-bold ">
            height
          </div>
          <div className="flex flex-1 h-20 justify-center items-center border-t border-r border-b border-black font-bold ">
            weight
          </div>
          <div className="flex flex-1 h-20 justify-center items-center border-t border-r border-b border-black font-bold ">
            image
          </div>
        </div>
        {results.map((item) => {
          const abilities = item.abilities
            .map((value) => value.ability.name)
            .join(', ');
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
