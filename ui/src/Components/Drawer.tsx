import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export default function TemporaryDrawer(props: any) {
    return (
        <SwipeableDrawer PaperProps={{
            sx: { width: "40%" },
        }}
            variant='temporary' open={props.isDrawerOpen} onOpen={props.toggleDrawer(true)} onClose={props.toggleDrawer(false)}>
            what goes here
            <a href='/photos'>phots</a>
        </SwipeableDrawer>
    );
}