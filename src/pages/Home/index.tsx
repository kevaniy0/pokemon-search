import ErrorBoundary from '@/components/ErrorBoundary';
import TopControls from '@/views/TopControls';
import errorImg from 'assets/error2.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SelectedCards } from '@/components/SelectedCards';
import { limitPerPage } from '@/services/PokemonAPI';
import { usePokemonData } from '@/hooks/usePokemonData';
import { SkeletonCardList } from '@/components/Skeleton';
import { Results } from '@/views/Results';
import { normalizedError } from '@/services/normalizeError';

const HomePage = () => {
  const { data, isLoading, isFetching, mode, error, currentPage, searchQuery } =
    usePokemonData();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(() => {
    const searchItem = localStorage.getItem('PokemonSearchitem') || '';
    return searchItem;
  });
  useEffect(() => {
    if (!currentPage && !searchQuery) navigate('/home/1');
  }, [currentPage, searchQuery, navigate]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const handlePageChange = (page: number) => {
    if (mode === 'AllPokemons') {
      navigate(`/home/${page}`);
    }
    if (mode === 'Search') {
      navigate(`/home?search=${searchQuery}&page=${page}`);
    }
  };
  const handleSearch = async () => {
    const value = inputState.trim();
    if (value === '') return;
    localStorage.setItem('PokemonSearchitem', value);
    navigate(`/home?search=${value}&page=1`);
  };
  const handleCloseSearch = () => {
    localStorage.removeItem('PokemonSearchitem');
    setInputState('');
    navigate('/home/1');
  };
  return (
    <div className="flex flex-col gap-y-4 h-[100%] items-center">
      <TopControls
        mode={mode}
        isFetching={isFetching}
        value={inputState}
        onChange={handleInput}
        onClick={handleSearch}
        onCloseSearch={handleCloseSearch}
        error={error ? normalizedError(error) : undefined}
      />
      <ErrorBoundary
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
        {isLoading ? (
          <SkeletonCardList />
        ) : data ? (
          <Results
            current={currentPage}
            elementsCount={data.count}
            pages={Math.ceil(data.count / limitPerPage)}
            onChange={handlePageChange}
            mode={mode}
            results={data.results}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        ) : (
          <></>
        )}

        <SelectedCards />
      </ErrorBoundary>
    </div>
  );
};
export default HomePage;
