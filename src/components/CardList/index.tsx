import React from 'react';
import './index.scss';
import Card from '../Card';

class CardList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="card-list">
        <Card name="test" description="testtest" />
      </div>
    );
  }
}

export default CardList;
