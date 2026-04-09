import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { githubLink } from '@/components/Footer/footer-data';

describe('Footer', () => {
  it('should render Footer Component', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer image="test" link={githubLink} />
        </MemoryRouter>
      </ThemeProvider>
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
    expect(link).toHaveAttribute('href', githubLink);
  });
});
