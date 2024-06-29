import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../Components/MovieStepper';
import MovieForm from '../Components/NewMovieComp';

import { fetchMovies } from '../Api/helpers';

const Home = () => {
    const initialMovieState = {
        titulo: '',
        director: '',
        genero: '',
        year: '',
        sinopsis: '',
        rating: '',
        link_imdb: '',
        link_thumb: '',
      };

  const [newMovie, setNewMovie] = useState(initialMovieState);


  const handleCreateNewContent = async (movieData) => {
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        console.log('Nueva película creada con éxito.');
        setNewMovie(initialMovieState);
      } else {
        console.error('Error al crear la nueva película.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies();
        const sortedMovies = moviesData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        const topFourMovies = sortedMovies.slice(0, 4);
        setTopMovies(topFourMovies);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={3} textAlign="center" alignContent="center">
        <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
          Añadir Películas
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" padding="30px 30px 30px 30px" marginBottom="15px">
      <MovieForm
  onSubmit={handleCreateNewContent}
  values={newMovie}
/>      </Box>
      <Box display="flex" justifyContent="center">
        <MovieCard movies={topMovies} />
      </Box>


    </Container>
  );
};

export default Home;
