import React from 'react';
import PokemonAPI from './services/PokemonAPI';
import type { Pokemon } from './types/pokemon';
import type { AppError } from './types/pokemon';
import TopControls from './views/TopControls';
import Results from './views/Results';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';
import getDelay from './utils/getDelay';
import HttpError from './services/HttpError';
import errorImg from './assets/error2.jpg';
import logo from './assets/Github-desktop-logo-symbol.svg.png';
import extractData from './utils/extractData';
import { githubLink } from './components/Footer/footer-data';

type AppState = {
  searchItem: string;
  inputValue: string;
  results: Pokemon[];
  error: AppError | null;
  isLoading: boolean;
  forceError: boolean;
};

class App extends React.Component {
  private api = new PokemonAPI();

  state: AppState = {
    inputValue: '',
    searchItem: '',
    results: [],
    error: null,
    isLoading: false,
    forceError: false,
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchItem: e.target.value });
  };

  handleForceError = () => {
    this.setState({ forceError: true });
  };

  clearForceError = () => {
    this.setState({ forceError: false });
  };

  handleSearch = async () => {
    this.clearForceError();
    this.setState({
      inputValue: this.state.searchItem,
    });
    const value = this.state.searchItem.trim();
    if (value === '') return;

    localStorage.setItem('searchItem', value);

    this.setState({
      isLoading: true,
    });

    const history: Pokemon[] = JSON.parse(
      localStorage.getItem('searchHistory') || '[]'
    );

    const startLoadingTime = Date.now();
    try {
      const pokemon = await this.api.getPokemon(value);
      const data = extractData(pokemon);
      const checkedHistory = history.filter((item) => item.name !== data.name);
      const newHistory = [data, ...checkedHistory];
      const delay = getDelay(startLoadingTime);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setTimeout(() => {
        this.setState({
          searchItem: value,
          results: newHistory,
          isLoading: false,
          error: null,
        });
      }, delay);
    } catch (error) {
      const delay = getDelay(startLoadingTime);
      if (error instanceof HttpError) {
        setTimeout(() => {
          this.setState({
            searchItem: value,
            error: {
              status: error.status,
              message: error.message,
              source: 'http',
            },
            isLoading: false,
          });
        }, delay);
      } else {
        setTimeout(() => {
          this.setState({
            error: {
              status: 500,
              message: 'Unexpected error',
              source: 'unexpected',
            },
            isLoading: false,
          });
        }, delay);
      }
    }
  };

  componentDidMount(): void {
    const history = localStorage.getItem('searchHistory');
    if (!history) return;

    const items: string[] = JSON.parse(history);
    const value = localStorage.getItem('searchItem') || '';
    this.setState({ searchItem: value, results: items });
  }

  render() {
    const { searchItem, results } = this.state;
    return (
      <div className="container mx-auto flex flex-col h-[100vh]">
        <TopControls
          isLoading={this.state.isLoading}
          value={searchItem}
          onChange={this.handleInput}
          onClick={this.handleSearch}
          error={this.state.error}
        />
        <ErrorBoundary
          key={this.state.inputValue}
          fallback={
            <div className="flex flex-1 flex-col items-center mt-20 mb-20 text-gray-600 gap-10">
              <h2 className="text-2xl font-medium">
                Ooops, something went wrong
              </h2>
              <div
                className="flex w-60 h-60"
                style={{
                  backgroundImage: `url(${errorImg})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          }
        >
          <Results
            results={results}
            isLoading={this.state.isLoading}
            forceError={this.state.forceError}
          />
        </ErrorBoundary>
        <Button
          onClick={this.handleForceError}
          name="Error"
          className={[
            'error-btn',
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
            'block',
            'w-max',
            'm-auto',
            'mt-5',
            'mb-5',
          ]}
        />
        <Footer link={githubLink} image={logo} />
      </div>
    );
  }
}

export default App;
