/* eslint-disable react/jsx-handler-names */

import Image from '../../shared/components/Image';
import { Box, Typography } from '@mui/material';
import	abduction from '../../assets/abduction.png'

export default function NotFound(): JSX.Element {


  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      textAlign="center" 
      bgcolor="background.default"
      p={4}
    >
      <Image src={abduction}  />

      <Typography variant="h1" color="text.secondary" fontWeight="bold" className="mt-8">
        Vish...
      </Typography>
      
      <Typography variant="h6" color="text.secondary" fontWeight="500" className="mt-4">
        Esta página foi abduzida <br /> ou não está carregando.
      </Typography>
    </Box>
  );
}
