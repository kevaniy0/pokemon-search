import { NotFoundPage } from '@/pages/404';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('About Page', () => {
  it('should render page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const name = screen.getByText(
      'The page you’re looking for doesn’t exist or may have been moved'
    );
    const link = screen.getByRole('link');
    expect(name).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(/Go back to Home/i);
  });
});
