import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { cardsReducer } from '@/store/cards/cardsSlice';

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

export const renderWithProviders = (ui: React.ReactElement) => {
  const store = createTestStore();
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  };
};
