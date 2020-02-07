import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TeamPage(props) {
  const [homeScore, setHomeScore] = useState(props.game.home.score);
  const [awayScore, setAwayScore] = useState(props.game.away.score);
  const [awayName, setAwayName] = useState(props.game.away.name);
  const [team_code, setTeam_code] = useState(props.game.home._id);

  const fetchTimer = setInterval(() => {
    fetchGame();
  }, 60000);

  const resetScoreHandler = () => {
    let newScore = 0;
    setScore(newScore)

  }

  const incrementHandler = () => {
    let newScore = homeScore + 1;
    setScore(newScore)
  };

  const setScore = score => {
    const query = `
    mutation updateScore( $team_code: String!, $score: Int! ) {
        updateScore( team_id: $team_code, score: $score) {
          name
          score
        }
      }
    `;

    fetch("https://tournament-director-api.herokuapp.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { team_code, score }
      })
    })
      .then(r => r.json())
      .then(response => {
        console.log(response.data);
        fetchGame();
      });
  }

  const decrementHandler = () => {
    let newScore = homeScore - 1;
    setScore(newScore)
  };

  //   const signOutHandler = () => {
  //     props.setAuthLevel(0)
  // }

  const fetchGame = () => {
    const query = `
    query getGame($team_code: String!) {
      getGame(team_id: $team_code) {
        home{
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

    fetch("https://tournament-director-api.herokuapp.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { team_code }
      })
    })
      .then(r => r.json())
      .then(response => {
        setHomeScore(response.data.getGame.home.score);
        setAwayScore(response.data.getGame.away.score);
        setAwayName(response.data.getGame.away.name);
      });
  };

  const content = (
    <div className="section">
       <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            
      <div className="content has-text-centered">
        <div className="box ">
          <p class="title is-1">{awayName}</p>
          <p class="subtitle is-1">{awayScore}</p>
        </div>
        <div className="box">
          <p class="title is-1">{props.game.home.name}</p>
          <p class="subtitle is-1">{homeScore}</p>
        </div>
        <div className="buttons has-addons is-centered">
        <button
            className="button is-danger is-large"
            onClick={resetScoreHandler}
          >
            <span className="icon is-small">
              <FontAwesomeIcon icon="redo" />
            </span>
          </button>
          <button
            className="button is-info is-large"
            onClick={decrementHandler}
          >
            <span className="icon is-small">
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
          <button
            className="button is-primary is-large"
            onClick={incrementHandler}
          >
            <span className="icon is-small">
              <FontAwesomeIcon icon="plus" />
            </span>
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );

  return content;
}

export default TeamPage;
