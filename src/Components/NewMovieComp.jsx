import React, { useState } from 'react';
import { TextField, Button, Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const MovieForm = ({ onSubmit }) => {
  const classes = useStyles();

  const [newMovie, setNewMovie] = useState({
    titulo: '',
    director: '',
    genero: '',
    year: '',
    sinopsis: '',
    rating: '',
    link_imdb: '',
    link_thumb: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleCreateNewContent = async () => {
    try {
      await onSubmit(newMovie);
      setNewMovie({
        titulo: '',
        director: '',
        genero: '',
        year: '',
        sinopsis: '',
        rating: '',
        link_imdb: '',
        link_thumb: '',
      });
      alert('Película creada exitosamente.');
    } catch (error) {
      console.error('Error al crear la película:', error);
      alert('Error al crear la película. Por favor, intenta de nuevo.');
    }
  };

  return (
    
    <Container className={classes.formContainer}>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Título"
              name="titulo"
              value={newMovie.titulo}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Director"
              name="director"
              value={newMovie.director}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Género"
              name="genero"
              value={newMovie.genero}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Año"
              name="year"
              value={newMovie.year}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sinopsis"
              name="sinopsis"
              value={newMovie.sinopsis}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rating"
              name="rating"
              value={newMovie.rating}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Enlace IMDb"
              name="link_imdb"
              value={newMovie.link_imdb}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Enlace de la imagen"
              name="link_thumb"
              value={newMovie.link_thumb}
              onChange={handleInputChange}
              fullWidth
              className={classes.inputField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewContent}
          className={classes.submitButton}
        >
          Crear Película
        </Button>
      </form>
    </Container>
  );
};

export default MovieForm;