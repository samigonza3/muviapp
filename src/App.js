import React, { Component } from 'react';
import {
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';

import AppBar from './Components/AppBar';

import HomePage from './Pages/Home'
import MoviesPage from './Pages/Movies'
import NewMovie from './Pages/NewMovie'
import Dashboard from './Pages/Dashboard'
import Soon from './Pages/Soon'
import Search from './Pages/Search'
import Test from './Pages/EditMovie'

import Sinopsis from './Services/sinopsis'


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffff',
    },
    secondary: {
      main: '#000000',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Ajusta el valor alfa según tus preferencias
        backdropFilter: 'blur(5px)',  // Opcional: agrega desenfoque al fondo
      },
    },
  },
})

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <Router>
        <div style={{ backgroundColor: '#0000', backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,7,84,1) 65%, rgba(4,38,113,1) 100%)', minHeight: '100vh' }}>
        <AppBar />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/new" element={<NewMovie />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wordclouds" element={<Sinopsis />} />
          <Route path="/search" element={<Search />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/test" element={<Test />} />
          </Routes>

        </div>
        </Router>
      </ThemeProvider>
    );
  }
}



export default App;
