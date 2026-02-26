import { render, screen } from '@testing-library/react';
import Card from 'src/components/Card';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import { addItem, cardsReducer, removeItem } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import userEvent from '@testing-library/user-event';

vi.mock('@/store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const createTestStore = (initialState = []) => {
  return configureStore({
    reducer: {
      pokemonCards: cardsReducer,
    },
    preloadedState: {
      pokemonCards: initialState,
    },
  });
};

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });
  const { name, pic } = mockPokemon;
  const store = createTestStore();
  const mockDispatch = vi.fn();
  const user = userEvent.setup();
  it('should render component with correct description', async () => {
    vi.mocked(useAppSelector).mockReturnValue([name]);
    render(
      <Provider store={store}>
        <Card name={name} pic={pic} onClick={() => {}} />
      </Provider>
    );

    const nameElement = screen.getByText(name);
    expect(nameElement).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', pic);
  });
  it('should handle missing props gracefully', () => {
    render(
      <Provider store={store}>
        <Card name="" pic="" onClick={() => {}} />
      </Provider>
    );
    const nameElement = screen.getByTestId(`pokemon-name-id-`);
    expect(nameElement).toBeEmptyDOMElement();
    expect(nameElement).toHaveTextContent('');

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toBeNull();
    expect(image).toHaveAttribute('alt', 'empty');
  });
  it('should show checked card when pokemon is in array', () => {
    vi.mocked(useAppSelector).mockReturnValue([name]);
    render(<Card name={name} pic={pic} onClick={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
  it('should show not checked card when pokemon is not in array', () => {
    vi.mocked(useAppSelector).mockReturnValue(['test-pokemon']);
    render(<Card name={name} pic={pic} onClick={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
  it('should dispatch addItem when click to checkbox (was unchecked)', async () => {
    vi.mocked(useAppSelector).mockReturnValue([]);
    render(<Card name={name} pic={pic} onClick={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(addItem(name));
  });
  it('should dispatch removeItem when click to checkbox (was checked)', async () => {
    vi.mocked(useAppSelector).mockReturnValue([name]);
    render(<Card name={name} pic={pic} onClick={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(removeItem(name));
  });
  it('should handle multiple click correctly', async () => {
    vi.mocked(useAppSelector).mockReturnValue([]);
    const { rerender } = render(
      <Card name={name} pic={pic} onClick={() => {}} />
    );
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(addItem(name));

    vi.mocked(useAppSelector).mockReturnValue([name]);
    rerender(<Card name={name} pic={pic} onClick={() => {}} />);
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toBeCalledWith(removeItem(name));

    vi.mocked(useAppSelector).mockReturnValue([]);
    rerender(<Card name={name} pic={pic} onClick={() => {}} />);
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toBeCalledWith(addItem(name));
  });
});
