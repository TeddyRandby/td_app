import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPage(props) {
  const [userType, setUserType] = useState(2);
  const [team_code, setTeamCode] = useState("");
  const [tournament_code, setTournamentCode] = useState("");
  const [error, setError] = useState("");

  const setTeamUser = () => {
    setUserType(1);
    setError("");
  };

  const setTournamentUser = () => {
    setUserType(2);
    setError("");
  };

  const createTournamentHandler = () => {
    props.setAuthLevel(3);
  };

  const onTeamCodeChange = event => {
    setTeamCode(event.target.value);
  };

  const onTournamentCodeChange = event => {
    setTournamentCode(event.target.value);
  };

  const teamLoginHandler = () => {
    const query = `
    query getGame($team_code: String!) {
      getGame(team_id: $team_code) {
        home{
          _id
          name
          score
        }
        away{
          _id
          name
          score
        }
      }
    }
    `;
    console.log(
      JSON.stringify({
        query,
        variables: { team_code }
      })
    );
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
        try {
          console.log("data returned:", response.data);
          props.setGame(response.data.getGame);
          props.setAuthLevel(2);
        } catch (err) {
          setError("Invalid Team code. Please try again.");
          console.log(err);
        }
      });
  };

  const tournamentLoginHandler = () => {
    const query = `
    query getTournamentName($tournament_code: String! ) {
      getTournamentName(name: $tournament_code) {
        name
        teams{
          _id
          score
          name
          opponent
        }
      }
    }`;

    fetch("https://tournament-director-api.herokuapp.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { tournament_code }
      })
    })
      .then(r => r.json())
      .then(response => {
        try {
          console.log("data returned:", response.data);
          props.setTournament(response.data.getTournamentName);
          props.setAuthLevel(1);
        } catch (err) {
          tdLoginHandler();
        }
      });
  };

  const tdLoginHandler = () => {
    const query = `
  query getTournament($tournament_code: String! ) {
    getTournament(_id: $tournament_code) {
      _id
      name
      teams{
        _id
        score
        name
        opponent
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
        variables: { tournament_code }
      })
    })
      .then(r => r.json())
      .then(response => {
        try {
          console.log("data returned:", response.data);
          props.setTournament(response.data.getTournament);
          props.setAuthLevel(4);
        } catch (err) {
          setError("Invalid Tournament code. Please try again.");
          console.log(err);
        }
      });
  };

  const team = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <div className="tabs is-centered is-boxed">
            <ul>
              <li className="is-active">
                <a onClick={setTeamUser}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="users" />
                  </span>
                  <span>Team</span>
                </a>
              </li>
              <li>
                <a onClick={setTournamentUser}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="trophy" />
                  </span>
                  <span>Tournament</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input is-primary is-fullwidth"
                      type="text"
                      placeholder="Enter your team's code"
                      onChange={onTeamCodeChange}
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-info"
                      onClick={teamLoginHandler}
                    >
                      Join
                    </button>
                  </div>
                </div>
                <p class="help is-danger">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tournament = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <div className="tabs is-centered is-boxed">
            <ul>
              <li>
                <a onClick={setTeamUser}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="users" />
                  </span>
                  <span>Team</span>
                </a>
              </li>
              <li className="is-active">
                <a onClick={setTournamentUser}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="trophy" />
                  </span>
                  <span>Tournament</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="field has-addons">
                  <p className="control">
                    <button
                      className="button is-info"
                      onClick={createTournamentHandler}
                    >
                      New
                    </button>
                  </p>
                  <p className="control is-expanded">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Enter a tournament code"
                      onChange={onTournamentCodeChange}
                    />
                  </p>
                  <p className="control">
                    <button
                      className="button is-info"
                      onClick={tournamentLoginHandler}
                    >
                      Join
                    </button>
                  </p>
                </div>
                <p class="help is-danger">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (userType) {
    case 1:
      return team;
    case 2:
      return tournament;
    default:
      return tournament;
  }
}

export default LandingPage;
