import React from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { styled, Typography, LinearProgress, Button } from '@mui/material';
import CoinInfo from '../components/CoinInfo';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase.js';



const Coinpage = () => {

  const { id } = useParams();
  const [coin, setcoin] = useState()
  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  //function to fetch singlecoin from api
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setcoin(data);
  }

  useEffect(() => {
    fetchCoin();

  }, [])

  // cont and sidebar styles components 
  const Cont = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },

  }))

  const Sidebar = styled('div')(({ theme }) => ({
    width: "35%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid white",
    padding: 25,

  }))

  const MarketData = styled('div')(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },

  }))

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;


  //watchlist

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
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
    <Cont>
      {/* sidebar  */}
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant='h3' style={{
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Poppins",
        }} >{coin?.name}
        </Typography>

        <Typography variant='subtitle1' style={{
          width: "100%",
          fontFamily: "Poppins",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",

        }}>
          {coin && parse(coin.description ? coin.description.en.split(". ")[0] : '')}
        </Typography>

        <MarketData>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Poppins",

            }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{
              fontFamily: "Poppins",
            }}>
              {coin?.market_cap_rank}

            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Poppins",

            }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{
              fontFamily: "Poppins",
            }}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}

            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Poppins",

            }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{
              fontFamily: "Poppins",
            }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}M

            </Typography>
          </span>

        </MarketData>
        {user && (
          <Button
            variant="outlined"
            style={{
              fontFamily:'Poppins',
              width: "100%",
              height: 40,
              color: 'white',
              border: "2px solid #01141B",
              borderRadius: 5,
              backgroundColor: inWatchlist ? "#ff0000" : "#043331",
            }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        )}



      </Sidebar>

      {/* chart  */}
      <CoinInfo coin={coin} />



    </Cont>



  )
}

export default Coinpage