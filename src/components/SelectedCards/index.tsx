import { selectorAll } from '@/store/cards/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '../Button';
import { btnClasses } from '../Pagination/pagination-classes';
import { resetItems } from '@/store/cards/cardsSlice';

export const SelectedCards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectorAll);

  if (cards.length === 0) return null;
  return (
    <div className="sticky bottom-2 mb-2  selected-cards w-max p-7 flex flex-col items-center gap-y-4  border-2 border-xDark dark:border-xLight rounded-2xl bg-xLight dark:bg-xDark">
      <p className="text-base font-bold lg:text-2xl text-xDark dark:text-xLight">
        You have selected{' '}
        {cards.length > 1 ? `${cards.length} cards` : '1 card'}
      </p>
      <div className="buttons-wrapper flex gap-2.5">
        <Button
          name="Unselect all"
          className={btnClasses}
          onClick={() => dispatch(resetItems())}
        />
        <Button name="Download" className={btnClasses} />
      </div>
    </div>
  );
};
