import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TournamentPage(props) {
  const [games, setGames] = useState([]);
  const [loadedGames, setLoadedGames] = useState(false);

  useEffect(() => {
    // On startup
    let teamsWithGames = [];
    props.tournament.teams.forEach(team => {
      if (team.opponent != "TBD") {
        teamsWithGames.push(team);
      }
    });
    fetchGames(teamsWithGames, games => {
      setGames(games);
    });
  }, []);

  const fetchTimer = setInterval(() => {
    let teamsWithGames = [];
    props.tournament.teams.forEach(team => {
      if (team.opponent != "TBD") {
        teamsWithGames.push(team);
      }
    });
    fetchGames(teamsWithGames, games => {
      setGames(games);
    });
  }, 120000);

  const renderGame = game => {
    return (
      <div className="tile is-child box" key={game.home._id}>
        <div className="columns">
          <div className="column">
            <p class="subtitle is-1">
              {game.home.name}: {game.home.score}
            </p>
          </div>
          <div className="column">
            <p class="subtitle is-1">
              {game.away.name}: {game.away.score}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const fetchGames = async (teams, callback) => {
    setLoadedGames(false);
    const query = `
    query getGame($team_code: String!) {
      getGame(team_id: $team_code) {
        home{
          _id
          opponent
          name
          score
        }
        away{
          name
          score
        }
      }
    }
    `;

    let games = await Promise.all(
      teams.map(async team => {
        let team_code = team._id;
        let game = await fetch(
          "https://tournament-director-api.herokuapp.com/api",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              query,
              variables: { team_code }
            })
          }
        );
        return game.json();
      })
    );

    games = games.map(game => {
      if (!game.errors) return game.data.getGame;
    });

    setLoadedGames(true);
    callback(games);
  };

  const renderGames = () => {
    let copy = {};
    games.forEach(game => {
      if (
        game &&
        !copy.hasOwnProperty(game.home._id) &&
        !copy.hasOwnProperty(game.home.opponent)
      ) {
        copy[game.home._id] = game;
      }
    });

    let gamesToRender = [];
    for (let game in copy) {
      gamesToRender.push(copy[game]);
    }

    return gamesToRender.map(game => {
      return renderGame(game);
    });
  };

  const refreshGamesHandler = () => {
    let teamsWithGames = [];
    props.tournament.teams.forEach(team => {
      if (team.opponent != "TBD") {
        teamsWithGames.push(team);
      }
    });
    fetchGames(teamsWithGames, games => {
      setGames(games);
    });
  };

  let content = (
    <div>
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                {loadedGames ? (
                  renderGames()
                ) : (
                  <div className="content has-text-centered">
                    <p className="title is-4">Loading Games</p>
                  </div>
                )}
              </div>
            </div>
            {loadedGames ? (
              <div className="field">
                <div className="control is-expanded">
                  <div
                    className="button has-icons-left is-primary"
                    onClick={refreshGamesHandler}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon="redo" />
                    </span>
                    <span>Refresh Games</span>
                    
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

export default TournamentPage;
