import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TemporaryDrawer from './Components/Drawer';
import HomePage from './Components/Pages/HomePage';
import PhotoWidget from './Components/Widgets/PhotoWidget';
import LightsPage from './Components/LightsPage';
import axios from 'axios';
import AppBarHeader from './Components/AppBar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#003153',
    },
    secondary: {
      main: '#d945cd',
    },
  },
});

function App() {
  const [googlePhotos, setGooglePhotos] = useState<string[]>([]);
  const [isDrawerOpen, setOpen] = useState<boolean>(false);

  const getGooglePhotos = async () => {
    try {
      console.log('Calling photos api to get albums...');
      const response = await axios.get('/api/photos');
      setGooglePhotos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const router = createBrowserRouter([
    {
      element: (
        <>
          <AppBarHeader toggleDrawer={toggleDrawer} />
          <TemporaryDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: <HomePage photos={googlePhotos} />,
          errorElement: <div>whoopsidoodle</div>,
        },
        {
          path: '/photos',
          element: <PhotoWidget photos={googlePhotos} />,
          errorElement: <div>whoopsidoodle</div>,
        },
        {
          path: '/lights',
          element: <LightsPage />,
          errorElement: <div>whoopsidoodle</div>,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main style={{ height: '95vh' }}>
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  );
}

export default App;
