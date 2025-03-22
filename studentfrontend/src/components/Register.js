import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Container, Paper, Button, Box } from '@mui/material';

const useStyles = makeStyles(() => ({
  paperStyle: {
    padding: '50px 20px',
    width: 600,
    margin: '20px auto',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#125aa1',
    },
  },
  studentList: {
    textAlign: 'center',
  },
  studentCard: {
    margin: '10px auto',
    padding: '15px',
    width: '80%',
    textAlign: 'center',
  },
}));

export default function User() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    const user = { name, username, password };
    console.log(user);
    fetch('http://localhost:8080/user/adduser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(() => {
      console.log('New user added');
    });
  };

  return (
    <Container>
      <Paper elevation={3} className={classes.paperStyle}>
        <h1 style={{ color: '#1976d2', marginBottom: '20px' }}>Register Here</h1>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            sx={{ mb: 2 }} // Adds margin-bottom for spacing
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            sx={{ mb: 2 }} // Adds margin-bottom for spacing
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password" // Hides password input
            fullWidth
            value={password}
            sx={{ mb: 2 }} // Adds margin-bottom for spacing
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.buttonStyle}
            sx={{ mt: 2 }} // Adds margin-top for spacing
            onClick={handleClick}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
