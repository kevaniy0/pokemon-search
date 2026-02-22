import { NavLink } from 'react-router';
export const baseNavClasses =
  'px-2 md:px-4 py-1 md:py-2 rounded-md text-1xl md:text-lg font-semibold transition-all duration-200';
const activeClasses =
  'bg-xDark dark:bg-xLight text-xLight dark:text-xDark shadow-md';
const inactiveClasses =
  'text-xDark dark:text-xLight hover:bg-xDark hover:text-xLight hover:dark:bg-xLight hover:dark:text-xDark ';

const Navigation = () => {
  return (
    <div className="navigation-container flex gap-2 justify-center">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${baseNavClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${baseNavClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default Navigation;
