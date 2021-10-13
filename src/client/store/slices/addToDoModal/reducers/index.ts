import { AddToDoModalSlice } from '../../../../types';

const reducers = {
  openAddToDoModal: (state: AddToDoModalSlice): void => {
    state.isOpen = true;
  },
  closeAddToDoModal: (state: AddToDoModalSlice): void => {
    state.isOpen = false;
  },
};

export default reducers;
