// c4fe2db02233fca403828fd0f92f2123

import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar';
import SearchResult from '../Components/SearchResult';
import axios from 'axios'; // Asegúrate de haber instalado axios
import { Container, Typography, Box } from '@material-ui/core';

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = (query) => {
      // Realizar solicitud a la API de TMDB con la consulta del usuario (query)
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4fe2db02233fca403828fd0f92f2123&query=${query}`)
        .then(response => {
          // Guardar toda la información de la búsqueda en la consola
          console.log(response.data);
          // Actualizar los resultados de búsqueda en el estado
          setSearchResults(response.data.results);
        })
        .catch(error => {
          console.error('Error al buscar películas:', error);
        });
    };

  return (
<Container maxWidth="xl">
      <Box my={3} textAlign="center" alignContent="center">      
      <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
            Buscador de películas</Typography>
        </Box>
        <Box display="flex" justifyContent="center" padding="30px 30px 30px 30px" marginBottom="15px">
      <SearchBar onSearch={handleSearch} />
      </Box>

      <Box display="flex" flexWrap='wrap' justifyContent="center" padding="30px 30px 30px 30px" marginBottom="15px">
        {searchResults.map(movie => (
          <SearchResult key={movie.id} movie={movie} />
        ))}
      </Box>
    </Container>
  );
};

export default App;

  