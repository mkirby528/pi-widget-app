import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Clock from './Clock';
import AudioRecorder from './AudioRecorder';

interface AppBarHeaderProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

const AppBarHeader = ({ toggleDrawer }: AppBarHeaderProps) => (
  <AppBar position="sticky" sx={{ height: '5vh' }}>
    <Toolbar variant="dense" sx={{ minHeight: '0%' }}>
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
      <AudioRecorder />
      <div style={{ marginLeft: 'auto' }}></div>
      <Clock />
    </Toolbar>
  </AppBar>
);

export default AppBarHeader;
