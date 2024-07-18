import React from 'react'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';




const Ban = styled('div')(() => ({

    backgroundImage: "url(./cryptowalll.jpg)",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",




}))

const BanContent = styled('div')(() => ({
    height: "400px",
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
}))

const Tagline = styled('div')(() => ({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
}))




const Banner = () => {


    return (
        <Ban>
            <Container>

                <BanContent>
                    <Tagline>
                        <Typography variant='h2' style={{
                            fontFamily: "Playwrite PE, cursive",
                            fontWeight: "bold",
                            marginBottom: 15,
                            textShadow: "4px 4px 4px rgba(0, 0, 0, 0.3)"


                        }}>Crypto Space</Typography>

                        <Typography variant='subtitle2' style={{
                            color: "white",
                            fontFamily: "Poppins",
                            lineHeight: "50px",
                            fontWeight: "bold",
                            letterSpacing: "5px",
                            fontSize: "20px",
                            textShadow: "4px 4px 4px rgba(0, 0, 0, 0.3)",
                            marginTop:"25px",
                        }}>Empowering Your Financial Future with Crypto Insights</Typography>
                    </Tagline>
                </BanContent>

                <Carousel />
            </Container>
        </Ban>
    )
}

export default Banner