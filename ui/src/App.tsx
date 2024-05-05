import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



import { useEffect, useState } from 'react';
import TemporaryDrawer from "./Components/Drawer"
import HomePage from './Components/HomePage';
import axios from 'axios';




const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#003153',
    },
    secondary: {
      main: '#d945cd',
    },
  },
});


function App() {
  const [googlePhotos, setGooglePhotos] = useState<string[]>([])
  const [isDrawerOpen, setOpen] = useState<boolean>(false);

  const getGooglePhotos = async () => {
    try {
      console.log("Calling photos api to get albums...")
      const response = await axios.get("/api/photos")
      setGooglePhotos(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getGooglePhotos();

    const intervalCall = setInterval(() => {
      getGooglePhotos();
    }, 60000 * 500); // 60 sec per album ~500 photos
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ height: '5vh' }} >
        <Toolbar variant="dense" sx={{ minHeight: "0%" }} >
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Matthew
          </Typography>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <main>
        <HomePage photos={googlePhotos} />
      </main>
    </ThemeProvider>
  );
}

export default App;
