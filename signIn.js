
// components/SignIn.js
import React,{ useState } from 'react';
import { auth, provider } from './firebase';
import { Box, Button, TextField, Typography } from '@mui/material';
import { signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [isSignUp,setIsSignUp]=useState(false);
  const SignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User:', user);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEmailPasswordAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Box 
    width="100vw"
    height="100vh"
    display={"flex"}
    justifyContent={"center"}
    flexDirection={"column"}
    alignItems={"center"}>
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      
      <Typography variant="h6">{isSignUp ? 'Sign Up' : 'Sign In'} with Email</Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: '300px' }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: '300px' }}
      />
      <Button
        variant="contained"
        onClick={handleEmailPasswordAuth}
        sx={{
          backgroundColor: "#B4C424",
          fontWeight: 400,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          color: "#FFFFFF", // Text color
          padding: "10px 20px", // Padding
          borderRadius: "8px", // Rounded corners
          fontFamily: "'Roboto', sans-serif", // Font family
          fontSize: "16px", // Font size
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow
          '&:hover': {
            backgroundColor: "#a83232", // Darker shade on hover
          },
        }}
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button
        onClick={() => setIsSignUp((prev) => !prev)}
        sx={{
          textTransform: 'none',
          fontFamily: "'Roboto', sans-serif",
          fontSize: "16px",
          textDecoration: 'underline',
          color: '#8b2020',
          '&:hover': {
            color: '#a83232',
          },
        }}
      >
        {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </Button>

      <Button
        variant="contained"
        onClick={SignIn}
        sx={{
          backgroundColor: "#8b2020",
          fontWeight: 400,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          color: "#FFFFFF", 
          padding: "10px 20px", 
          borderRadius: "8px", 
          fontFamily: "'Roboto', sans-serif", 
          fontSize: "16px", 
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", 
          '&:hover': {
            backgroundColor: "#a83232", // Darker shade on hover
          },
        }}
      >
        Sign In with Google
      </Button>
    </Box>
    </Box>
    
  );
};

export default SignIn;
