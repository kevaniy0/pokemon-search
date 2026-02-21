import './index.scss';
import type { CardProps } from '../../types/props';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, removeItem, selectorAll } from '@/store/cards/cardsSlice';

const Card = (props: CardProps) => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectorAll);
  const value = cards.includes(props.name);

  const handleChecked = () => {
    if (value) {
      dispatch(removeItem(props.name));
    } else {
      dispatch(addItem(props.name));
    }
  };
  return (
    <>
      <div className="relative card-wrapper">
        <div
          onClick={props.onClick}
          className="font-bold w-25 h-25 lg:w-50 lg:h-50 flex flex-col justify-center items-center border-2 border-xDark dark:border-xLight dark:bg-xLight rounded-2xl cursor-pointer  text-xDark  hover:bg-amber-100 hover:dark:border-amber-100"
        >
          <img className="w-15 h-15 lg:w-30 lg:h-30" src={props.pic} alt="" />
          <p className="text-center text-sm md:text-base">{props.name}</p>
        </div>
        <input
          className="absolute left-3 top-3"
          name={props.name}
          type="checkbox"
          checked={value}
          onChange={handleChecked}
        />
      </div>
    </>
  );
};

export default Card;
