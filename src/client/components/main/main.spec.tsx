import React from 'react';
import { render, fireEvent, RenderResult } from '../../testUtils';
import '@testing-library/jest-dom/extend-expect';

import Main from './main';
import { State } from '../../types';

import toDoListInitialState from '../../store/slices/toDoList/initialState';
import addToDoModalInitialState from '../../store/slices/addToDoModal/initialState';

const basicState: State = {
  toDoList: toDoListInitialState,
  addToDoModal: addToDoModalInitialState,
};

const renderMain = (newState: {} = {}): RenderResult => {
  const preloadedState: State = {
    ...basicState,
    ...newState,
  };

  return render(<Main />, preloadedState);
};

describe('<Main />', () => {
  test('basic render', () => {
    renderMain();
  });

  test('when "Add Todo" button is clicked, modal is opened', () => {
    const { getByText } = renderMain();

    fireEvent.click(getByText(/add todo/i));

    expect(getByText(/title/i)).toBeInTheDocument();
  });

  test('when there is an undone todo, it s rendered in the "To Do" section', () => {
    const newState = {
      toDoList: {
        ...basicState.toDoList,
        data: [
          {
            id: '123abc',
            title: 'Test ToDo',
            isDone: false,
          },
        ],
      },
    };

    const { getByTestId } = renderMain(newState);

    expect(getByTestId('todo-content').children).toHaveLength(1);
  });

  test('when an element is marked as done, it passes to the "Done" section', () => {
    const newState = {
      toDoList: {
        ...basicState.toDoList,
        data: [
          {
            id: '123abc',
            title: 'Test ToDo',
            isDone: true,
          },
        ],
      },
    };

    const { getByTestId } = renderMain(newState);

    expect(getByTestId('done-content').children).toHaveLength(1);
  });
});
