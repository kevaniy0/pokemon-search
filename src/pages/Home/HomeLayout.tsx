import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Outlet, useParams } from 'react-router';

export const HomeLayout = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      return;
    }

    const lastPage = localStorage.getItem('pokemonLastPage') || 1;
    navigate(`/home/${lastPage}`, { replace: true });
  }, [page, navigate]);

  if (!page) return null;
  return <Outlet />;
};
