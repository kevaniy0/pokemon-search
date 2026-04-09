import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('should render button component', () => {
    render(<Button name="Search" className={['btn', 'button-black']} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toHaveClass('btn button-black');
    expect(button).toBeInTheDocument();
  });
  it('should render button component with empty clasees', () => {
    render(<Button name="Search" className={[]} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button.className).toBe('');
  });
});
