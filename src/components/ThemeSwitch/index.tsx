import { useTheme } from '@/hooks/useTheme';
import Moon from 'assets/moon.svg?react';
import Sun from 'assets/sun.svg?react';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const bubble = theme === 'light' ? 'left-[2px]' : 'left-[59px]';
  return (
    <>
      <div className="theme-switcher flex justify-center mb-4">
        <div className="theme-wrapper flex justify-center items-center gap-2 relative w-max h-[30px] ">
          <Sun
            fill={theme === 'light' ? '#212121' : '#f1f1f1'}
            width="25"
            height="25"
          />
          <div className="w-[86px] h-[30px] relative border-2 border-xDark dark:border-xLight bg-xLight dark:bg-xDark rounded-[50px]">
            <input
              name="input-name"
              className="relative z-20 w-full h-full cursor-pointer opacity-0"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span
              className={`switch-bubble cursor-pointer w-[20px] h-[20px] border-2  border-xDark dark:border-xLight  rounded-[50%] absolute top-[3px] ${bubble} transition-all duration-300 ease-in-out`}
            ></span>
          </div>

          <Moon
            fill={theme === 'light' ? '#212121' : '#f1f1f1'}
            width="25"
            height="25"
          />
        </div>
      </div>
    </>
  );
};
