// Home.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../Components/MovieStepper';
import MovieTable from '../Components/Table';
import { fetchMovies } from '../Api/helpers';
import EditModal from '../Components/EditModal';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleEdit = (movieId) => {
    const movieToEdit = movies.find((movie) => movie._id === movieId);
    setEditingMovie(movieToEdit);
    setIsEditModalOpen(true);
  };

  const updateMovie = (updatedMovie) => {
    const updatedMovies = movies.map((movie) => (movie._id === updatedMovie._id ? updatedMovie : movie));
    setMovies(updatedMovies);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies();
        const sortedMovies = moviesData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        setMovies(sortedMovies);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedMovies = movies.filter((movie) => movie._id !== movieId);
        setMovies(updatedMovies);
        alert('Película eliminada exitosamente');
      } else {
        console.error('Error al eliminar la película');
      }
    } catch (error) {
      console.error('Error de red al intentar eliminar la película', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom:'45px' }} my={3} textAlign="center" alignContent='center'>
        <Typography variant="h2" color="primary">
          Mis Películas
        </Typography>
      </Box>



      <Box display="flex" alignContent='center' justifyContent="center" pb={4}>
      <MovieTable
        movies={movies}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete} 
      />
      </Box>

      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} movie={editingMovie} updateMovie={updateMovie} />
      <Box display="flex" justifyContent="center" mb={3}>
        <MovieCard />
      </Box>
    
    </Container>
  );
}

export default Movies;
