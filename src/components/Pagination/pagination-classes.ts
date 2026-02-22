const baseBtnClasses = [
  'relative',
  'flex',
  'items-center',
  'search-btn',
  'btn',
  'font-bold',
  'border-2',
  'rounded',
  'text-sm',
  'md:text-base',
  'px-2',
  'md:px-4',
  'py-1',
];

export const btnClasses = [
  ...baseBtnClasses,
  'text-xDark',
  'dark:text-xLight',
  'bg-xLight',
  'dark:bg-xDark',
  'cursor-pointer',
  'border-xDark',
  'dark:border-xLight',
  'hover:bg-xDark',
  'hover:dark:bg-xLight',
  'hover:dark:text-xDark',
  'hover:dark:border-xLight',
  'hover:text-white',
  'hover:border-xDark',
  'transition',
  'duration-300',
  'group',
];

export const currentButton = [
  ...baseBtnClasses,
  'disabled',
  'bg-xDark',
  'dark:bg-xLight',
  'text-white',
  'dark:text-xDark',
  'border-xDark',
  'dark:border-xLight',
  'cursor-auto',
];

export const NotAllowedButton = [
  ...baseBtnClasses,
  'opacity-30',
  'cursor-not-allowed',
  'disabled',
  'dark:border-xLight',
  'dark:text-xLight',
];
