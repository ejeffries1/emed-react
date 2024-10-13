import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      role='presentation'
      sx={{
        flexGrow: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;