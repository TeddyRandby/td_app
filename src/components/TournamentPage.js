import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TournamentPage(props) {
    console.log(props.tournament);
  let content = (
    <div>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{props.tournament.name}</h1>
          </div>
        </div>
      </section>
    </div>
  );

  return content;
}

export default TournamentPage;
