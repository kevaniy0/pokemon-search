import React from 'react';
import './index.scss';
import type { CardProps } from '../../types/props';

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="card-item flex">
        <p
          data-testid={`pokemon-name-id-${this.props.name}`}
          className="text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-l border-r border-b border-black"
        >
          {this.props.name}
        </p>
        <p
          data-testid={`pokemon-abilities-id-${this.props.abilities}`}
          className="text-center text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-r border-b border-black"
        >
          {this.props.abilities}
        </p>
        <p
          data-testid={`pokemon-type-id-${this.props.type}`}
          className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black"
        >
          {this.props.type}
        </p>
        <p
          data-testid={`pokemon-height-id-${this.props.height}`}
          className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black"
        >
          {this.props.height}
        </p>
        <p
          data-testid={`pokemon-weight-id-${this.props.weight}`}
          className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black"
        >
          {this.props.weight}
        </p>
        <div
          data-testid={`pokemon-pic-id-${this.props.name}`}
          className="flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black"
          style={{
            backgroundImage: `url(${this.props.pic})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </div>
    );
  }
}

export default Card;
