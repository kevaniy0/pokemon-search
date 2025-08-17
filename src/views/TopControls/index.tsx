import React from 'react';
import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
};

const SectionTitle = 'Top Controls';

class TopControls extends React.Component<InputProps> {
  render() {
    return (
      <section>
        <h2>{SectionTitle}</h2>
        <div className="top-container">
          <Input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Button
            className={['search-btn', 'btn']}
            name="Search"
            onClick={this.props.onClick}
          ></Button>
        </div>
      </section>
    );
  }
}

export default TopControls;
