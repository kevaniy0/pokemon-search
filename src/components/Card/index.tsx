import React from 'react';
import './index.scss';
import type { CardProps } from '../../types/props';

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="card-item flex">
        <p className="text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-l border-r border-b border-black">
          {this.props.name}
        </p>
        <p className="text-center text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-r border-b border-black">
          {this.props.abilities}
        </p>
        <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
          {this.props.type}
        </p>
        <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
          {this.props.height}
        </p>
        <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
          {this.props.weight}
        </p>
        <div
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
