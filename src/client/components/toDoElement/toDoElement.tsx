import React from 'react';
import { useAppDispatch } from '../../hooks';

import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { toggleToDo } from '../../store/slices/toDoList/reducers';

import { ToDoData } from '../../types';

const ToDoElement = ({
  id,
  title,
  isDone,
}: ToDoData): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Card
      className="todo-element"
      sx={{ width: 300 }}
    >
      <CardContent>
        <Typography sx={{ mb: 1 }}>
          {title}
        </Typography>
        <FormControlLabel
          label="done"
          control={
            <Checkbox
              checked={isDone}
              onChange={() => dispatch(toggleToDo(id))}
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default ToDoElement;
