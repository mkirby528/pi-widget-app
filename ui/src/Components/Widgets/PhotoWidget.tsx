import Carousel from "react-material-ui-carousel"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CircularProgress } from "@mui/material";


type Props = {
    photos: string[]
}
export default function PhotoWidget({ photos }: Props) {
    const carouselStyle = {
        backgroundColor: "tranparent",
        height: "100% !important",
        maxHeight: "100% !important",
        maxWidth: "100% !important",
        width: "100% !important",
        textAlign: "center",
        "& div": {
            height: "100% !important",
            width: "100% !important",
            display: "flex",
        },
    }
    if (photos.length > 0) {
        return (<Carousel
            animation={"slide"}
            fullHeightHover={false}
            interval={60000}
            duration={500}
            navButtonsAlwaysInvisible
            indicators={false}
            sx={carouselStyle}
            autoPlay={true}
            stopAutoPlayOnHover={false}

        >

            {
                photos?.sort(() => Math.random() - 0.5).map((photo, i) => (
                    <LazyLoadImage key={photo.slice(-4)+i} style={{"margin": "auto", "objectFit": "fill", "border": "5px solid darkgray", "borderRadius": "5px", "maxHeight": "100%", "maxWidth": "100%", "overflow": "hidden" }} src={photo} alt="photo"></LazyLoadImage>
                ))
            }
        </Carousel >
        )
    } else {
        return <CircularProgress />
    }


}

