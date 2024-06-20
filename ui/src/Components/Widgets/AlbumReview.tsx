import { Box, Card, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from "react-lazy-load-image-component";



type AlbumList = Array<Album>
type Album = {
    Title: string
    ArtistsString: string
    ReleaseYear: string
    CoverImage: string
    HaveVinyl: boolean
    Rating: number
}
export default function AlbumReviewWidget() {
    const [albums, setAlbums] = useState<AlbumList>([]);



    useEffect(() => {
        const getAlbumReviews = async () => {
            try {
                console.log("Calling album review api to get albums...")
                const response = await axios.get("/api/album-reviews")
                setAlbums(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        getAlbumReviews();

        const intervalCall = setInterval(() => {
            getAlbumReviews();
        }, 30000 * 25); // 30 sec per album, 25 albums
        return () => {
            clearInterval(intervalCall);
        };
    }, []);


    const carouselStyle = {
        backgroundColor: "primary.main",
        height: "100% !important",
        width: "100% !important",
        textAlign: "center",
        "& div": {
            height: "100% !important",
            width: "100% !important",
        },
    }
    return (
        <Carousel
            animation={"slide"}
            fullHeightHover={false}
            interval={1000} //30000
            duration={500}
            navButtonsAlwaysInvisible
            indicators={false}
            sx={carouselStyle}
            autoPlay={true}
            stopAutoPlayOnHover={false}

        >
            {
                albums?.map((album, i) => (
                    <Card key={i} sx={{
                        height: "100%", p: 2, backgroundColor: "transparent"
                    }}>
                        <Box sx={{ maxHeight: "70%", maxWidth: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <LazyLoadImage alt={`Album cover for ${album.Title}`} src={album?.CoverImage}></LazyLoadImage>
                            <div style={{
                                maxHeight: "80%",
                                maxWidth: "40%",
                                borderRadius: "50%",
                                backgroundColor: "slategrey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "5em",
                            }}>
                                {album?.Rating}
                            </div>

                        </Box>
                        <Box sx={{ maxHeight: "30%", display:"flex", flexDirection:"column", justifyContent:"end"}} >
                            <Typography variant="h6" noWrap m={0}>{album?.Title}</Typography>
                            <Typography variant="subtitle1" noWrap m={0}>{album?.ArtistsString}</Typography>
                        </Box>
                    </Card>
                ))
            }
        </Carousel >

    )
}

