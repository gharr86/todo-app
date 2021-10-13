import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import toDoListReducer from '../store/slices/toDoList';
import addToDoModalReducer from '../store/slices/addToDoModal';

import { State } from '../types';

const reducer = {
  toDoList: toDoListReducer,
  addToDoModal: addToDoModalReducer,
};

const render = (
  ui: ReactElement,
  preloadedState: State,
  renderOptions?: RenderOptions,
): RenderResult => {
  const Wrapper: React.FC = ({ children }) => 
    <Provider store={configureStore({ reducer, preloadedState })}>
      {children}
    </Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
