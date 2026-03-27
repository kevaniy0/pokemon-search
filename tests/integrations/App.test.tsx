import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from 'src/App';
import { mockPokemon, mockPokemonApi } from 'tests/__mocks__/pokemon';
import userEvent from '@testing-library/user-event';
import * as pokemonApi from '@/services/PokemonAPI-OLD';
import type { Pokemon } from 'src/types/pokemon';
import HttpError from 'src/services/HttpError';
import { renderWithProviders } from 'tests/test-utils/renderWithProvider';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should display previous saved search item from localStorage on mount', async () => {
    localStorage.setItem('searchItem', mockPokemon.name);
    localStorage.setItem('searchHistory', JSON.stringify([mockPokemon]));
    renderWithProviders(<App />);
    const input = await waitFor(() =>
      screen.getByDisplayValue(mockPokemon.name)
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockPokemon.name);
  });
  it('should display empty input value if localStorage is clear', () => {
    renderWithProviders(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
  it('should update input value when user types something', async () => {
    renderWithProviders(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
  it('should save search value to localStorage when click on button Search', async () => {
    renderWithProviders(<App />);

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'pika');
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe('pika');
  });
  it('should trim whitespace from input value before saving', async () => {
    renderWithProviders(<App />);
    const value = '   pika  ';

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    await userEvent.type(input, value);
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe(value.trim());
  });
  it('should trigger search with correct parameters and handle successful API response', async () => {
    const getPokemonMock = vi
      .spyOn(pokemonApi, 'default')
      .mockResolvedValue(mockPokemonApi);
    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();

    await user.type(input, mockPokemonApi.name);
    await user.click(button);

    expect(getPokemonMock).toHaveBeenCalledTimes(1);
    expect(getPokemonMock).toHaveBeenCalledWith(mockPokemonApi.name);

    const item = await screen.findByText(mockPokemonApi.name);
    expect(item).toBeInTheDocument();
  });
  it('should manage loading state during API calls', async () => {
    const getPokemonMock = vi
      .spyOn(pokemonApi, 'default')
      .mockResolvedValue(mockPokemonApi);

    renderWithProviders(<App />);

    const button = screen.getByRole('button', { name: /Search/i });
    const input = screen.getByRole('textbox');
    await userEvent.type(input, mockPokemonApi.name);
    await userEvent.click(button);

    expect(getPokemonMock).toHaveBeenCalledTimes(1);
    const loader = screen.queryByTestId('loader');
    expect(loader).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
  it('should handle error response', async () => {
    const getPokemonMock = vi
      .spyOn(pokemonApi, 'default')
      .mockRejectedValue(new HttpError(404, 'Pokemon not found'));
    const user = userEvent.setup();

    renderWithProviders(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /Search/i });

    await user.type(input, 'wrongPokemon');
    await user.click(button);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(getPokemonMock).toHaveBeenCalledWith('wrongPokemon');
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));
    const errorUI = await screen.findByText(/pokemon not found/i);
    expect(errorUI).toBeInTheDocument();
  }, 7000);
  it('should retrieve saved search term on component mount', async () => {
    localStorage.setItem('searchHistory', JSON.stringify([mockPokemon]));
    localStorage.setItem('searchItem', mockPokemon.name);
    renderWithProviders(<App />);

    const input = await screen.findByDisplayValue(mockPokemon.name);
    expect(input).toBeInTheDocument();
  });
  it('should overwrites existing localStorage value when new search is performed', async () => {
    vi.spyOn(pokemonApi, 'default').mockResolvedValue(mockPokemonApi);
    const oldPokemon = JSON.parse(JSON.stringify(mockPokemon));
    const pokemonName = 'pikachu';
    oldPokemon.name = pokemonName;
    localStorage.setItem('searchHistory', JSON.stringify([oldPokemon]));
    localStorage.setItem('searchItem', pokemonName);
    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    await user.clear(input);
    await user.type(input, mockPokemon.name);
    await user.click(button);

    await waitFor(
      () => {
        expect(localStorage.getItem('searchItem')).toBe(mockPokemon.name);
        const history: Pokemon[] = JSON.parse(
          localStorage.getItem('searchHistory') || '[]'
        );
        expect(history.length).toBeGreaterThan(1);
        expect(history[0].name).toBe(mockPokemon.name);
      },
      { timeout: 2500 }
    );
  });
});
