import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Buscar película"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
