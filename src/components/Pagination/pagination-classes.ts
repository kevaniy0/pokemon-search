const baseBtnClasses = [
  'relative',
  'flex',
  'items-center',
  'search-btn',
  'btn',
  'font-medium',
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
  'text-gray-900',
  'bg-white',
  'cursor-pointer',
  'border-gray-900',
  'hover:bg-black',
  'hover:text-white',
  'hover:border-black',
  'transition',
  'duration-300',
  'group',
];

export const currentButton = [
  ...baseBtnClasses,
  'disabled',
  'bg-black',
  'text-white',
  'border-black',
  'cursor-auto',
];

export const NotAllowedButton = [
  ...baseBtnClasses,
  'opacity-50',
  'cursor-not-allowed',
  'disabled',
];
