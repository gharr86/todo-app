import React from 'react';
import { render, fireEvent, waitFor, RenderResult } from '../../testUtils';

import Main from './main';
import { State, ToDoData } from '../../types';

import toDoListInitialState from '../../store/slices/toDoList/initialState';
import addToDoModalInitialState from '../../store/slices/addToDoModal/initialState';

import ApiService from '../../services/apiService';

jest.mock('../../services/apiService');

const ApiServiceMock = ApiService as jest.MockedClass<typeof ApiService>;

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

  test('when new element is added, it s rendered in the "To Do" section', async () => {
    const mockResponse: ToDoData[] = [
      {
        id: '123abc',
        title: 'Test ToDo',
        isDone: false,
      },
    ];
    ApiServiceMock.getToDoList.mockResolvedValueOnce({ data: mockResponse });

    const { getByRole, getByTestId } = renderMain();

    fireEvent.click(getByRole('button', { name: /add todo/i }));
    fireEvent.change(getByRole('textbox'), { target: { value: 'Test ToDo' } });
    fireEvent.click(getByRole('button', {name: /add/i }));

    await waitFor(() => {
      expect(getByTestId('todo-content').children).toHaveLength(1);
    });
  });

  test('when an element is marked as done, it passes to the "Done" section', async () => {
    const mockResponse: ToDoData[] = [
      {
        id: '123abc',
        title: 'Test ToDo',
        isDone: true,
      },
    ];
    ApiServiceMock.toggleToDo.mockResolvedValueOnce({ data: mockResponse });

    const { getByRole, getByTestId } = renderMain();

    fireEvent.click(getByRole('button', { name: /add todo/i }));
    fireEvent.change(getByRole('textbox'), { target: { value: 'Test ToDo' } });
    fireEvent.click(getByRole('button', {name: /add/i }));
    fireEvent.click(getByRole('checkbox', { name: /done/i }));

    await waitFor(() => {
      expect(getByTestId('todo-content').children).toHaveLength(0);
      expect(getByTestId('done-content').children).toHaveLength(1);
    });
  });
});
