import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { useEffect, useState } from 'react';
import TemporaryDrawer from "./Components/Drawer"
import HomePage from './Components/HomePage';
import axios from 'axios';
import PhotoWidget from './Components/Widgets/PhotoWidget';
import LightsPage from './Components/LightsPage';
import FantasyFootballPage from './Components/FantasyFootballPage';


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
    var audio = new Audio('assets/mario-coin.mp3');
    audio.play()
    setOpen(newOpen);
  };

  const Clock = () => {
    const formatterDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format;

    const formatterTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format;

    const now = new Date()
    const [date, setDate] = useState(`${formatterDate(now)} ${formatterTime(now)}`);
    useEffect(() => {
      const tick = () => {
        const now = new Date()
        setDate(`${formatterDate(now)} ${formatterTime(now)}`);

      };
      const timerID = setInterval(() => tick(), 1000);
      return () => {
        clearInterval(timerID);
      };
    }, [formatterDate,formatterTime]);



    return <Typography variant='h5'>{date}</Typography>;
  };


  const router = createBrowserRouter([
    {
      element: (
        <>
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
              <Typography variant="h5" component="div">
                Matthew
              </Typography>
              <div style={{ marginLeft: "auto" }}></div>
              <Clock />
            </Toolbar>
          </AppBar>
          <TemporaryDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <HomePage photos={googlePhotos} />,
          errorElement: <div>whoopsidoodle</div>
        },
        {
          path: "/photos",
          element: <PhotoWidget photos={googlePhotos} />,
          errorElement: <div>whoopsidoodle</div>
        },
        {
          path: "/lights",
          element: <LightsPage />,
          errorElement: <div>whoopsidoodle</div>
        },
        {
          path: "/fantasy-football",
          element: <FantasyFootballPage />,
          errorElement: <div>whoopsidoodle</div>
        },

      ],
    },
  ]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main style={{ height: "95vh" }}>
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  );
}
export default App;