import Navigation from 'components/Navigation';
import type { HeaderProps } from '@/types/props';
import { ThemeSwitch } from '../ThemeSwitch';

const Header = ({ name, logo }: HeaderProps) => {
  return (
    <header className="mb-3 md:mb-7">
      <div className="flex gap-6 justify-center items-center ">
        <h1 className="text-2xl  md:text-5xl font-black text-xDark dark:text-xLight drop-shadow-lg">
          {name}
        </h1>
        <img className="w-[50px] md:w-[100px]" src={logo} alt="pokemon-logo" />
      </div>
      <ThemeSwitch />
      <Navigation />
    </header>
  );
};

export default Header;
