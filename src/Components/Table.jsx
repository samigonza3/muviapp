import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, IconButton } from '@material-ui/core';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const MovieTable = ({ movies, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleEdit, handleDelete }) => {
  return (
    <Paper style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', margin: '0' }}>
      <TableContainer>
        <Table style={{ width: '900px' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Título</TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Año</TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Director</TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie, index) => (
              <TableRow key={movie._id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                <TableCell>{movie.titulo}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(movie._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(movie._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={movies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MovieTable;