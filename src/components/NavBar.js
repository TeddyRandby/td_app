import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar(props) {
  const backHandler = () => {
    props.setAuthLevel(0);
  };

  return (
    <nav className="navbar has-background-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <button className="button is-success" onClick={backHandler}>
            <span className="icon has-text-primary">
              <FontAwesomeIcon icon="chevron-left" size="1x"/>
            </span>
          </button>
        </div>
        <div className="navbar-item">
        <span>{props.name}</span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
