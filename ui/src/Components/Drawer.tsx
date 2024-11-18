import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer(props: any) {
    const navigate = useNavigate()

    return (
        <Drawer PaperProps={{
            sx: {
                width: "40%",
                display: 'flex',
                flexDirection: "center",
                justifyContent: "start",
                alignItems: "center"
            },
        }}
            variant='temporary' open={props.isDrawerOpen} onClose={props.toggleDrawer(false)}>
            <Box
                onClick={() => {
                    navigate('/');
                }}
                sx={{
                    height: "20%",
                    m: 1,
                    backgroundColor: "#72A0C1",
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                Home
            </Box>
            <Box
                onClick={() => {
                    navigate('/photos');
                }}
                sx={{
                    height: "20%",
                    backgroundColor: "#7CB9E8",
                    m: 1,
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                Photos
            </Box>
            <Box
                onClick={() => {
                    navigate('/lights');
                }}
                sx={{
                    height: "20%",
                    backgroundColor: "#7CB9E8",
                    m: 1,
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                Lights
            </Box>
            <Box
                onClick={() => {
                    navigate('/fantasy-football');
                }}
                sx={{
                    height: "20%",
                    backgroundColor: "#7CB9E8",
                    m: 1,
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                Fantasy Football
            </Box>
            <Box
                onClick={() => {
                    navigate('/speach');
                }}
                sx={{
                    height: "20%",
                    backgroundColor: "#7CB9E8",
                    m: 1,
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                Speach
            </Box>
        </Drawer>

    );
}