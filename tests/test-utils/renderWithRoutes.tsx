import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

export const renderWithRouter = (
  pokemonName: string,
  component: React.ReactNode
) => {
  return render(
    <MemoryRouter initialEntries={[`/pokemon/${pokemonName}`]}>
      <Routes>
        <Route path="/pokemon/:name" element={component} />
      </Routes>
    </MemoryRouter>
  );
};
