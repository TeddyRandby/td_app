import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateTournamentPage(props) {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [queryStatus, setQueryStatus] = useState(0);
  const [tournamentCode, setTournamentCode] = useState("");

  const addTeamHandler = () => {
    setError("");
    let teamCopy = teams.slice();
    if (teamCopy.includes(newTeam)) {
      setError("Two teams cannot have the same name.");
    } else {
      teamCopy.push(newTeam);
      setNewTeam("");
      setTeams(teamCopy);
    }
  };

  const signOutHandler = () => {
    props.setAuthLevel(0);
  };
  const removeTeamHandler = event => {
    setError("");
    teams.forEach(team => {
      if (event.currentTarget.classList.contains(team)) {
        let i = teams.indexOf(team);
        let copy = teams.slice();
        let removed = copy.splice(i, 1);
        setTeams(copy);
      }
    });
  };

  const renderTeams = teams => {
    let content = teams.map(team => {
      return renderTeam(team);
    });
    return content;
  };

  const renderTeam = team => {
    let name = "button is-info " + team;
    return (
      <div className="field has-addons" key={team}>
        <div class="control is-expanded">
          <input class="input" type="text" defaultValue={team} disabled />
        </div>
        <div className="control">
          <button className={name} onClick={removeTeamHandler}>
            <span className="icon is-small">
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  const onNewTeamChange = event => {
    setNewTeam(event.target.value);
  };

  const onNameChange = event => {
    setName(event.target.value);
  };

  const createTournamentHandler = () => {
    let query = `
    mutation createTournament( $tournament:TournamentIn!) {
        createTournament(tournament: $tournament){
          _id
        }
      }`;

    let copy = teams.slice();
    copy = copy.map(team => {
      return {
        score: 0,
        name: team,
        opponent: "TBD"
      };
    });
    let tournament = {};
    tournament["name"] = name;
    tournament["teams"] = copy;

    fetch("https://tournament-director-api.herokuapp.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { tournament }
      })
    })
      .then(r => r.json())
      .then(response => {
        if (response.errors) {
          setError(response.errors[0].message);
        } else {
          setTournamentCode(response.data.createTournament._id);
          setQueryStatus(1);
        }
      });
  };

  let pre_query = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <div>
            <div class="field">
              <div class="control">
                <input
                  class="input is-primary"
                  type="text"
                  placeholder="Enter a tournament name here"
                  onChange={onNameChange}
                />
              </div>
              <p class="help is-info">
                This is how other people will find your tournament. Make it
                short and sweet!
              </p>
            </div>
            {renderTeams(teams)}
            <div className="field has-addons">
              <div className="control">
                <button
                  className="button is-info"
                  onClick={createTournamentHandler}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="cloud-upload-alt" />
                  </span>
                </button>
              </div>
              <div className="control is-expanded">
                <input
                  className="input is-primary is-fullwidth"
                  type="text"
                  placeholder="Enter a team name here"
                  onChange={onNewTeamChange}
                  value={newTeam}
                />
              </div>
              <div className="control">
                <button className="button is-info" onClick={addTeamHandler}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
            <p class="help is-danger">{error}</p>
          </div>
          <button className="button is-info" onClick={signOutHandler}>
            <span className="icon is-small">
              <FontAwesomeIcon icon="sign-out-alt" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  let post_query = (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Well done!</h1>
            <h2 class="subtitle">Your tournament was created successfully.</h2>
          </div>
        </div>
      </section>
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <article class="message is-info">
              <div class="message-body">
                Your tournament code is: <strong> {tournamentCode} </strong> -
                Use this to login later and assign games.
              </div>
            </article>
            <article class="message is-danger">
              <div class="message-body">
                <strong>
                  Do not distribute this to people that you don't want to be
                  able to make changes to the tournament.
                </strong>
              </div>
            </article>
            <article class="message is-primary">
              <div class="message-body">
                <strong>
                  Your teams still need their team codes in order to log in and
                  update their scores. Make sure you login so that you can
                  distribute them!
                </strong>
              </div>
            </article>
            <button className="button is-info" onClick={signOutHandler}>
              <span className="icon is-small">
                <FontAwesomeIcon icon="sign-out-alt" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  switch (queryStatus) {
    case 0:
      return pre_query;
    case 1:
      return post_query;
    default:
      return pre_query;
  }
}

export default CreateTournamentPage;
