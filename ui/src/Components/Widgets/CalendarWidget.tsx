import { Box, Card } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';


type CalendarEvent = {
    "event_title": string
    "start_time": string,
    "end_time": string,
    "color": string
};




export default function CalendarWidget() {
    const [calendarEvents, setCalendarEvents] = useState<Array<CalendarEvent>>([]);
    const [pageNumber, setPageNumber] = useState<number>(0)
    const eventsPerPage = 3;
    const pageEvents = calendarEvents.slice(pageNumber * eventsPerPage, eventsPerPage * (pageNumber + 1))
    const numPages = Math.ceil(calendarEvents.length / eventsPerPage);
    useEffect(() => {

        const timeout = setInterval(() => {
            if (calendarEvents.length === 0) {
                console.log(`updating calander page from ${pageNumber} from to 0`)
                setPageNumber(0)

            } else {
                const newPageNumber = (pageNumber + 1) % numPages
                console.log(`updating calander page from ${pageNumber} to ${newPageNumber}`)
                setPageNumber(newPageNumber)
            }
        }, 30000) // New Page 30 sec;

        return () => {
            clearTimeout(timeout);
        };
    }, [calendarEvents, pageNumber, numPages]);
    useEffect(() => {

        const getCalendarData = async () => {
            try {
                console.log("Calling calendar api...")
                const response = await axios.get("/api/calendar")
                setCalendarEvents(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        const intervalCall = setInterval(() => {
            getCalendarData();
        }, 900000); // Refresh every 15 min (900000 ms)

        getCalendarData();

        return () => {
            clearInterval(intervalCall);
        };

    }, []);


    function CalendarIcon({ datestring }: { datestring: string }) {
        const date = new Date(Date.parse(datestring))
        const day = date.toLocaleDateString("default", { day: 'numeric' })
        const month = date.toLocaleDateString("default", { month: 'long' })
        const weekday = date.toLocaleDateString("default", { weekday: 'long' });
        return (
            <Box sx={{ display: "flex", color: "black", flexDirection: "column", height: "100%", width: "80px", padding: "2px", m: 0 }}>
                <Box sx={{ height: "20%", width: "100%", textAlign: "center", color: "white", backgroundColor: "red", fontWeight: "1000", fontSize: ".75em" }}>{month}</Box>
                <Box sx={{ height: "60%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", malignItems: "center", fontSize: "3em", textAlign: "center", backgroundColor: "white" }}>{day}</Box>
                <Box sx={{ height: "20%", width: "100%", textAlign: "center", backgroundColor: "white", fontSize: ".75em" }}>{weekday}</Box>
            </Box>
        )

    }
    const getBGColor = function (color) {
        switch (color) {
            case "0":
                return "#08b1ff"
            case "1":
                return "#8363a9"
            case "2":
                return "#85BB65"
            case "3":
                return "#7F00FF"
            case "4":
                return "#F89880"
            case "5":
                return "#FFBF00"
            case "6":
                return "#FF5F1F"
            case "7":
                return "#57A1C3"
            case "8":
                return "#36454f"
            case "9":
                return "#2b53a5"
            case "10":
                return "#009E60"
            case "11":
                return "red"
        }
    }
    return (
        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%", overflow: "hidden" }}>
            {pageEvents.map(function (event: CalendarEvent, i) {
                return <Box key={event.event_title + event.start_time} sx={{ backgroundColor: getBGColor(event.color), overflow: "hidden", my: "5px", height: "30%", width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <CalendarIcon datestring={event.start_time} />
                    <div style={{ width: "calc(100% - 80px)", textAlign: "center", display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: "bold", fontSize: "1.25em" }} >{event.event_title}</div>
                        <div>{`${(new Date(event.start_time)).toLocaleString()} - ${(new Date(event.end_time)).toLocaleString()} `}</div>
                    </div>
                </Box>;
            })}
        </Card >
    )
}



