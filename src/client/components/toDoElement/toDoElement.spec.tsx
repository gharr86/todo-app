import React from 'react';
import { render, RenderResult } from '../../testUtils';

import ToDoElement from './toDoElement';
import { ToDoData, State } from '../../types';

import toDoListInitialState from '../../store/slices/toDoList/initialState';
import addToDoModalInitialState from '../../store/slices/addToDoModal/initialState';

const basicState: State = {
  toDoList: toDoListInitialState,
  addToDoModal: addToDoModalInitialState,
};

const basicProps: ToDoData = {
  id: '123abc',
  title: 'Test Todo',
  isDone: false,
};

const renderToDoElement = (
  newProps: {} = {},
  newState: {} = {},
): RenderResult => {
  const props: ToDoData = {
    ...basicProps,
    ...newProps,
  };
  const preloadedState: State = {
    ...basicState,
    ...newState,
  };

  return render(<ToDoElement {...props} />, preloadedState);
};

describe('<ToDoElement />', () => {
  test('basic render', () => {
    renderToDoElement();
  });
});
