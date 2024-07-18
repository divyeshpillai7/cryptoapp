import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Coinpage from './pages/Coinpage'
import { styled } from '@mui/material/styles';
import Alert from './components/Alert';

function App() {

  //using material ui v5
  //creating a custom styled component(Root) using the styled utility(function)

  const Div = styled('div')(() => ({
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh'
  }))

  return (
    <><Div>
      <Header />


      <Routes>

        <Route path='/' Component={Home} />
        <Route path='/coins/:id' Component={Coinpage} />

      </Routes>

    </Div><Alert /></>
  );
}

export default App;
