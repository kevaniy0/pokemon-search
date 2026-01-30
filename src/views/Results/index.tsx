import './index.scss';
import CardList from '../../components/CardList';
import type { ResultsProps } from '../../types/props';
import Pagination from '@/components/Pagination';

const Results = (props: ResultsProps) => {
  if (props.forceError) {
    throw new Error('Искусственная ошибка');
  }

  return (
    <section className="results-section flex flex-1 flex-col items-center gap-y-2.5 justify-center">
      <div className="card-list-wrapper">
        <CardList isLoading={props.isLoading} results={props.results} />
      </div>
      <Pagination
        current={props.currentPage}
        pages={props.totalPages}
        onChange={props.onChangePage}
        empty={!!props.results.length}
      />
    </section>
  );
};

export default Results;
