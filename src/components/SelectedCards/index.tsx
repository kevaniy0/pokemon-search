import { selectorAll } from '@/store/cards/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '../Button';
import { btnClasses } from '../Pagination/pagination-classes';
import { resetItems } from '@/store/cards/cardsSlice';
import { validatePokemonData } from '@/utils/validateData';

export const SelectedCards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectorAll);
  const handleDownloadItems = () => {
    const elements = localStorage.getItem('searchHistory');
    if (!elements) return;
    const parsedData = JSON.parse(elements);
    if (!validatePokemonData(parsedData)) throw new Error('Error Parse Data');
    const extractedPokemons = parsedData.filter((item) =>
      cards.includes(item.name)
    );
    const headers = ['Name', 'Type', 'Height', 'Weight', 'Img'];

    const rows = extractedPokemons.map((pokemon) => [
      pokemon.name,
      pokemon.types.map((item) => item.type.name).join(', ') || 'unknown',
      pokemon.height || '',
      pokemon.weight || '',
      pokemon.pic,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${extractedPokemons.length}selectedCards.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
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
        <Button
          name="Download"
          className={btnClasses}
          onClick={handleDownloadItems}
        />
      </div>
    </div>
  );
};
