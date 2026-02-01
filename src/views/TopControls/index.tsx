import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import type { TopControlsProps } from '../../types/props';
import { btnClasses } from '@/components/Pagination/pagination-classes';

const TopControls = (props: TopControlsProps) => {
  return (
    <section className="top-cotrols-section">
      <div className="relative top-container flex justify-center gap-x-4 flex-wrap ">
        {props.isLoading && <Loader />}
        <Input
          className="w-[160px] md:w-max outline-0 text-sm md:text-base border-2 rounded px-1 text-gray-900 font-medium focus:border-3"
          type="text"
          value={props.value}
          onChange={props.onChange}
          placeholder="type a pokemon name"
        />
        <Button
          className={btnClasses}
          name="Search"
          onClick={props.onClick}
        ></Button>
        {(props.error?.status === 404 || props.error?.status === 400) && (
          <div className="font-bold text-red-500 absolute top-10 left-1/2 -translate-x-1/2">
            {props.error.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopControls;
