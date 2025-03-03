import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material';
import { auth, db } from '../../Firebase.js';
import { signOut } from 'firebase/auth';
import { numberWithCommas } from '../banner/Carousel';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';

export default function UserSideBar() {
    const [state, setState] = useState({

        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    //profile styles component
    const Profile = styled('div')(() => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",

    }))

    //watchlist styled component
    const Watchlist = styled('div')(() => ({
        flex: 1,
        width: "100%",
        // backgroundColor: "grey",
        border: '1px solid #0FACA6',
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",

    }))


    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !",
        });

        toggleDrawer();
    };

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
          await setDoc(
            coinRef,
            { coins: watchlist.filter((wish) => wish !== coin?.id) },
            { merge: true }
          );
    
          setAlert({
            open: true,
            message: `${coin.name} Removed from the Watchlist !`,
            type: "success",
          });
        } catch (error) {
          setAlert({
            open: true,
            message: error.message,
            type: "error",
          });
        }
      };





    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)} style={{
                        height: 38,
                        width: 38,
                        marginLeft: 15,
                        cursor: "pointer",
                        backgroundColor: "white",
                    }}

                        src={user.photoURL}
                        alt={user.displayName || user.email}

                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div style={{
                            width: 350,
                            padding: 25,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            fontFamily: "Poppins",
                            backgroundColor: "#121212",
                        }}>
                            <Profile>
                                <Avatar style={{
                                    width: 200,
                                    height: 200,
                                    cursor: "pointer",
                                    backgroundColor: "#D2F5F4",
                                    objectFit: "contain",
                                }} src={user.photoURL}
                                    alt={user.displayName || user.email} />

                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <Watchlist>
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                    {
                                        coins.map(coin => {
                                            if (watchlist.includes(coin.id))
                                                return (
                                                    <div style={{
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        color: "black",
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        backgroundColor: "#EEBC1D",
                                                        boxShadow: "0 0 3px black",
                                                    }}>

                                                        <span>{coin.name}</span>
                                                        <span style={{ display: "flex", gap: 8 }}>
                                                            {symbol}{" "}
                                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                                            <AiFillDelete
                                                                style={{ cursor: "pointer" }}
                                                                fontSize="16"
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </span>

                                                    </div>)
                                        })
                                    }

                                </Watchlist>
                            </Profile>
                            <Button
                                variant="contained"
                                onClick={logOut}
                                style={{
                                    height: "8%",
                                    width: "100%",
                                    backgroundColor: "#01141B",
                                    marginTop: 20,
                                    color: 'white'
                                }}
                            >
                                Log Out
                            </Button>

                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
