import type { PaginationProps } from '@/types/props';
import {
  btnClasses,
  currentButton,
  NotAllowedButton,
} from './pagination-classes';
import Button from '../Button';

const Pagination = ({
  current,
  pages,
  onChange,
  hasItems,
}: PaginationProps) => {
  if (!hasItems) return null;

  const goTo = (page: number) => {
    if (page < 1 || page > pages) return;
    onChange(page);
  };

  const generatePages = () => {
    const buttons: (number | '...')[] = [];
    if (pages < 6) {
      for (let i = 1; i <= pages; i += 1) {
        buttons.push(i);
      }
      return buttons;
    }

    buttons.push(1);
    if (current > 3) buttons.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(pages - 1, current + 1);
    for (let i = start; i <= end; i += 1) {
      buttons.push(i);
    }
    if (current < pages - 2) buttons.push('...');
    buttons.push(pages);
    return buttons;
  };
  const buttons = generatePages();
  return (
    <div className="pagination-wpapper flex gap-1 justify-center">
      <Button
        className={current === 1 ? NotAllowedButton : btnClasses}
        onClick={() => goTo(current - 1)}
        disabled={current === 1}
        name="&lt;"
      />
      {buttons.map((item, i) => {
        return item === '...' ? (
          <span key={item + i}>...</span>
        ) : (
          <Button
            key={item + i}
            name={String(item)}
            className={item === current ? currentButton : btnClasses}
            onClick={() => goTo(item)}
            disabled={item === current}
          />
        );
      })}
      <Button
        className={current === pages ? NotAllowedButton : btnClasses}
        onClick={() => goTo(current + 1)}
        disabled={current === pages}
        name="&gt;"
      />
    </div>
  );
};

export default Pagination;
