import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPage(props) {
  const [userType, setUserType] = useState(0);

  const tournamentHandler = () => {
    props.setAuthLevel(1);
  };

  const teamHandler = () => {
    props.setAuthLevel(2);
  };

  const setTeamUser = () => {
    setUserType(1);
  };

  const setTournamentUser = () => {
    setUserType(2);
  };

  const landing = (
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
        </div>
      </div>
    </div>
  );

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
          <div class="field">
            <div class="control">
              <input
                class="input is-primary"
                type="text"
                placeholder="Enter your team's code"
              />
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
        </div>
      </div>
    </div>
  );

  switch (userType) {
    case 0:
      return landing;
    case 1:
      return team;
    case 2:
      return tournament;
  }
}

export default LandingPage;
