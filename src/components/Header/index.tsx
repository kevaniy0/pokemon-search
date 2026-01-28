import Navigation from 'components/Navigation';
import type { HeaderProps } from '@/types/props';

const Header = ({ name, logo }: HeaderProps) => {
  return (
    <header className="mb-7">
      <div className="flex gap-6 justify-center items-center ">
        <h1 className="text-5xl font-black text-gray-900 drop-shadow-lg">
          {name}
        </h1>
        <img className="w-[100px]" src={logo} alt="pokemon-logo" />
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
