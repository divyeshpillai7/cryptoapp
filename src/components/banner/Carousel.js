import React from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { TrendingCoins } from './../../config/api'
import { CryptoState } from '../../CryptoContext';
import { useState } from 'react';
import { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const Drawer = styled('div')(() => ({
    display: "flex",
    height: "50%",
    alignItems: 'center',
    // border: '2px solid red'
    margin:'15px',
}))

const CarouselItem = styled('div')(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration:"none",
}))



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {

    const [trending, settrending] = useState([]);

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        settrending(data)
    }

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();

    }, [currency])

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link style={{
                textDecoration: 'none',
                color: 'inherit',
            }} to={`/coins/${coin.id}`}>
                <CarouselItem>


                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height='80'
                        style={{ marginBottom: 10 }}


                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span style={{
                            color: profit>0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                        }}>
                            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%

                        </span>
                    </span>

                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </CarouselItem>

            </Link >
        )
    })

    const responsive = {
        0: {
            items: 2,

        },
        512: {
            items: 4,

        }

    }

    return (
        <Drawer>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}


            />
        </Drawer>
    )
}

export default Carousel