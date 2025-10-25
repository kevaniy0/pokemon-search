import { NavLink } from 'react-router';

const Navigation = () => {
  const baseClasses =
    'px-3 py-2 rounded-xl font-medium transition-colors duration-300';
  const activeClasses = 'bg-blue-600 text-white shadow-md';
  const inactiveClasses =
    'bg-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800';
  return (
    <div className="navigation-container flex gap-2">
      <NavLink
        to="/"
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
