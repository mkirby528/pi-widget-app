import React from 'react';
import { Grid, Paper } from '@mui/material';


type MatchupData = {
    scoreboard_string: string
    home_team: MatchupTeamData
    away_team: MatchupTeamData
}
type MatchupTeamData = {
    name: string
    logo: string
    score: number
    projected_score: number
}

const MatchupWidget: React.FC = (matchup: MatchupData) => {
    return (
        <Grid item xs={12} sm={6} md={6}>
            <Paper sx={{ height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0, backgroundColor: 'midnightblue', border: '1px solid red' }}>
                <Grid container spacing={2} sx={{ height: '100%', width: '50%', margin: 0, padding: 2, justifyContent: 'center' }}>
                
                </Grid>
                <Grid container spacing={2} sx={{ height: '100%', width: '50%', margin: 0, padding: 2, justifyContent: 'center' }}>2</Grid>
            </Paper>
        </Grid>
    )
}


const FantasyFootballPage: React.FC = () => {
    const matchups = [
        {
            "scoreboard_string": "Marvin's Red Room: 0.0 - Christian Mingle: 0.0",
            "home_team": {
                "name": "Marvin's Red Room",
                "logo": "https://g.espncdn.com/lm-static/logo-packs/ffl/GridironWarriors-MartinLaksman/warriors-14.svg",
                "score": 0.0,
                "projected_score": 109.36
            },
            "away_team": {
                "name": "Christian Mingle",
                "logo": "https://i.imgur.com/C9sbwMa.jpg",
                "score": 0.0,
                "projected_score": 108.02
            }
        },
        {
            "scoreboard_string": "Team Garfinkel: 1.0 - Ridley Me This : 0.0",
            "home_team": {
                "name": "Team Garfinkel",
                "logo": "https://g.espncdn.com/lm-static/logo-packs/core/Sneakerhead-ESPN/sneakerhead-01.svg",
                "score": 1.0,
                "projected_score": 102.61
            },
            "away_team": {
                "name": "Ridley Me This ",
                "logo": "https://g.espncdn.com/lm-static/logo-packs/ffl/OldeTymeFootball-AndrewJanik/Warriors_17.svg",
                "score": 0.0,
                "projected_score": 113.38
            }
        },
        {
            "scoreboard_string": "White, Ford, no Bronco: 0.0 - Mamma Mia, Jahmyr I Go Again: 0.0",
            "home_team": {
                "name": "White, Ford, no Bronco",
                "logo": "https://i.imgur.com/z9BD9VA.png",
                "score": 0.0,
                "projected_score": 104.8
            },
            "away_team": {
                "name": "Mamma Mia, Jahmyr I Go Again",
                "logo": "https://i.postimg.cc/zvrzBz86/Kapwing-FF.jpg",
                "score": 0.0,
                "projected_score": 107.87
            }
        }
    ]
    return (
        <Grid container spacing={2} sx={{ height: '100%', width: '100%', margin: 0, padding: 2 }}>
            {matchups.map((matchup, index) => {
                return (
                    <MatchupWidget key={index} {...matchup} />
                )
            })}
        </Grid>
    );
};

export default FantasyFootballPage;