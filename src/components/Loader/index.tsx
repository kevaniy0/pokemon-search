import './index.scss';

const Loader = () => {
  return (
    <div className="loader-container flex justify-center items-center">
      <span data-testid={'loader'} className="loader"></span>
    </div>
  );
};

export default Loader;
