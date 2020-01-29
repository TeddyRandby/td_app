import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TeamPage(props) {
  const renderTeamButton = team => {
    return (
        
      <div className="content has-text-centered">
          <div className="content">
        <p class="title is-1">{props.game.away.name}</p>
          <p class="subtitle is-1">{props.game.away.score}</p>
        </div>
        <div className="content">
          <p class="title is-1">{props.game.home.name}</p>
          <p class="subtitle is-1">{props.game.home.score}</p>
          <div className="buttons has-addons is-centered">
          <button className="button is-danger is-large">
              <span>
                <FontAwesomeIcon icon="minus" />
              </span>
            </button>
            <button className="button is-success is-large">
              <span>
                <FontAwesomeIcon icon="plus" />
              </span>
            </button>
          </div>
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
