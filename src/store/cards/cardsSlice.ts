import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

export type PokemonName = string;

const initialState: PokemonName[] = [];

const cardsSlice = createSlice({
  name: 'pokemonCards',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PokemonName>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<PokemonName>) => {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    resetItems: () => {
      return [];
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const { addItem, removeItem, resetItems } = cardsSlice.actions;
export const selectorAll = (state: RootState) => state.pokemonCards;
export const selectorByName = (state: RootState, name: PokemonName) => {
  return state.pokemonCards.find((item) => item === name);
};
