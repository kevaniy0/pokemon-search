import React from 'react';
import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SectionTitle = 'Top Controls';

class TopControls extends React.Component {
  render() {
    return (
      <section>
        {SectionTitle}
        <div className="top-container">
          <Input type="text" />
          <Button className={['btn']} name="Search"></Button>
        </div>
      </section>
    );
  }
}

export default TopControls;
