import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';

function Copyright() {
  return (
    <Typography variant="body2" color="#fff">
      {'Copyright © '}
      <Link color="inherit" href="/">
       Pooking | Developed by Shay Dvir
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
   
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 0,
          backgroundColor: grey["500"],
        width:"100%",bottom:0,left:0,right:0,}}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
          </Typography>
          <Copyright />
        </Container>
      </Box>
  );
}