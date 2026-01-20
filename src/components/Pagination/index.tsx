import type { PaginationProps } from '@/types/props';
import { btnClasses, currentButton } from './pagination-classes';
import Button from '../Button';

const Pagination = ({ current, pages, onChange }: PaginationProps) => {
  if (pages <= 1) return;

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
    <div className="pagination-wpapper flex gap-1">
      <Button
        className={btnClasses}
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
        className={btnClasses}
        onClick={() => goTo(current + 1)}
        disabled={current === pages}
        name="&gt;"
      />
    </div>
  );
};

export default Pagination;
