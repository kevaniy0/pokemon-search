import React from 'react';
import './App.css';
import TopControls from './views/TopControls';
import Results from './views/Results';
import Button from './components/Button';

class App extends React.Component {
  render() {
    return (
      <div>
        <TopControls />
        <Results />
        <Button name="Error" className={['error-btn', 'btn']} />
      </div>
    );
  }
}

export default App;
