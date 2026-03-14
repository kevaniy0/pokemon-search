import ErrorBoundary from '@/components/ErrorBoundary';
import Results from '@/views/Results';
import TopControls from '@/views/TopControls';
import type { HomePageState } from '@/types/props';
import errorImg from 'assets/error2.jpg';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import Pagination from '@/components/Pagination';
import { SelectedCards } from '@/components/SelectedCards';
import { getListPokemons, limitPerPage } from '@/services/ListPokemonsApi';
import extractData from '@/utils/extractData';
import type { DataList } from '@/types/pokemon';
import getPokemon from '@/services/PokemonAPI';

const baseState: HomePageState = {
  mode: 'AllPokemons',
  countPokemons: 0,
  inputValue: '',
  error: null,
  isLoading: false,
  results: [],
};

const HomePage = () => {
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const pageQuery = searchParams.get('page') || 1;
  const navigate = useNavigate();
  const [state, setState] = useState(() => {
    const searchItem = localStorage.getItem('PokemonSearchitem') || '';
    return { ...baseState, inputValue: searchItem };
  });
  useEffect(() => {
    if (!page && !searchQuery) {
      navigate('/home/1');
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true }));
    if (!searchQuery) {
      const loadAllList = async () => {
        const response = await getListPokemons(Number(page) - 1);
        const correctPokemons = response.pokemons.map((item) => {
          return extractData(item);
        });
        setState((prev) => ({
          ...prev,
          mode: 'AllPokemons',
          countPokemons: response.count,
          results: correctPokemons,
          isLoading: false,
        }));
      };
      loadAllList();
    } else {
      const loadSearchList = async () => {
        const getList = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
        );
        const names: DataList = await getList.json();
        const matches = names.results.filter(({ name }) =>
          name.includes(searchQuery.toLowerCase())
        );
        const startIndex = (limitPerPage - 1) * (Number(pageQuery) - 1);
        const sliced = [...matches].splice(startIndex, limitPerPage);
        const pokemonsPromises = sliced.map(async ({ name }) => {
          const pokemon = await getPokemon(name);
          const result = extractData(pokemon);
          return result;
        });
        const searchPokemons = await Promise.all(pokemonsPromises);
        setState((prev) => ({
          ...prev,
          mode: 'Search',
          results: searchPokemons,
          countPokemons: matches.length,
          isLoading: false,
        }));
      };
      loadSearchList();
    }
  }, [page, pageQuery, searchQuery, navigate]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, inputValue: e.target.value }));
  };

  const handlePageChange = (page: number) => {
    if (state.mode === 'AllPokemons') {
      navigate(`/home/${page}`);
    }
    if (state.mode === 'Search') {
      navigate(`/home?search=${searchQuery}&page=${page}`);
    }
  };
  const handleSearch = async () => {
    const value = state.inputValue.trim();
    if (value === '') return;
    localStorage.setItem('PokemonSearchitem', state.inputValue);
    navigate(`/home?search=${value}&page=1`);
  };
  const handleCloseSearch = () => {
    localStorage.removeItem('PokemonSearchitem');
    setState((prev) => ({ ...prev, inputValue: '' }));
    navigate('/home');
  };
  return (
    <div className="flex flex-col gap-y-4 h-[100%] items-center justify-between">
      <TopControls
        isLoading={state.isLoading}
        value={state.inputValue}
        mode={state.mode}
        onChange={handleInput}
        onClick={handleSearch}
        onCloseSearch={handleCloseSearch}
        error={state.error}
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
        <section className="results-section flex items-center gap-y-2.5 gap-x-4 justify-center px-4">
          <Results
            mode={state.mode}
            results={state.results}
            isLoading={state.isLoading}
          />
          <Outlet context={{ isLoading: state.isLoading }} />
        </section>
        <Pagination
          current={
            state.mode === 'AllPokemons' ? Number(page) : Number(pageQuery)
          }
          elementsCount={state.countPokemons}
          onChange={handlePageChange}
          pages={Math.ceil(state.countPokemons / limitPerPage)}
        />
        <SelectedCards />
      </ErrorBoundary>
    </div>
  );
};
export default HomePage;
