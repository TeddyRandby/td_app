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
    if (newTeam.length < 1) {
      setError("A team needs a name.");
    } else if (teamCopy.includes(newTeam)) {
      setError("Two teams cannot have the same name.");
    } else {
      let teamToAdd = newTeam.replace(" ","-").toUpperCase();
      teamCopy.push(teamToAdd);
      setNewTeam("");
      setTeams(teamCopy);
    }
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
    console.log(teams);
  };

  const renderTeams = teams => {
    let content = teams.map(team => {
      return renderTeam(team);
    });
    return content;
  };

  const renderTeam = team => {
    let name = "button is-dark is-light " + team;
    return (
      <div className="field has-addons" key={team}>
        <div class="control is-expanded">
          <input class="input" type="text" defaultValue={team} disabled />
        </div>
        <div className="control">
          <button className={name} onClick={removeTeamHandler}>
            <span className="icon is-small has-text-white">
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
    setError("");
    if (name.length < 1) {
      setError("Please name your tournament.");
    } else if (teams.length < 1) {
      setError("Please add teams to your tournament.");
    } else {
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
      tournament["name"] = name.replace(" ", "-").toUpperCase();
      tournament["teams"] = copy;
      setName(name.replace(" ","-").toUpperCase())
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
    }
  };

  let pre_query = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <div>
          <article class="message is-info">
              <div class="message-body">
                  Make sure you enter all your team's names here. You won't be able to change them, or add more later.
              </div>
            </article>
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
                  className="button is-primary"
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
                <button className="button is-primary" onClick={addTeamHandler}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
            <p class="help is-info">
                Once you've added all the teams, click the cloud to create your tournament.
              </p>
            <p class="help is-danger">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  let post_query = (
    <div>
      <section class="hero is-light">
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
            <article class="message is-primary">
              <div class="message-body">
                The <strong>tournament code</strong> for your tournament (<strong>{name}</strong>) is:{" "}
                <strong> {tournamentCode} </strong>
              </div>
            </article>
            <article class="message is-primary">
              <div class="message-body">
                Use this to login later
                and assign games. Your teams still need their{" "}
                <strong>team codes</strong> in order to log in and update their
                scores. Make sure you login so that you can distribute them!
              </div>
            </article>
            <article class="message is-danger">
              <div class="message-body">
                <strong>
                  Do not distribute the tournament code to people that you don't
                  want to be able to make changes to the tournament.
                </strong>
              </div>
            </article>
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
