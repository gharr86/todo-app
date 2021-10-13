import React from 'react';
import { render, fireEvent, RenderResult } from '../../testUtils';

import AddToDoModal from './addToDoModal';
import { State } from '../../types';

import toDoListInitialState from '../../store/slices/toDoList/initialState';
import addToDoModalInitialState from '../../store/slices/addToDoModal/initialState';

const basicState: State = {
  toDoList: toDoListInitialState,
  addToDoModal: addToDoModalInitialState,
};

const renderAddToDoModal = (newState: {} = {}): RenderResult => {
  const preloadedState: State = {
    ...basicState,
    ...newState,
  };

  return render(<AddToDoModal />, preloadedState);
};

describe('<AddToDoModal />', () => {
  test('basic render', () => {
    renderAddToDoModal();
  });

  test('when submit button is clicked, modal is closed', () => {
    const newState = {
      addToDoModal: {
        isOpen: true,
      },
    };
    const newValue: string = 'Test ToDo';
    const { getByRole, queryByText } = renderAddToDoModal(newState);
    
    fireEvent.change(getByRole('textbox'), { target: { value: newValue } });
    fireEvent.click(getByRole('button'));

    expect(queryByText(newValue)).not.toBeInTheDocument();
  });

  test('when textfield has no value, submit button is disabled', () => {
    const newState = {
      addToDoModal: {
        isOpen: true,
      },
    };
    const { getByRole } = renderAddToDoModal(newState);

    expect(getByRole('button')).toBeDisabled();
  });

  test('when textfield has value, submit button is not disabled', () => {
    const newState = {
      addToDoModal: {
        isOpen: true,
      },
    };
    const { getByRole } = renderAddToDoModal(newState);

    fireEvent.change(getByRole('textbox'), { target: { value: 'Test ToDo' } });

    expect(getByRole('button')).not.toBeDisabled();
  });
});
