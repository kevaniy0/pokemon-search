import { NavLink } from 'react-router';

const Navigation = () => {
  const baseClasses =
    'px-4 py-2 rounded-md text-lg font-semibold transition-colors duration-200';

  const activeClasses = 'bg-gray-900 text-white shadow-md';
  const inactiveClasses = 'text-gray-800 hover:bg-gray-100';
  return (
    <div className="navigation-container flex gap-2 justify-center">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default Navigation;
