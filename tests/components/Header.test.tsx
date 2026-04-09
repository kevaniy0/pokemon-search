import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Header', () => {
  it('should render Header Component', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header name="Pokemon Search" logo="url:test" />
        </ThemeProvider>
      </MemoryRouter>
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Pokemon Search/i);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt');
    expect(img).toHaveAttribute('alt', 'pokemon-logo');
  });
});
