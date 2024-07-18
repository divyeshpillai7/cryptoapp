import { AppBar, Box, Button, Modal, styled, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import { CryptoState } from '../../CryptoContext';

const AuthModal = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 5,
        p: 0, // Ensure no padding for the outer box
    };

    const tabsContainerStyle = {
        borderRadius: '10px 10px 0 0', // Apply border radius to the top only
        bgcolor: 'background.paper',
        boxShadow: 24,

    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {setAlert} = CryptoState();

    //google authentication

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth,googleProvider).then((res)=>{
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${res.user.email}`,
                type: "success",
              });
      
              handleClose();
        }).catch((error)=>{
            setAlert({
                open: true,
                message: error.message,
                type: "error",
              });
              return;
        })
     }

    const Bottom = styled('Box')(() => ({
        padding: 24,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
        color:'white',
    }))

    return (
        <div>
            <Button
                variant='contained'
                style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid #2EDCE3' }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AppBar position='static' sx={tabsContainerStyle}>
                        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
                            <Tab label='Login' style={{ color: 'black' }} />
                            <Tab label='Sign Up' style={{ color: 'black' }} />
                        </Tabs>
                    </AppBar>
                    <Box p={3}> {/* Padding for the inner content */}
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                    </Box>
                    <Bottom>
                        <span>OR</span>
                        <GoogleButton style={{ width: "100%", outline: "none" }} onClick={signInWithGoogle} />


                    </Bottom>
                </Box>
            </Modal>
        </div>
    );
}

export default AuthModal;
