import { Outlet } from 'react-router';
import Pagination from 'components/Pagination';
import type { ResultsProps } from '@/types/props';
import { limitPerPage } from '@/services/PokemonAPI';
import CardList from 'components/CardList';

export const Results = (props: ResultsProps) => {
  return (
    <>
      <section className="results-section flex items-center gap-y-2.5 gap-x-4 justify-center px-4">
        <div className="card-list-wrapper">
          <CardList
            mode={props.mode}
            isLoading={props.isLoading}
            results={props.results}
          />
        </div>
        <Outlet context={{ isLoading: props.isLoading }} />
      </section>
      <Pagination
        current={props.current}
        elementsCount={props.elementsCount}
        onChange={props.onChange}
        pages={Math.ceil(props.elementsCount / limitPerPage)}
      />
    </>
  );
};
