import { Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../Components/MovieStepperSoon';
import HomeButtons from '../Components/SoonButtons';

const Home = () => {

  return (
    <Container maxWidth="md">
      <Box my={3} textAlign="center" alignContent='center'>
        <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
          Próximas Películas por Ver
        </Typography>
      </Box>
      <Box my={3} textAlign="center" alignContent='center' marginBottom={8}>
        <HomeButtons />
      </Box>
      <Box display="flex" justifyContent="center">
        <MovieCard />
      </Box>
      
    </Container>
  );
}

export default Home;
