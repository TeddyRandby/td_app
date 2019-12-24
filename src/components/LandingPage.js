import React from "react";

function LandingPage(props) {
  const content = (
    <div className="section">
      <div className="box content">
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button">Team</button>
          </div>
          <div className="control">
            <button className="button">Director</button>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

export default LandingPage;
