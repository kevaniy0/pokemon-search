import { Link } from 'react-router';
import { baseNavClasses } from '@/components/Navigation';
import pic from 'assets/http-404.png';
const homeUrl = '/home';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-7 px-10">
      <img
        className="w-[200px] lg:w-[300px] h-auto"
        src={pic}
        alt="not found pic"
      />
      <p className="text-[20px] font-bold text-xDark dark:text-xLight">
        The page you’re looking for doesn’t exist or may have been moved
      </p>
      <Link
        to={homeUrl}
        className={`w-max m-auto ${baseNavClasses} border-2 text-xLight bg-xDark hover:bg-xLight hover:text-xDark dark:bg-xLight dark:border-xLight dark:text-xDark hover:dark:bg-xDark hover:dark:border-xLight hover:dark:text-xLight `}
      >
        Go back to Home
      </Link>
    </div>
  );
};
