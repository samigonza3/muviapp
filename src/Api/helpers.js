import axios from 'axios';

const fetchMovies = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/movies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

const fetchSoonMovies = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/soonmovies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching soon movies:', error);
        throw error;
    }
};

export {fetchMovies, fetchSoonMovies} ;
