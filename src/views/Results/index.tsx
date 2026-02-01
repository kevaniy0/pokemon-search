import './index.scss';
import CardList from '../../components/CardList';
import type { ResultProps } from '../../types/props';

const Results = (props: ResultProps) => {
  if (props.forceError) {
    throw new Error('Искусственная ошибка');
  }

  return (
    <div className="card-list-wrapper">
      <CardList isLoading={props.isLoading} results={props.results} />
    </div>
  );
};

export default Results;
