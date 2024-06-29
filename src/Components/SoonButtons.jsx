import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalada esta dependencia
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NextWeekIcon from '@mui/icons-material/NextWeek';

const MovieButtons = () => {

  return (
    <>


      <Link to="/new">
      <Button
        variant="contained"
        startIcon={<AddCircleOutlinedIcon />}
        color="primary"
        style={{ margin: '10px 10px 10px 10px' }}
      >
        Añadir Película
      </Button>
      </Link>


    </>
  );
}

export default MovieButtons;