import React from 'react';
import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import type { InputProps } from '../../types/props';

const SectionTitle = 'Top Controls';

class TopControls extends React.Component<InputProps> {
  render() {
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-600 text-center my-6">
          {SectionTitle}
        </h2>
        <div className="top-container flex justify-center gap-x-4">
          {this.props.isLoading && <Loader />}
          <Input
            className="outline-0 border-2 rounded px-1 text-gray-600 font-medium  focus:border-3"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Button
            className={[
              'search-btn',
              'btn',
              'text-gray-600',
              'bg-white',
              'font-medium',
              'cursor-pointer',
              'border-2',
              'border-gray-600',
              'rounded',
              'transition-colors',
              'duration-300',
              'p-1',
              'hover:bg-black',
              'hover:text-white',
              'hover:border-black',
            ]}
            name="Search"
            onClick={this.props.onClick}
          ></Button>
        </div>
      </section>
    );
  }
}

export default TopControls;
