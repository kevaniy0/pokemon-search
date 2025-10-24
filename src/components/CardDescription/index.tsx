import type { CardDesciption } from '../../types/props';
import Button from '../Button';
import CloseButton from 'assets/close_card.svg';

const CardDescription = (props: CardDesciption) => {
  return (
    <div className="card-description rounded-2xl border-2 p-4 w-[30%] relative">
      <div className="flex flex-col h-[100%]">
        <div className="flex h-1/2 justify-center">
          <img
            src={props.pic}
            alt={props.name}
            className="max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <ul className="flex flex-col h-1/2 justify-around">
          <li>Name: {props.name}</li>
          <li>Type: {props.type}</li>
          <li>Abilities: {props.abilities}</li>
          <li>Height: {props.height}</li>
          <li>Weight: {props.weight}</li>
        </ul>
        <Button
          onClick={props.onClick}
          name=""
          className={['btn', 'close-btn']}
          element={
            <img
              src={CloseButton}
              alt="close"
              className="w-10 h-10 cursor-pointer absolute top-[-10%] left-[97%]"
            ></img>
          }
        ></Button>
      </div>
    </div>
  );
};

export default CardDescription;
