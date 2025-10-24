import React, { useEffect, useState } from 'react';
import getPokemon from './services/PokemonAPI';
import type { Pokemon } from './types/pokemon';
import type { AppError } from './types/pokemon';
import TopControls from './views/TopControls';
import Results from './views/Results';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import getDelay from './utils/getDelay';
import HttpError from './services/HttpError';
import errorImg from './assets/error2.jpg';
import logo from 'assets/Github-desktop-logo-symbol.svg.png';
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
const baseState: AppState = {
  inputValue: '',
  searchItem: '',
  results: [],
  error: null,
  isLoading: false,
  forceError: false,
};

const App = () => {
  const [state, setState] = useState(baseState);
  const { searchItem, results } = state;
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (!history) return;

    const items: Pokemon[] = JSON.parse(history);
    const value = localStorage.getItem('searchItem') || '';
    setState((prev) => ({ ...prev, searchItem: value, results: items }));
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchItem: e.target.value }));
  };

  const clearForceError = () => {
    setState((prev) => ({ ...prev, forceError: false }));
  };
  const handleSearch = async () => {
    clearForceError();
    setState((prev) => ({ ...prev, inputValue: prev.searchItem }));
    const value = state.searchItem.trim();
    if (value === '') return;

    localStorage.setItem('searchItem', value);

    setState((prev) => ({ ...prev, isLoading: true }));

    const history: Pokemon[] = JSON.parse(
      localStorage.getItem('searchHistory') || '[]'
    );

    const startLoadingTime = Date.now();
    try {
      const pokemon = await getPokemon(value);
      const data = extractData(pokemon);
      const checkedHistory = history.filter((item) => item.name !== data.name);
      const newHistory = [data, ...checkedHistory];
      const delay = getDelay(startLoadingTime);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          searchItem: value,
          results: newHistory,
          isLoading: false,
          error: null,
        }));
      }, delay);
    } catch (error) {
      const delay = getDelay(startLoadingTime);
      if (error instanceof HttpError) {
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            searchItem: value,
            error: {
              status: error.status,
              message: error.message,
              source: 'http',
            },
            isLoading: false,
          }));
        }, delay);
      } else {
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            error: {
              status: 500,
              message: 'Unexpected error',
              source: 'unexpected',
            },
            isLoading: false,
          }));
        }, delay);
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-[100vh]">
      <TopControls
        isLoading={state.isLoading}
        value={searchItem}
        onChange={handleInput}
        onClick={handleSearch}
        error={state.error}
      />
      <ErrorBoundary
        key={state.inputValue}
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
          isLoading={state.isLoading}
          forceError={state.forceError}
        />
      </ErrorBoundary>

      <Footer link={githubLink} image={logo} />
    </div>
  );
};

export default App;
