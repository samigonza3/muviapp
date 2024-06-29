import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@material-ui/core';

const SearchResult = ({ movie, onAddToFavorites }) => {
  // Verifica si hay información sobre el director
  const director = movie.credits && movie.credits.crew.find(person => person.job === 'Director');
  
  // Formatea los géneros en una cadena separada por comas
  const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';
  
  const handleAddToFavorites = () => {
    // Llama a la función proporcionada por el padre para añadir la película a favoritos
    onAddToFavorites(movie);
  };
  
  return (
    <Card
      style={{
        width: '250px',
        height: '550px',
        margin: '10px',
        color: '#ffffff',
        borderRadius: '15px',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        alt={movie.title}
        height="200"
        image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        title={movie.title}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Director: {director ? director.name : 'Desconocido'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Género(s): {genres}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Año de lanzamiento: {movie.release_date ? movie.release_date.substring(0, 4) : 'Desconocido'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {movie.overview}
          </Typography>
          <Typography variant="body2">
            Puntuación: {movie.vote_average} / 10
          </Typography>
        </CardContent>
        {/* Botón para agregar a favoritos */}
        <Button variant="contained" color="primary" onClick={handleAddToFavorites}>Agregar a favoritos</Button>
      </div>
    </Card>
  );
};

export default SearchResult;
