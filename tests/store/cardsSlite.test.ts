import {
  cardsReducer,
  addItem,
  removeItem,
  resetItems,
  selectorAll,
  selectorByName,
} from '@/store/cards/cardsSlice';
import type { RootState } from '@/store';
describe('CardsSlice', () => {
  const state: string[] = [];
  it('should handle add item', () => {
    const newState = cardsReducer(state, addItem('pikachu'));
    expect(newState).toEqual(['pikachu']);
  });
  it('should handle remove item', () => {
    const currentState = ['pikachu', 'spearow', 'gabite'];
    const newState = cardsReducer(currentState, removeItem('spearow'));
    expect(newState).toEqual(['pikachu', 'gabite']);
  });
  it('should do nothing when removing non-existing item', () => {
    const currentState = ['pikachu', 'spearow', 'gabite'];
    const newState = cardsReducer(currentState, removeItem('unknown-for-test'));
    expect(newState).toEqual(['pikachu', 'spearow', 'gabite']);
  });
  it('should reset state to empty array', () => {
    const currentState = ['pikachu', 'spearow', 'gabite'];
    const newState = cardsReducer(currentState, resetItems());
    expect(newState).toEqual([]);
  });
});
describe('CardsSlice Selectors', () => {
  const mockState = {
    pokemonCards: ['pikachu', 'gabite'],
  } as RootState;
  it('selectorsAll should return all items', () => {
    expect(selectorAll(mockState)).toEqual(['pikachu', 'gabite']);
  });
  it('selectorByName should return find item', () => {
    const card = 'pikachu';
    expect(selectorByName(mockState, card)).toEqual('pikachu');
  });
});
