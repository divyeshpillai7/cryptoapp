// import { onAuthStateChanged } from 'firebase/auth';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth, db } from './Firebase';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { CoinList } from "./config/api";
// import axios from "axios";

// // Creating a context object using createContext
// const Crypto = createContext();

// const CryptoContext = ({ children }) => {
//   const [currency, setCurrency] = useState('INR');
//   const [symbol, setSymbol] = useState('₹');
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Authentication states
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) setUser(user);
//       else setUser(null);

//       console.log(user);
//     })
//   }, [])


//   // Alert state
//   const [alert, setAlert] = useState({
//     open: false,
//     message: '',
//     type: 'success',
//   });

//   const fetchCoins = async () => {
//     setLoading(true);
//     const { data } = await axios.get(CoinList(currency));

//     setCoins(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (currency === "INR") setSymbol("₹");
//     else if (currency === "USD") setSymbol("$");

//     fetchCoins();

//   }, [currency]);

//   //watchlist state
//   const [watchlist, setwatchlist] = useState([])

//   useEffect(() => {
//     if (user) {

//       const coinRef = doc(db, "watchlist", user.uid);
//       var unSubscribe = onSnapshot(coinRef, coin => {
//         if (coin.exists()) {
//           setwatchlist(coin.data().coins)
//         } else {
//           console.log("No items in the Watchlist");
//         }
//       })
//       return () => {
//         unSubscribe();
//       }
//     }



//   }, [user])


//   return (
//     <Crypto.Provider
//       value={{
//         currency,
//         symbol,
//         setCurrency,
//         user,
//         setUser,
//         alert,
//         setAlert,
//         user,
//         watchlist,
//         coins,
//         loading,
//       }}
//     >
//       {children}
//     </Crypto.Provider>
//   );
// };

// export default CryptoContext;

// // Context consumer component
// export const CryptoState = () => {
//   return useContext(Crypto);
// };






import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase.js";
import axios from "axios";
import { CoinList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
