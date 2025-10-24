import './index.scss';
import type { CardProps } from '../../types/props';

const Card = (props: CardProps) => {
  return (
    <>
      <div className="w-max flex flex-col items-center border-2 rounded-2xl p-5 cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-1 hover:bg-amber-100">
        <img className="object-contain mx-auto" src={props.pic} alt="" />
        {/* <hr className="w-[100%] h-4"></hr> */}
        <p className="text-center">{props.name}</p>
      </div>
    </>
  );
};

export default Card;
