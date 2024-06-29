import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import MovieCard from '../Components/Cards';
import { fetchSoonMovies } from '../Api/helpers';

const MovieStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchSoonMovies();
        const sortedMovies = moviesData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        setMovies(sortedMovies);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveStep((prevStep) => (prevStep + 1) % Math.ceil(movies.length / 3));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, isHovered]);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % Math.ceil(movies.length / 3));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + Math.ceil(movies.length / 3)) % Math.ceil(movies.length / 3));
  };

  const renderMoviesForStep = (step) => {
    const startIndex = step * 3;
    const endIndex = Math.min(startIndex + 3, movies.length);
    return movies.slice(startIndex, endIndex);
  };

  return (
    <Container 
      maxWidth="md" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{ color: 'white' }}
          >
            <ArrowBack />
          </IconButton>

          <Box display="flex" justifyContent="center">
            {renderMoviesForStep(activeStep).map((movie, index) => (
              <MovieCard
                key={index}
                titulo={movie.titulo}
                link_thumb={movie.link_thumb}
                year={movie.year}
                sinopsis={movie.sinopsis} 
                link_imdb={movie.link_imdb} 
                active={index === activeStep % 3}
              />
            ))}
          </Box>

          <IconButton
            disabled={activeStep === Math.ceil(movies.length / 3) - 1}
            onClick={handleNext}
            style={{ color: 'white' }} 
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

export default MovieStepper;
