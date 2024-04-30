import { Card, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    const getAlbumReviews = async () => {
        try {
            console.log("Calling album review api to get albums...")
            const response = await axios.get("/api/album-reviews")
            setAlbums(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAlbumReviews();

        const intervalCall = setInterval(() => {
            getAlbumReviews();
        }, 600000); // Refresh every 10 min (600000 ms)
        return () => {
            clearInterval(intervalCall);
        };
    }, []);
    return (
        <Carousel
        animation={"slide"}
        fullHeightHover={false}
        interval={10000}
        duration={500}
        swipe={false}
        navButtonsAlwaysInvisible
        sx={{height:"100% !important", width:"100% !important"}}
        indicators={false}
        stopAutoPlayOnHover={false}

        >
            {
                albums?.map((album, i) => (
                    <Card key={album.Title+i} raised sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%", p: 2 }}>
                        <img width="180" height="180" src={album?.CoverImage}></img>
                        <Typography variant="h2">{album?.Rating}</Typography>
                    </Card>
                ))
            }
        </Carousel>

    )
}

