import { render, screen, waitFor } from '@testing-library/react';
import App from 'src/App';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import userEvent from '@testing-library/user-event';
import PokemonAPI from 'src/services/PokemonAPI';

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
  it('should update input value when user types something', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
  it('should save search value to localStorage when click on button Search', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'pika');
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe('pika');
  });
  it('should trim whitespace from input value before saving', async () => {
    render(<App />);
    const value = '   pika  ';

    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    await userEvent.type(input, value);
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe(value.trim());
  });
  it('should trigger search with correct parameters', async () => {
    const getPokemonMock = vi
      .spyOn(PokemonAPI.prototype, 'getPokemon')
      .mockResolvedValue(mockPokemon);
    render(<App />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/type a pokemon name/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    await user.type(input, mockPokemon.name);
    await user.click(button);

    expect(getPokemonMock).toHaveBeenCalledTimes(1);
    expect(getPokemonMock).toHaveBeenCalledWith(mockPokemon.name);
  });
});
