import { render, screen } from '@testing-library/react';
import Input from 'src/components/Input';
describe('Input', () => {
  it('should render input component', () => {
    render(<Input />);
    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();
  });
});
