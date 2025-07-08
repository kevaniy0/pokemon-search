import React from 'react';
import './index.scss';
import Button from '../../components/Button';

const SectionTitle = 'Top Controls';

class TopControls extends React.Component {
  render() {
    return (
      <section>
        {SectionTitle}
        <div>
          <Button className={['btn']} name="Search"></Button>
        </div>
      </section>
    );
  }
}

export default TopControls;
