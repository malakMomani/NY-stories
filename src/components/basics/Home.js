import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect } from 'react';

export default function Home() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                Home Page
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </React.Fragment>
    );
}