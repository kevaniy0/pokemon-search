import React from 'react';
import './index.scss';
import CardList from '../../components/CardList';

const SectionTitle = 'Results';

class Results extends React.Component {
  render(): React.ReactNode {
    return (
      <section>
        <h2>{SectionTitle}</h2>
        <CardList />
      </section>
    );
  }
}

export default Results;
