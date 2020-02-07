import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar(props) {
  const backHandler = () => {
    props.setAuthLevel(0);
  };

  return (
    <nav className="navbar has-background-link" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <button className="button is-primary" onClick={backHandler}>
            <span className="icon">
              <FontAwesomeIcon icon="caret-square-left" />
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
