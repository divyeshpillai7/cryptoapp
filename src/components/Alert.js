import React, { Fragment } from 'react';
import { Snackbar, Button, IconButton } from '@mui/material';
import { CryptoState } from '../CryptoContext';
// import CloseIcon from '@mui/icons-material/CloseIcon';

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </Fragment>
  );

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={alert.message}
      action={action}
    />
  );
};

export default Alert;
