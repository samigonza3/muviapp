import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const linkStyles = {
    textDecoration: 'none', 
    color: 'inherit',
    
  };

  return (
    <AppBar position="static">
      <Typography variant="h5" color="primary" style={{ margin: '10px 10px 10px 10px', padding: '10px 10px 10px 10px' }}>
        <Link to="/" style={linkStyles}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SlideshowOutlinedIcon style={{ marginRight: '5px' }} />
            MuviApp
          </div>
        </Link>
      </Typography>
    </AppBar>
  );
}

export default AppHeader;
