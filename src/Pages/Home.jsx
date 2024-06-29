import { Container, Typography, Box } from '@material-ui/core';
import MovieCard from '../Components/MovieStepper';
import HomeButtons from '../Components/HomeButtons';

const Home = () => {

  return (
    <Container maxWidth="md">
      <Box my={3} textAlign="center" alignContent='center'>
        <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
          ¿Qué quieres hacer hoy?
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
