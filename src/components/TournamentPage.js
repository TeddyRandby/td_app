import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TournamentPage(props) {
  const [games, setGames] = useState([]);
  const [loadedGames, setLoadedGames] = useState(false);

  useEffect(() => {
    // On startup
    let teamsWithGames = [];
    props.tournament.teams.forEach( team => {
      if ( team.opponent != "TBD") {
        teamsWithGames.push(team);
      }
    })
    console.log(teamsWithGames)
    fetchGames(teamsWithGames, games => {
      setGames(games);
    });
  }, []);

  const renderGame = game => {
    return (
      <div className="tile is-child box" key={game.home._id}>
        <div className="has-text-centered">
          <p class="title is-1">{game.home.name}</p>
          <p class="subtitle is-1">{game.home.score}</p>
          <p class="title is-1">{game.away.name}</p>
          <p class="subtitle is-1">{game.away.score}</p>
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
    console.log(games);

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

  let content = (
    <div>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{props.tournament.name}</h1>
          </div>
        </div>
      </section>
      <div className="tile is-ancestor">
        {loadedGames ? renderGames() : <div></div>}
      </div>
    </div>
  );

  return content;
}

export default TournamentPage;
