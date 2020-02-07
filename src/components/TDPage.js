import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TDPage(props) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");

  useEffect(() => {
    let newTeamNames = props.tournament.teams.map(team => {
      return team.name;
    });
    setTeamNames(newTeamNames);
    if (newTeamNames.length > 1) {
      setHome(newTeamNames[0]);
      setAway(newTeamNames[1]);
    }
  }, []);

  const addGameHandler = () => {
    const newGame = {
      home: home,
      away: away
    };
    let valid = true;
    games.forEach(game => {
      setError("");

      if (game.home == newGame.home && game.away == newGame.away) {
        setError("That game is already set.");
        valid = false;
      }
    });
    if (valid) {
      let query = `
        mutation updateOpponent( $team_id: String!, $opp_id: String! ) {
            updateOpponent( team_id: $team_id, opp_id: $opp_id){
              name
              opponent
            }
          }
        `;

      let team_id = "";
      let opp_id = "";

      props.tournament.teams.forEach(team => {
        if (team.name == newGame.home) {
          team_id = team._id;
        } else if (team.name == newGame.away) {
          opp_id = team._id;
        }
      });

      console.log(opp_id);
      fetch("https://tournament-director-api.herokuapp.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query,
          variables: { team_id, opp_id }
        })
      })
        .then(r => r.json())
        .then(response => {
          if (response.errors) {
            setError(response.errors[0].message);
          } else {
            console.log(response);
            let gamesCopy = games.slice();
            gamesCopy.push(newGame);
            setGames(gamesCopy);
            let teamNamesCopy = teamNames.slice();
            if (teamNamesCopy.length > 1) {
              setHome(teamNamesCopy[0]);
              setAway(teamNamesCopy[1]);
            }
          }
        });
    }
  };

  const resetAllGamesHandler = async () => {
    const query = `
    mutation updateOpponent( $team_id: String!, $opp_id: String! ) {
        updateOpponent( team_id: $team_id, opp_id: $opp_id){
          name
          opponent
        }
      }
    `;

    let reset = await Promise.all(
      props.tournament.teams.map(async team => {
        let team_id = team._id;
        let opp_id = "TBD";
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
              variables: { team_id, opp_id }
            })
          }
        );
        return game.json();
      })
    );
    if (reset[0].errors) {
      setError("oops, something went wrong.");
    } else {
      setGames([]);
    }
  };

 

  const removeGameHandler = event => {
    setError("");
    games.forEach(game => {
      const combinedName = "" + game.home + game.away;

      if (event.currentTarget.classList.contains(combinedName)) {
        let i = games.indexOf(game);
        let copy = games.slice();
        let removed = copy.splice(i, 1);
        setGames(copy);
      }
    });
  };

  const renderGames = games => {
    let content = games.map(game => {
      return renderGame(game);
    });
    return content;
  };

  const renderGame = game => {
    const combinedName = "" + game.home + game.away;
    let name = "button is-dark is-light " + combinedName;
    return (
      <div className="field has-addons" key={combinedName}>
        <p class="control is-expanded">
          <button class="button is-static is-fullwidth">{game.home}</button>
        </p>
        <p class="control is-expanded">
          <button class="button is-static is-fullwidth">{game.away}</button>
        </p>
        <div className="control">
          <button className={name} onClick={removeGameHandler}>
            <span className="icon is-small has-text-white">
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  const generateOptions = team => {
    let i = teamNames.indexOf(team);
    let teamsNamesCopy = teamNames.slice();
    if (i > -1) {
      let removed = teamsNamesCopy.splice(i, 1);
    }
    return teamsNamesCopy.map(name => {
      return <option key={name}>{name}</option>;
    });
  };

  const renderTable = () => {
    let content = (
      <table class="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {props.tournament.teams.map(team => {
            return renderTableRow(team);
          })}
        </tbody>
      </table>
    );
    return content;
  };

  const renderTableRow = team => {
    return (
      <tr key={team.name}>
          <th>{team.name}</th><td>{team._id}</td>
      </tr>
    );
  };

  const onHomeChange = event => {
    setHome(event.target.value);
  };

  const onAwayChange = event => {
    setAway(event.target.value);
  };

  let content = (
    <div>
      <div className="section">
        <section className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div>
              {renderGames(games)}
              <div className="field has-addons">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={resetAllGamesHandler}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon="redo" />
                    </span>
                  </button>
                </div>
                <div class="control is-expanded">
                  <div class="select is-fullwidth is-primary">
                    <select onChange={onHomeChange}>
                      {generateOptions(away)}
                    </select>
                  </div>
                </div>
                <div class="control is-expanded">
                  <div class="select is-fullwidth is-primary">
                    <select onChange={onAwayChange}>
                      {generateOptions(home)}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <button className="button is-primary" onClick={addGameHandler}>
                    <span className="icon is-small">
                      <FontAwesomeIcon icon="plus" />
                    </span>
                  </button>
                </div>
              </div>
              <p class="help is-danger">{error}</p>
            </div>
            <div className="content"> {renderTable()}</div>
            
          </div>
        </section>
      </div>
    </div>
  );

  return content;
}
export default TDPage;
