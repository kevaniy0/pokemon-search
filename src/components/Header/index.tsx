import Navigation from 'components/Navigation';
import pokemonLogo from 'assets/pokemon-logo.svg';

const Header = () => {
  return (
    <header className="mb-7">
      <div className="flex gap-6 justify-center items-center ">
        <h1 className="text-5xl font-black text-gray-900 drop-shadow-lg">
          Pokémon Search
        </h1>
        <img className="w-[100px]" src={pokemonLogo} alt="pokemon-logo" />
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
