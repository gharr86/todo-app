import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { nanoid } from '@reduxjs/toolkit';
import { Modal, Box, TextField, Button } from '@mui/material';

import { closeAddToDoModal } from '../../store/slices/addToDoModal';
import { addToDo } from '../../store/slices/toDoList/reducers';

import { ToDoData } from '../../types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
};

const AddToDoModal = (): JSX.Element => {
  const { isOpen } = useAppSelector(state => state.addToDoModal);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');

  const onSubmit = () => {
    const newToDo: ToDoData = {
      title,
      isDone: false,
      id: nanoid(),
    };

    dispatch(addToDo(newToDo));
    setTitle('');
    dispatch(closeAddToDoModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeAddToDoModal())}
    >
      <Box sx={style}>
        <TextField
          label="Title"
          variant="standard"
          fullWidth
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!title.length}
          style={{ marginTop: 20 }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddToDoModal;
