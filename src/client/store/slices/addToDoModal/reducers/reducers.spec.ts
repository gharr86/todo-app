import reducer, {
  openAddToDoModal,
  closeAddToDoModal,
} from '..';

import { AddToDoModalSlice } from '../../../../types';

describe('toDoReducer', () => {
  test('openAddToDoModal', () => {
    const initialState: AddToDoModalSlice = {
      isOpen: false,
    };
    const resultState: AddToDoModalSlice = reducer(initialState, openAddToDoModal());

    expect(resultState.isOpen).toBe(true);
  });

  test('closeAddToDoModal', () => {
    const initialState: AddToDoModalSlice = {
      isOpen: true,
    };
    const resultState: AddToDoModalSlice = reducer(initialState, closeAddToDoModal());

    expect(resultState.isOpen).toBe(false);
  });
});
