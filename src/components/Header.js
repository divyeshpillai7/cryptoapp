import { AppBar, Box, Container, createTheme, MenuItem, Select, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'

import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';



const Title = styled('div')(() => ({
  // "#2CBDD3",
  flex: "1",
  fontFamily: "Playwrite PE, cursive",
  fontWeight: "900",
  color: "white",
  cursor: "pointer",
  fontSize: "25px",



}))

const NavItems = styled('div')(() => ({
  // "#2CBDD3",
  flex: "1",
  fontFamily: "Poppins",

  cursor: "pointer",
  '&:hover': {
    color: '#2cd3c4',
  },
  



}))


const Header = () => {

  const { currency, setCurrency, user } = CryptoState();
  console.log(currency)

  //darktheme

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  // //creating a history object using useHIstory()hook that provides us with methods to
  // //1.push() - navigate to a route
  // //2.replace() - replace with a route
  // //3.goback() - go back to the previous route (history stack)
  // const history = useHistory();

  // //define a function to navigate to the homepage
  // const navigateToHome = ()=>{
  //   history.push("/"); //navigate to the route "/"(homepage)
  // };


  //useHistory is replaced by useNavigate() in the latest version of react-router-dom

  const navigate = useNavigate();

  //creating a navigate object using useNavigate()hook that provides us with methods to
  //1.navigate() - navigate to a route
  //2.navigate("path",{replace:true}) - replace with a route
  //3.navigate(-1) - go back to the previous route (history stack)

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>


      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>

            {/* Box component is a container like <div>  */}
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>

              <Typography onClick={navigateToHome}><Title>Crypto Space</Title></Typography>

              {/* <Typography onClick={navigateToHome}><NavItems>Home</NavItems></Typography> */}


              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

              <Select variant='outlined' style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >

                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>

              {user? <UserSideBar/>  :  <AuthModal/>}
              </Box>

            </Box>
          </Toolbar>
        </Container>

      </AppBar>
    </ThemeProvider >


  )
}

export default Header