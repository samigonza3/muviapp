// EditModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    position: 'absolute',
    width: '650px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const EditModal = ({ isOpen, onClose, movie, updateMovie }) => {
  const classes = useStyles();

  const [editedMovie, setEditedMovie] = useState({
    titulo: '',
    director: '',
    genero: '',
    year: '',
    sinopsis: '',
    rating: '',
    link_imdb: '',
    link_thumb: '',
  });

  useEffect(() => {
    if (movie) {
      setEditedMovie(movie);
    }
  }, [movie]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movie._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMovie),
      });

      if (response.ok) {
        // Actualiza la película en el estado del componente principal
        updateMovie(editedMovie);
        onClose(); // Cierra el modal después de guardar cambios
      } else {
        console.error('Error al actualizar la película');
        // Puedes agregar lógica adicional para manejar el error
      }
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      // Puedes agregar lógica adicional para manejar el error
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container className={classes.modalContainer}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Título"
                name="titulo"
                value={editedMovie.titulo}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Director"
                name="director"
                value={editedMovie.director}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Género"
                name="genero"
                value={editedMovie.genero}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Año"
                name="year"
                value={editedMovie.year}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Sinopsis"
                name="sinopsis"
                value={editedMovie.sinopsis}
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
                value={editedMovie.rating}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Enlace IMDb"
                name="link_imdb"
                value={editedMovie.link_imdb}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enlace de la imagen"
                name="link_thumb"
                value={editedMovie.link_thumb}
                onChange={handleInputChange}
                fullWidth
                className={classes.inputField}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            className={classes.submitButton}
          >
            Guardar Cambios
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default EditModal;
