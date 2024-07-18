import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setAlert } = CryptoState();

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: 'success',
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Box p={3} sx={style}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#2EDCE3" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
