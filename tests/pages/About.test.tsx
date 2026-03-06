import AboutPage from '@/pages/About';
import { render, screen } from '@testing-library/react';

describe('About Page', () => {
  it('should render page', () => {
    render(<AboutPage />);
    const name = screen.getByText('PokéAPI');
    screen.debug();
    expect(name).toBeInTheDocument();
  });
});
