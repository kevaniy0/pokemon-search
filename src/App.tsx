import React from 'react';
import './App.css';
import PokemonAPI from './services/PokemonAPI';
import type { Pokemon } from './types/pokemon';
import TopControls from './views/TopControls';
import Results from './views/Results';
import Button from './components/Button';

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

    try {
      const pokemon = await this.api.getPokemon(value);
      const checkedHistory = history.filter(
        (item) => item.name !== pokemon.name
      );
      const newHistory = [pokemon, ...checkedHistory];
      this.setState({
        searchItem: '',
        results: newHistory,
      });
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      this.setState({ error: (error as Error).message });
    } finally {
      this.setState({
        isLoading: false,
      });
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
        <Results results={results} />
        <Button name="Error" className={['error-btn', 'btn']} />
      </div>
    );
  }
}

export default App;
