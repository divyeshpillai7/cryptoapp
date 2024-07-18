// Login.js
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the fields',
        type: 'error',
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
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

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#2EDCE3' }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
