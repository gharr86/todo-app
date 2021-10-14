import React, { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { Button, Typography } from '@mui/material';

import ToDoElement from '../toDoElement/toDoElement';
import AddToDoModal from '../addToDoModal/addToDoModal';
import Spinner from '../spinner/spinner';

import { ToDoData } from '../../types';

import { openAddToDoModal } from '../../store/slices/addToDoModal';

const Main = (): JSX.Element => {
  const toDoList = useAppSelector(state => state.toDoList.data);
  const requestStatus = useAppSelector(state => state.toDoList.status);
  const dispatch = useAppDispatch();

  return (
    <main className="main">
      <section className="main__top">
        <Button
          variant="contained"
          fullWidth
          onClick={() => dispatch(openAddToDoModal())}
        >
          Add ToDo
        </Button>
      </section>
      <section className="main__todo-list">
        <div className="main__todo-list__todo">
          <Typography variant="h4" align="center">
            To Do
          </Typography>
          <div
            className="main__todo-list__todo__content"
            data-testid="todo-content"
          >
            {
              toDoList.map((toDo: ToDoData): ReactElement | boolean => !toDo.isDone
                && (
                  <ToDoElement
                    key={toDo.id}
                    {...toDo}
                  />
                ))
            }
          </div>
        </div>
        <div className="main__todo-list__done">
          <Typography variant="h4" align="center">
            Done
          </Typography>
          <div
            className="main__todo-list__done__content"
            data-testid="done-content"
          >
            {
              toDoList.map((toDo: ToDoData): ReactElement | boolean => toDo.isDone
                && (
                  <ToDoElement
                    key={toDo.id}
                    {...toDo}
                  />
                ))
            }
          </div>
        </div>
      </section>
      <AddToDoModal />
      {
        requestStatus === 'fetching'
        && <Spinner />
      }
    </main>
  );
}

export default Main;
