import Drawer from '@mui/material/Drawer';

export default function TemporaryDrawer(props: any) {
    return (
        <Drawer PaperProps={{
            sx: { width: "40%" },
        }}
            variant='temporary' open={props.isDrawerOpen} onClose={props.toggleDrawer(false)}>
            what goes here
            <a href='/photos'>phots</a>
        </Drawer>
    );
}