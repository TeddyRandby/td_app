import React, { useState } from "react";
import LandingPage from "./components/LandingPage";

function App() {
  const [authLevel, setAuthLevel] = useState(0);

  const landing = (
      <div className="App">
        <React.Fragment>
          <LandingPage setAuthLevel={setAuthLevel}/>
        </React.Fragment>
      </div>
    );
  
  const tournament = (
    <div className="App"></div>
  )

  const team = (
    <div className="App">
      
      <div className="section">

      </div>

    </div>
  )
  

  switch (authLevel) {
    case 0: return landing;
    case 1: return tournament;
    case 2: return team;
  }

}

export default App;
