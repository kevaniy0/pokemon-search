import { render, screen } from '@testing-library/react';
import Input from '@/components/Input';
describe('Input', () => {
  it('should render input component', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
