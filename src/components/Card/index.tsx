import React from 'react';
import './index.scss';

type CardProps = {
  name: string;
  description: string;
};

class Card extends React.Component<CardProps> {
  render(): React.ReactNode {
    return (
      <div className="card-item">
        <p>{this.props.name}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
