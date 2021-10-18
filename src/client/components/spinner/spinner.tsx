import React from 'react';

import { CircularProgress, Box } from '@mui/material';
import { SxProps } from '@mui/system';

const style: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'rgba(100, 100, 100, 0.3)',
};

const Spinner = (): JSX.Element => {
  return (
    <Box
      data-testid="spinner"
      sx={style}
    >
      <CircularProgress />
    </Box>
  )
};

export default Spinner;
