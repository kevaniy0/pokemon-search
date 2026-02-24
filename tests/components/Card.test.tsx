import { render, screen } from '@testing-library/react';
import Card from 'src/components/Card';
import { mockPokemon } from 'tests/__mocks__/pokemon';
import { cardsReducer } from '@/store/cards/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

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
  const { name, pic } = mockPokemon;
  const store = createTestStore();
  it('should render component with correct description', async () => {
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
});
