import './index.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import type { TopControlsProps } from '../../types/props';

const SectionTitle = 'Top Controls';

const TopControls = (props: TopControlsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-600 text-center my-6">
        {SectionTitle}
      </h2>
      <div className="relative top-container flex justify-center gap-x-4 flex-wrap ">
        {props.isLoading && <Loader />}
        <Input
          className="outline-0 border-2 rounded px-1 text-gray-600 font-medium  focus:border-3"
          type="text"
          value={props.value}
          onChange={props.onChange}
          placeholder="type a pokemon name"
        />
        <Button
          className={[
            'search-btn',
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
          ]}
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
