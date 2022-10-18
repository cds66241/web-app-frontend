import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Navigation() {
  return (
    <Box 
      sx={{
        '& > :not(style) + :not(style)': {
          ml: 3,
        },
    }}>
      <Link href="/">Standings</Link>
      <Link href="results">Results</Link>
    </Box>
  );
}