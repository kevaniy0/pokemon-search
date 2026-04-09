import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from './cards/cardsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonAPI } from '@/services/PokemonAPI';

export const store = configureStore({
  reducer: {
    pokemonCards: cardsReducer,
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});
setupListeners(store.dispatch);
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore['getState']>;
