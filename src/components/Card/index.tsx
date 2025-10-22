import './index.scss';
import type { CardProps } from '../../types/props';

const Card = (props: CardProps) => {
  return (
    <div className="card-item flex">
      <p className="text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-l border-r border-b border-black">
        {props.name}
      </p>
      <p className="text-center text-xs lg:text-base flex flex-1 md:px-2 h-20 justify-center items-center border-r border-b border-black">
        {props.abilities}
      </p>
      <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
        {props.type}
      </p>
      <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
        {props.height}
      </p>
      <p className="text-xs lg:text-base flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black">
        {props.weight}
      </p>
      <div
        className="flex flex-1 md:px-2  h-20 justify-center items-center border-r border-b border-black"
        style={{
          backgroundImage: `url(${props.pic})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default Card;
