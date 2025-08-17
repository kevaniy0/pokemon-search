import React from 'react';
import './index.scss';
import type { CardProps } from '../../types/props';

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="card-item">
        <p>{this.props.name}</p>
        <p>{this.props.abilities}</p>
        <p>{this.props.type}</p>
        <p>{this.props.height}</p>
        <p>{this.props.weight}</p>
        <img src={this.props.pic} alt="" />
      </div>
    );
  }
}

export default Card;
