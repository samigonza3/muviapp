import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import WordCloudComponent from '../Services/sinopsis'; // Importar el componente WordCloudComponent

function Dashboard() {
  const [ratings, setRatings] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies') // Reemplaza la URL con la ruta correcta de tu API
      .then(response => response.json())
      .then(data => {
        setRatings(data);
        setTotalRecords(data.length); // Establecer el número total de registros

        // Calcular el promedio de rating
        const totalRating = data.reduce((acc, movie) => acc + parseFloat(movie.rating), 0);
        const avgRating = totalRating / data.length;
        setAverageRating(avgRating.toFixed(1)); // Redondear el promedio a una decimal
      })
      .catch(error => console.error('Error fetching ratings:', error));
  }, []);

  // Función para contar el número de películas por calificación
  const countMoviesByRating = () => {
    const counts = Array.from({ length: 10 }, (_, index) => ({
      rating: (index + 1).toString(), // Convertir a cadena para asegurar compatibilidad con Recharts
      count: ratings.filter(movie => movie.rating === (index + 1).toString()).length,
    }));
    return counts;
  };

  const dataChartRatings = countMoviesByRating();

  return (
    <Container maxWidth="md">
      <Box my={3} textAlign="center">
        <Typography variant="h2" color="primary">
          Dashboard de Películas
        </Typography>
      </Box>

      {/* Tarjeta para mostrar el número de registros */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6"># de Pelis</Typography>
              <Typography variant="h4">{totalRecords}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta para mostrar el promedio de rating */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Rating Prom.</Typography>
              <Typography variant="h4">{averageRating}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de líneas de calificaciones */}
      <Box my={3} textAlign="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Calificaciones Promedio (Línea)</Typography>
                <LineChart width={800} height={300} data={dataChartRatings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Wordclouds */}
      <Box my={3} textAlign="center">
        <WordCloudComponent />
      </Box>
    </Container>
  );
}

export default Dashboard;
