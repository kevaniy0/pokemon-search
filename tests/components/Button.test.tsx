import { render, screen } from '@testing-library/react';
import Button from 'src/components/Button';

describe('Button', () => {
  it('should render button component', () => {
    render(<Button name="Search" className={['btn']} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
    screen.debug();
  });
});
