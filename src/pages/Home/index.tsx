import ErrorBoundary from '@/components/ErrorBoundary';
import Results from '@/views/Results';
import TopControls from '@/views/TopControls';
import type { HomePageState } from '@/types/props';
import errorImg from 'assets/error2.jpg';
import { useEffect, useState } from 'react';
import getPokemon from '@/services/PokemonAPI';
import extractData from '@/utils/extractData';
import getDelay from '@/utils/getDelay';
import HttpError from '@/services/HttpError';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router';
import Pagination from '@/components/Pagination';
import { usePokemonStorage } from '@/hooks/usePokemonStorage';
import { waitDelay } from '@/utils/waitDelay';
import { SelectedCards } from '@/components/SelectedCards';

const baseState: HomePageState = {
  inputValue: '',
  error: null,
  isLoading: false,
};

const HomePage = () => {
  const storage = usePokemonStorage();
  const [state, setState] = useState<HomePageState>(baseState);

  useEffect(() => {
    if (storage.isInitialized) {
      setState((prev) => ({ ...prev, inputValue: storage.searchItem }));
    }
  }, [storage.isInitialized, storage.searchItem]);

  const { page } = useParams();
  const navigate = useNavigate();
  if (!storage.isInitialized) return null;

  const correctPage = Number(page);
  if (!correctPage || isNaN(correctPage) || correctPage < 1) {
    return <Navigate to="/home/1" replace />;
  }

  const itemsPerPage = 6;
  const startIndex = (correctPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = storage.results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(storage.results.length / itemsPerPage);

  if (storage.results.length === 0 && correctPage !== 1) {
    return <Navigate to="/home/1" replace />;
  }
  if (storage.results.length > 0 && correctPage > totalPages) {
    return <Navigate to={`/home/${totalPages}`} replace />;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputValue: e.target.value }));
  };

  const handlePageChange = (page: number) => {
    storage.updateLastPage(page);
    navigate(`/home/${page}`);
  };
  const handleSearch = async () => {
    const value = state.inputValue.trim();
    if (value === '') return;

    if (state.isLoading) return;

    storage.updateSearchValue(value);
    setState((prev) => ({ ...prev, isLoading: true }));

    const startLoadingTime = Date.now();
    try {
      const pokemon = await getPokemon(value);
      const data = extractData(pokemon);
      const checkedHistory = storage.results.filter(
        (item) => item.name !== data.name
      );
      const newHistory = [data, ...checkedHistory];
      const delay = getDelay(startLoadingTime);
      await waitDelay(delay);
      storage.updateResults(newHistory);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
      handlePageChange(1);
    } catch (error) {
      const delay = getDelay(startLoadingTime);
      await waitDelay(delay);
      if (error instanceof HttpError) {
        setState((prev) => ({
          ...prev,
          inputValue: value,
          error: {
            status: error.status,
            message: error.message,
            source: 'http',
          },
          isLoading: false,
        }));
      }
    }
  };
  return (
    <div className="flex flex-col gap-y-4 h-[100%] items-center justify-between">
      <TopControls
        isLoading={state.isLoading}
        value={state.inputValue}
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
        <section className="results-section flex items-center gap-y-2.5 gap-x-4 justify-center px-4">
          <Results results={currentItems} isLoading={state.isLoading} />
          <Outlet context={{ results: storage.results }} />
        </section>
        <Pagination
          current={Number(page)}
          hasItems={currentItems.length > 0}
          onChange={handlePageChange}
          pages={totalPages}
        />
        <SelectedCards />
      </ErrorBoundary>
    </div>
  );
};
export default HomePage;
