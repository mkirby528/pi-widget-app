import json
from espn_api.football import League
from dataclasses import dataclass
from utils import run_item, gather_results
from logging import getLogger
logger = getLogger("pi-app-api")


# Setup Functions
def init_leagues():
    return [League(league_id=id, swid=swid, espn_s2=s2, year=2024) for id in ids]


def get_my_teams(leagues):
    result_infos = [run_item(get_my_team_from_league, league)
                    for league in leagues]
    my_teams = gather_results(result_infos)

    return my_teams


def get_my_team_from_league(league):
    for team in league.teams:
        if team.owners and team.owners[0].get("id") == espn_id:
            return team


def get_my_matchups():
    my_matchups = []
    for league in my_leagues:
        scoreboard = league.box_scores()
        for matchup in scoreboard:
            home_team = matchup.home_team
            away_team = matchup.away_team if hasattr(
                matchup, "away_team") else None
            if home_team in my_teams or away_team in my_teams:
                my_matchups.append(matchup)
    return my_matchups


# Functions called to get API Responses
def get_fantasy_football_scores():
    logger.info("Getting fantasy football scores...")
    return [format_matchup(matchup) for matchup in get_my_matchups()]


def get_player_counts():
    my_starters = []
    their_starters = []
    for matchup in get_my_matchups():
        my_lineup = matchup.home_lineup if matchup.home_team in my_teams else matchup.away_lineup
        their_lineup = matchup.away_lineup if matchup.home_team in my_teams else matchup.home_lineup
        my_starters += [player.name for player in my_lineup if player.slot_position  not in ("BE", "IR")]
        their_starters += [player.name for player in their_lineup if player.slot_position not in ("BE", "IR")]
        my_player_counts = {}
        their_player_counts = {}
        for player in my_starters:
            if player in my_player_counts:
                my_player_counts[player] += 1
            else:
                my_player_counts[player] = 1
        
        for player in their_starters:
            if player in their_player_counts:
                their_player_counts[player] += 1
            else:
                their_player_counts[player] = 1

        my_player_counts = dict(sorted(my_player_counts.items(), key=lambda x: x[1], reverse=True))
        their_player_counts = dict(sorted(their_player_counts.items(), key=lambda x: x[1], reverse=True))

    return {'good_good': my_player_counts, 'bad_bad': their_player_counts}


# Formatting Functions
def format_players(team):
    return [{
        "name": player.name,
        "position": player.slot_position,
        "points": player.points,
        "team": player.proTeam,
        "opponent": player.pro_opponent,
        "game_time": player.game_date,
    } for player in team]


def format_matchup(matchup):
    home_team = matchup.home_team
    away_team = matchup.away_team

    home_players = format_players(matchup.home_lineup)

    away_players = format_players(matchup.away_lineup)

    return {
        "scoreboard_string": get_matchup_score_string(matchup),
        "home_team": {
            "name": home_team.team_name,
            "logo": home_team.logo_url,
            "score": matchup.home_score,
            "projected_score": matchup.home_projected,
            "players": home_players
        },
        "away_team": {
            "name": away_team.team_name,
            "logo": away_team.logo_url,
            "score": matchup.away_score,
            "projected_score": matchup.away_projected,
            "players": away_players
        }
    }


def get_matchup_score_string(matchup):
    return f"{matchup.home_team.team_name}: {matchup.home_score} - {matchup.away_team.team_name}: {matchup.away_score}"


espn_id = ""
s2 = ""
swid = ""
ids = []

my_leagues = init_leagues()
my_teams = get_my_teams(my_leagues)
