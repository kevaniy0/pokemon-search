import './index.scss';
import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container flex justify-center items-center">
        <span data-testid="loader" className="loader"></span>
      </div>
    );
  }
}

export default Loader;
