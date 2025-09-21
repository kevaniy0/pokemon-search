import { render, screen } from '@testing-library/react';
import Loader from 'src/components/Loader';

describe('Loader', () => {
  it('should render Loader component', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
