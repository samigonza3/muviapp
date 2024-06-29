import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import fetchMovies from '../Api/helpers';

const SearchResult = () => {
  const [movies, setMovies] = useState([]);

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

    return (
        <Card
            style= {{
                width: '250px',
                height: '550px',
                margin: '10px',
                borderRadius: '15px',
                overflow: 'hidden'

            }}
><CardMedia
    component="img"
    alt={movies.titulo}
    height="200"
    image={movies.img_imdb}
    title={movies.titulo}

/>
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
<CardContent>
<Typography variant='h6' gutterBottom>
    {movies.titulo}
</Typography>

</CardContent>
</div>
        </Card>



    );

};

export default SearchResult;