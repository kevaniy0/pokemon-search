import React from 'react';
import './App.css';
import PokemonAPI from './services/PokemonAPI';
import type { Pokemon } from './types/pokemon';
import TopControls from './views/TopControls';
import Results from './views/Results';
import Button from './components/Button';
import getDelay from './utils/getDelay';
// import Loader from './components/Loader';

type AppState = {
  searchItem: string;
  results: Pokemon[];
  error: string | null;
  isLoading: boolean;
};

class App extends React.Component {
  private api = new PokemonAPI();

  state: AppState = {
    searchItem: '',
    results: [],
    error: null,
    isLoading: false,
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchItem: e.target.value });
  };

  handleSearch = async () => {
    const value = this.state.searchItem.trim();
    if (value === '') return;

    this.setState({
      isLoading: true,
    });

    const history: Pokemon[] = JSON.parse(
      localStorage.getItem('searchHistory') || '[]'
    );

    const startLoadingTime = Date.now();
    try {
      const pokemon = await this.api.getPokemon(value);
      const checkedHistory = history.filter(
        (item) => item.name !== pokemon.name
      );
      const newHistory = [pokemon, ...checkedHistory];
      const delay = getDelay(startLoadingTime);
      setTimeout(() => {
        this.setState({
          searchItem: '',
          results: newHistory,
          isLoading: false,
          error: null,
        });
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }, delay);
    } catch (error) {
      const delay = getDelay(startLoadingTime);
      setTimeout(() => {
        this.setState({
          error: (error as Error).message,
          isLoading: false,
        });
      }, delay);
    }
  };

  componentDidMount(): void {
    const history = localStorage.getItem('searchHistory');
    if (!history) return;

    const items: string[] = JSON.parse(history);
    this.setState({ results: items });
  }

  render() {
    const { searchItem, results } = this.state;
    return (
      <div>
        <TopControls
          value={searchItem}
          onChange={this.handleInput}
          onClick={this.handleSearch}
        />
        <Results
          results={results}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
        <Button name="Error" className={['error-btn', 'btn']} />
      </div>
    );
  }
}

export default App;
