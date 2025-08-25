import React from 'react';
import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import type { InputProps } from '../../types/props';
import type { AppError } from '../../types/pokemon';

const SectionTitle = 'Top Controls';
type SearchError = {
  error: AppError | null;
};

class TopControls extends React.Component<InputProps & SearchError> {
  render() {
    return (
      <section>
        <h2 className="text-3xl font-bold text-gray-600 text-center my-6">
          {SectionTitle}
        </h2>
        <div className="relative top-container flex justify-center gap-x-4 flex-wrap ">
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
          {this.props.error?.status === 404 && (
            <div className="font-bold text-red-500 absolute top-10 left-1/2 -translate-x-1/2">
              {this.props.error.message}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default TopControls;
