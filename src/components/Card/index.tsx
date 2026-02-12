import './index.scss';
import type { CardProps } from '../../types/props';

const Card = (props: CardProps) => {
  return (
    <>
      <div
        onClick={props.onClick}
        className="font-bold w-25 h-25 lg:w-50 lg:h-50 flex flex-col justify-center items-center border-2 border-xDark dark:border-xLight dark:bg-xLight rounded-2xl cursor-pointer transition ease-in-out duration-300 text-xDark transform hover:-translate-y-1 hover:bg-amber-100 hover:dark:border-amber-100"
      >
        <img className="w-15 h-15 lg:w-30 lg:h-30" src={props.pic} alt="" />
        <p className="text-center text-sm md:text-base">{props.name}</p>
      </div>
    </>
  );
};

export default Card;
