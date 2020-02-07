import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import TeamPage from "./components/TeamPage";
import TournamentPage from "./components/TournamentPage";
import CreateTournamentPage from "./components/CreateTournamentPage";
import TDPage from "./components/TDPage"

function App() {
  const [authLevel, setAuthLevel] = useState(0);
  const [tournament, setTournament] = useState({});
  const [game, setGame] = useState({});

  const landingPage = (
    <div className="App">
      <React.Fragment>
        <LandingPage setAuthLevel={setAuthLevel} setTournament={setTournament} setGame={setGame} />
      </React.Fragment>
    </div>
  );

  const tournamentPage = (
    <div className="App">
      <React.Fragment>
        <TournamentPage tournament={tournament}/>
      </React.Fragment>
    </div>
  );

  const createTournamentPage = (
    <div className="App">
      <React.Fragment>
        <CreateTournamentPage setAuthLevel={setAuthLevel} />
      </React.Fragment>
    </div>
  );

  const teamPage = (
    <div className="App">
      <React.Fragment>
        <TeamPage game={game} setAuthLevel={setAuthLevel}/>
      </React.Fragment>
    </div>
  );

  const tdPage = (
    <div className="App">
      <React.Fragment>
        <TDPage tournament={tournament} setAuthLevel={setAuthLevel}/>
      </React.Fragment>
    </div>
  )

  switch (authLevel) {
    case 0:
      return landingPage;
    case 1:
      return tournamentPage;
    case 2:
      return teamPage;
    case 3:
      return createTournamentPage;
    case 4:
      return tdPage;
    default:
      return landingPage;
  }
}

export default App;
