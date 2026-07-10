import { useEffect, useState } from "react";
import "./App.css";
import { fixtures } from "./fixtures";

const teamsList = [
  "Argentina","Belgium",
  "England","France",
  "Norway",
  "Spain","Switzerland"
];

// MANUALLY ASSIGN TEAMS HERE
const teamAssignments = {
  "Algeria": "Leigh Thomas",
  "Argentina": "Jason Tobias",
  "Australia": "Keisha Clive",
  "Austria": "Mark Hill 2.0",
  "Belgium": "Dave Almond",
  "Bosnia and Herzegovina": "James Green",
  "Brazil": "Niall Davison",
  "Canada": "Tom Sims",
  "Cabo Verde": "Lucy (not) Stevens",
  "Colombia": "Ken Akbar",
  "Congo DR": "Lin Burchell",
  "Côte d'Ivoire": "Dave Dawson",
  "Croatia": "Josh Passey",
  "Curaçao": "Dom Coleman",
  "Czechia": "Selene Spaziano",
  "Ecuador": "Luke Colville",
  "Egypt": "Joe [made up surname by Ant]",
  "England": "Rob Smith",
  "France": "Nic Clive",
  "Germany": "Luke Jones",
  "Ghana": "Rich Fearne",
  "Haiti": "@nigeyboi",
  "IR Iran": "Claire Waters",
  "Iraq": "James Lovett",
  "Japan": "Kirsty Lovett",
  "Jordan": "Dave Burchell",
  "Korea Republic": "BOGEY",
  "Mexico": "Genesa Mitchell",
  "Morocco": "Brian Torode-Sims",
  "Netherlands": "George Davison",
  "New Zealand": "Ant Caserta",
  "Norway": "James Bell",
  "Panama": "Emily Mitcheson-Smith",
  "Paraguay": "Alan Clive",
  "Portugal": "Hardeep Chita",
  "Qatar": "Harmeet Soor",
  "Saudi Arabia": "Nathan Burchell",
  "Scotland": "Andy Rodrigues",
  "Senegal": "Andy Wright",
  "South Africa": "Sita Dawson",
  "Spain": "Liv Davies",
  "Sweden": "Jasmine and Rosalie",
  "Switzerland": "Mark Hill",
  "Tunisia": "Antonia Richardson",
  "Türkiye": "Lola Passey",
  "Uruguay": "Lucy (not) Stevens 2.0",
  "USA": "Maisie Eastwood",
  "Uzbekistan": "Jack Barrett"
};

// MANUALLY EDIT THIS LIST ONLY
const knockedOutTeams = ["Haiti", "Tunisia", "Turkey", "Qatar", "Czechia", "Curaçao", "Iraq", "New Zealand", "Saudi Arabia", "IR Iran", "Korea Republic", "Scotland", "Uruguay", "Panama", "Uzbekistan", "Jordan",
  "South Africa", "Japan", "Germany", "Netherlands", "Côte d'Ivoire", "Sweden", "Ecuador", "Congo DR", "Senegal",
  "Croatia", "Colombia","Canada","Mexico","USA",
  "Bosnia and Herzegovina","Brazil","Cabo Verde","Colombia",
  "Egypt","Austria","Paraguay","Portugal", "Algeria", "Australia", "Ghana", "Morocco"
];

const peopleList = [
  "XX","XX","XX","Dave","XX","XX","XX","Rob",
  "XX","XX","XX","XX","XX","XX","XX",
  "XX","XX","XX","XX","James","XX","XX","Nic",
  "XX","XX","XX","XX","XX","xx","XX","XX",
  "Jason","XX","XX","XX","Liv","XX","XX","Mark",
  "XX","xx","XX","XX","XX","XX","XX","XX"
];

const highlightedTeams = [
  "Switzerland", "Mexico", "Brazil", "Germany", "USA", "Netherlands", "France", "Belgium", "Spain", 
  "England", "Argentina"
];

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const activeTeams = teamsList.filter(
    (team) => !knockedOutTeams.includes(team)
  );

  const floatingPeople = peopleList.map((p, i) => ({
    name: p,
    left: (i * 3) % 100,
    duration: 20 + (i % 10),
    delay: i * 0.5
  }));

  const targetDate = new Date("2026-06-09T19:00:00");
  const [timeLeft, setTimeLeft] = useState("");

  const today = new Date().toISOString().split("T")[0];
  //for testing date
  //const today = "2026-06-10"; // Replace with actual date
  const todaysFixtures = fixtures[today] || [];

  useEffect(() => {
    const update = () => {
      const diff = targetDate - new Date();

      if (diff <= 0) {
        setTimeLeft("=== QUARTER FINALS ===");
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const m = Math.floor(diff / (1000 * 60)) % 60;
      const s = Math.floor(diff / 1000) % 60;

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const getAssignment = (team) => {
    return teamAssignments?.[team?.trim?.()] ?? "Unassigned";
  };

  return (
    <div className="app">
    <div className="fight-scene">
  <div className="fighter nic">💃 Liv</div>

  <div className="impact">
    💥💥💥
  </div>

  <div className="fighter brian">🧇 Dave</div>
</div>

      {/* FLOATING PEOPLE */}
      <div className="floating-names">
        {floatingPeople.map((p, index) => (
          <div
            key={`${p.name}-${index}`}
            className="float-name"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* FIXTURES */}
      <div className="fixtures-box">
        <h2>Today's Fixtures</h2>

        {todaysFixtures.length === 0 ? (
          <p>No fixtures today</p>
        ) : (
          <div className="fixtures-list">
            {todaysFixtures.map((match, index) => (
              <div key={index} className="fixture">
                <span>{match.time}</span>
                <strong>
                  {match.home} vs {match.away}
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className="header">
        <h1>WORLD CUP SWEEPSTAKE</h1>
        <div className="timer">{timeLeft}</div>
      </div>

      {/* TEAMS */}
      <div className="container">

        {/* ACTIVE */}
        <div className="box">
          <h2>Active Teams</h2>

          <div className="grid">
            {activeTeams.map((team) => (
              <div
                key={team}
                className={`team ${
                  highlightedTeams.includes(team) ? "champion-team" : ""
                }`}
                onClick={() => handleTeamClick(team)}
              >
                {team}
              </div>
            ))}
          </div>
        </div>

        {/* KNOCKED OUT */}
        <div className="box">
          <h2>Knocked Out</h2>

          <div className="grid">
            {knockedOutTeams.map((team) => (
              <div
                key={team}
                className="team knocked"
                onClick={() => handleTeamClick(team)}
              >
                {team}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedTeam && (
        <div
          className="modal"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedTeam}</h2>

            <p>
              Assigned to:
              <br />
              <strong>{getAssignment(selectedTeam)}</strong>
            </p>

            <button onClick={() => setSelectedTeam(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}