import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';

interface TemporaryDrawerProps {
    isDrawerOpen: boolean;
    toggleDrawer: (open: boolean) => () => void;
}

export default function TemporaryDrawer({ isDrawerOpen, toggleDrawer }: TemporaryDrawerProps) {
    const navigate = useNavigate();

    const navItems = [
        { label: 'Home', path: '/', color: '#72A0C1' },
        { label: 'Photos', path: '/photos', color: '#7CB9E8' },
        { label: 'Lights', path: '/lights', color: '#7CB9E8' }
    ];

    const boxStyle = {
        height: `${90 / navItems.length}%`,
        m: 1,
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    };

    return (
        <Drawer
            PaperProps={{
                sx: {
                    width: '40%',
                    hegiht: '100%',
                    display: 'flex',
                    flexDirection: 'column', // Fixes flex direction
                    alignItems: 'center',
                    justifyContent: 'start',
                },
            }}
            variant="temporary"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
        >
            {navItems.map(({ label, path, color }) => (
                <Box
                    key={label}
                    onClick={() => navigate(path)}
                    sx={{ ...boxStyle, backgroundColor: color }}
                >
                    {label}
                </Box>
            ))}
        </Drawer>
    );
}
