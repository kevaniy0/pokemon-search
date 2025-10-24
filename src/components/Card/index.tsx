import './index.scss';
import type { CardProps } from '../../types/props';

const Card = (props: CardProps) => {
  console.log(props.pic);
  return (
    <>
      <div
        onClick={props.onClick}
        className="w-50 h-50 flex flex-col justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-1 hover:bg-amber-100"
      >
        <img className="w-25 h-25" src={props.pic} alt="" />
        <p className="text-center">{props.name}</p>
      </div>
    </>
  );
};

export default Card;
