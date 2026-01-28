import ErrorBoundary from '@/components/ErrorBoundary';
import Results from '@/views/Results';
import TopControls from '@/views/TopControls';
import type { HomePageState } from '@/types/props';
import errorImg from 'assets/error2.jpg';
import { useEffect, useState } from 'react';
import type { Pokemon } from '@/types/pokemon';
import getPokemon from '@/services/PokemonAPI';
import extractData from '@/utils/extractData';
import { validatePokemonData } from '@/utils/validateData';
import getDelay from '@/utils/getDelay';
import HttpError from '@/services/HttpError';
import { useNavigate, useParams } from 'react-router';

const baseState: HomePageState = {
  inputValue: '',
  searchItem: '',
  results: [],
  error: null,
  isLoading: false,
  forceError: false,
};

const HomePage = () => {
  const [state, setState] = useState(baseState);
  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = state.results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(state.results.length / itemsPerPage);

  useEffect(() => {
    // if (page) {
    //   const correctPage = Number(page);
    //   if (!isNaN(correctPage)) {
    //     console.log('correct');
    //     navigate(`/home/${correctPage}`);
    //   } else {
    //     console.log('not correct');
    //     navigate(`/home/1`);
    //   }
    // } else {
    //   console.log('to main page or last page');
    //   const lastPage = localStorage.getItem('pokemonLastPage') || 1;
    //   navigate(`/home/${lastPage}`);
    // }
    const history = localStorage.getItem('searchHistory');
    const searchItem = localStorage.getItem('searchItem') || '';

    if (!history) return;
    try {
      const parsedData: unknown = JSON.parse(history);
      // !TODO: Узнать название такой проверки
      if (validatePokemonData(parsedData)) {
        setState((prev) => ({ ...prev, results: parsedData, searchItem }));
      } else {
        throw new Error('Invalid Pokemon data format');
      }
    } catch (error) {
      localStorage.removeItem('searchHistory');
      localStorage.removeItem('searchItem');
      if (error instanceof Error) {
        console.error('Failed to parse search history:', error.message);
      } else {
        console.error('unknown localstorage error:', error);
      }
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchItem: e.target.value }));
  };

  const clearForceError = () => {
    setState((prev) => ({ ...prev, forceError: false }));
  };

  const handlePageChange = (page: number) => {
    console.log('change page');

    localStorage.setItem('pokemonLastPage', String(page));
    navigate(`/home/${page}`);
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
    <div className="flex flex-col h-[100%]">
      <TopControls
        isLoading={state.isLoading}
        value={state.searchItem}
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
          results={currentItems}
          currentPage={Number(page)}
          totalPages={totalPages}
          isLoading={state.isLoading}
          forceError={state.forceError}
          onChangePage={handlePageChange}
        />
      </ErrorBoundary>
    </div>
  );
};
export default HomePage;
