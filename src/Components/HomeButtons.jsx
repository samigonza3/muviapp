import { Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NextWeekIcon from '@mui/icons-material/NextWeek';

const MovieButtons = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Link to="/movies" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<MovieCreationOutlinedIcon />}
            color="secondary"
            style={{ margin: '10px' }}
          >
            Ver mis Películas
          </Button>
        </Link>

        <Link to="/new" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlinedIcon />}
            color="primary"
            style={{ margin: '10px' }}
          >
            Añadir Película
          </Button>
        </Link>
      </Container>
      <Container maxWidth="sm">
        <Link to="/soon" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<NextWeekIcon />}
            color="secondary"
            style={{ margin: '10px' }}
          >
            Próximas Pelis
          </Button>
        </Link>

        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            startIcon={<NextWeekIcon />}
            color="secondary"
            style={{ margin: '10px' }}
          >
            Dashboard
          </Button>
        </Link>
      </Container>
    </>
  );
}

export default MovieButtons;
