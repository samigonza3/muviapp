import React, { useState, useEffect, useMemo } from 'react';
import WordCloud from 'react-wordcloud';
import { Container, Grid, Typography, Box } from '@material-ui/core';

// Lista de stopwords en español
const stopwords = ['de', 'da', '12', 'one', 'dan', 'la', 'of', 'to', 'es', 'the','son', 'in', 've', 'is', 'película', 'embargo,', 'través', 'cómo', 'historia', 'cuenta', 'pelicula','"the', 'are', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'estuviera', 'estuvieras', 'estuviéramos', 'estuvierais', 'estuvieran', 'estuviese', 'estuvieses', 'estuviésemos', 'estuvieseis', 'estuviesen', 'estando', 'estado', 'estada', 'estados', 'estadas'];
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 85],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 2,
  rotations: 3,
  rotationAngles: [0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

const extractWords = (movies, field) => {
  return movies.reduce((acc, movie) => {
    const words = movie[field].split(/\s+/)
      .filter(word => !stopwords.includes(word.toLowerCase()));
    return [...acc, ...words];
  }, []);
};

const WordCloudComponent = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const wordsFromSinopsis = useMemo(() => extractWords(movies, 'sinopsis'), [movies]);
  const wordsFromTitulo = useMemo(() => extractWords(movies, 'titulo'), [movies]);
  const wordsFromGenres = useMemo(() => extractWords(movies, 'genero'), [movies]);
  const wordsFromDirector = useMemo(() => extractWords(movies, 'director'), [movies]);

  const wordFrequencySinopsis = useMemo(() => {
    return wordsFromSinopsis.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  }, [wordsFromSinopsis]);

  const wordFrequencyTitulo = useMemo(() => {
    return wordsFromTitulo.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  }, [wordsFromTitulo]);

  const wordFrequencyGenres = useMemo(() => {
    return wordsFromGenres.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  }, [wordsFromGenres]);

  const wordFrequencyDirector = useMemo(() => {
    return wordsFromDirector.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  }, [wordsFromDirector]);

  const wordCloudDataSinopsis = useMemo(() => {
    return Object.entries(wordFrequencySinopsis).map(([text, value]) => ({ text, value }));
  }, [wordFrequencySinopsis]);

  const wordCloudDataTitulo = useMemo(() => {
    return Object.entries(wordFrequencyTitulo).map(([text, value]) => ({ text, value }));
  }, [wordFrequencyTitulo]);

  const wordCloudDataGenres = useMemo(() => {
    return Object.entries(wordFrequencyGenres).map(([text, value]) => ({ text, value }));
  }, [wordFrequencyGenres]);

  const wordCloudDataDirector = useMemo(() => {
    return Object.entries(wordFrequencyDirector).map(([text, value]) => ({ text, value }));
  }, [wordFrequencyDirector]);

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box my={3} textAlign="center" alignContent='center'>
              <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
                Directores
              </Typography>
            </Box>
            <Box my={3} textAlign="center" alignContent='center'>
              <WordCloud options={options} words={wordCloudDataDirector} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box my={3} textAlign="center" alignContent='center'>
              <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
                Géneros
              </Typography>
            </Box>
            <Box my={3} textAlign="center" alignContent='center'>
              <WordCloud options={options} words={wordCloudDataGenres} />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box my={3} textAlign="center" alignContent='center'>
              <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
                Títulos
              </Typography>
            </Box>
            <Box my={3} textAlign="center" alignContent='center'>
              <WordCloud options={options} words={wordCloudDataTitulo} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box my={3} textAlign="center" alignContent='center'>
              <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
                Géneros
              </Typography>
            </Box>
            <Box my={3} textAlign="center" alignContent='center'>
              <WordCloud options={options} words={wordCloudDataGenres} />
            </Box>
          </Grid>
        </Grid>
        <Box my={3} textAlign="center" alignContent='center'>
          <Typography fontFamily="Roboto, sans-serif" variant="h2" color="primary">
            Sinopsis
          </Typography>
        </Box>
        <Box my={3} textAlign="center" alignContent='center'>
          <WordCloud options={options} words={wordCloudDataSinopsis} />
        </Box>
      </Container>
    </>
  );
};

export default WordCloudComponent;