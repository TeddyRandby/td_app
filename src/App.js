import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import TeamPage from "./components/TeamPage";
import TournamentPage from "./components/TournamentPage";
import CreateTournamentPage from "./components/CreateTournamentPage";
import TDPage from "./components/TDPage";
import NavBar from "./components/NavBar";

function App() {
  const [authLevel, setAuthLevel] = useState(0);
  const [tournament, setTournament] = useState({});
  const [game, setGame] = useState({});

  const landingPage = (
    <div
      className="App has-background-success"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <React.Fragment>
        <LandingPage
          setAuthLevel={setAuthLevel}
          setTournament={setTournament}
          setGame={setGame}
        />
      </React.Fragment>
    </div>
  );

  const tournamentPage = (
    <div
      className="App has-background-success"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <React.Fragment>
        <NavBar setAuthLevel={setAuthLevel} name={tournament.name} />
        <TournamentPage tournament={tournament} />
      </React.Fragment>
    </div>
  );

  const createTournamentPage = (
    <div
      className="App  has-background-success"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <React.Fragment>
        <NavBar setAuthLevel={setAuthLevel} name="Create a new tournament" />
        <CreateTournamentPage />
      </React.Fragment>
    </div>
  );

  const teamPage = (
    <div
      className="App has-background-success"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <React.Fragment>
        <NavBar setAuthLevel={setAuthLevel} name={tournament.name} />
        <TeamPage game={game} />
      </React.Fragment>
    </div>
  );

  const tdPage = (
    <div
      className="App has-background-success"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <React.Fragment>
        <NavBar setAuthLevel={setAuthLevel} name={tournament.name} />
        <TDPage tournament={tournament} />
      </React.Fragment>
    </div>
  );

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
