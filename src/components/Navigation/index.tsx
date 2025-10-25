import { NavLink } from 'react-router';

const Navigation = () => {
  return (
    <div className="navigation-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Navigation;
