import { render, screen, waitFor } from '@testing-library/react';
import App from 'src/App';
import { mockPokemon } from 'tests/__mocks__/pokemon';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should display previous saved search item from localStorage on mount', async () => {
    localStorage.setItem('searchItem', mockPokemon.name);
    localStorage.setItem('searchHistory', JSON.stringify([mockPokemon]));
    render(<App />);
    const input = await waitFor(() =>
      screen.getByDisplayValue(mockPokemon.name)
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockPokemon.name);
  });
  it('should display empty input value if localStorage is clear', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
