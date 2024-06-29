import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, CardActionArea, Modal, Button } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';

const MovieCard = ({ titulo, link_thumb, rating, year, sinopsis, link_imdb }) => {
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const adjustedRating = rating / 2;
    const shortenedTitle = titulo.length > 20 ? `${titulo.substring(0, 15)}...` : titulo;

    return (
        <React.Fragment>
            <Card
                style={{
                    width: '250px',
                    height: '550px',
                    margin: '10px',
                    padding: hovered ? '4px' : '0px',
                    backgroundColor: hovered ? 'rgba(51, 51, 51, 0.4)' : 'transparent',
                    color: '#ffffff',
                    transform: hovered ? 'scale(0.98)' : 'scale(1)',
                    transition: 'background-color 0.3s ease, width 0.3s ease, transform 0.3s ease',
                    borderRadius: '15px',
                    overflow: 'hidden',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenModal}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={titulo}
                        height="70%"
                        image={link_thumb}
                        style={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {shortenedTitle}
                        </Typography>
                        <Typography gutterBottom component="legend" style={{ fontWeight: 'bold' }}>
                            {year}
                        </Typography>
                        <Box component="fieldset" borderColor="transparent">
                            <Rating name="read-only" value={adjustedRating} readOnly max={5} />
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
                    <Typography variant="h5" id="modal-title" style={{ marginBottom: '10px' }}>{titulo}</Typography>
                    <Typography variant="subtitle1" id="modal-description" style={{ marginBottom: '10px' }}>Año: {year}</Typography>
                    <Typography variant="body1" style={{ marginBottom: '10px' }}>Rating: {adjustedRating}</Typography>
                    <Typography variant="body1" style={{ marginBottom: '10px' }}>Sinopsis: {sinopsis}</Typography>
                    <Button variant="outlined" color="secondary" href={link_imdb} target="_blank" rel="noopener noreferrer">Ver en IMDb</Button>
                    <Button variant="outlined" color="secondary"><EditIcon /></Button>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default MovieCard;
