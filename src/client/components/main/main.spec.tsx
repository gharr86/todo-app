import React from 'react';
import { render, fireEvent, RenderResult } from '../../testUtils';

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

  test('when new element is added, it s rendered in the "To Do" section', () => {
    const { getByRole, getByTestId } = renderMain();

    fireEvent.click(getByRole('button', { name: /add todo/i }));
    fireEvent.change(getByRole('textbox'), { target: { value: 'Test ToDo' } });
    fireEvent.click(getByRole('button', {name: /add/i }));

    expect(getByTestId('todo-content').children).toHaveLength(1);
  });

  test('when an element is marked as done, it passes to the "Done" section', () => {
    const { getByRole, getByTestId } = renderMain();

    fireEvent.click(getByRole('button', { name: /add todo/i }));
    fireEvent.change(getByRole('textbox'), { target: { value: 'Test ToDo' } });
    fireEvent.click(getByRole('button', {name: /add/i }));
    fireEvent.click(getByRole('checkbox', { name: /done/i }));
    
    expect(getByTestId('todo-content').children).toHaveLength(0);
    expect(getByTestId('done-content').children).toHaveLength(1);
  });
});
