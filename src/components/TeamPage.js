import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TeamPage(props) {
  const renderTeamButton = team => {
    return (
      <div className="box">
        <p className="subtitle is-4">{props.game.home.name}</p>
        <div className="buttons has-addons is-centered">
          <button className="button is-success is-large">
            <span>
              <FontAwesomeIcon icon="plus" />
            </span>
          </button>
          <button className="button is-danger is-large">
            <span>
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  let content = (
    <div className="section">{renderTeamButton(props.game.home)}</div>
  );

  return content;
}

export default TeamPage;
