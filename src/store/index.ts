import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from './cards/cardsSlice';

export const store = configureStore({
  reducer: {
    pokemonCards: cardsReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore['getState']>;
