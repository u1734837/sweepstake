import { useEffect, useState } from "react";
import "./App.css";
import { fixtures } from "./fixtures";

const teamsList = [
  "Canada","Mexico","USA",
  "Algeria","Argentina","Australia","Austria","Belgium",
  "Bosnia and Herzegovina","Brazil","Cabo Verde","Colombia",
  "Congo DR","Côte d'Ivoire","Croatia","Curaçao","Czechia",
  "Ecuador","Egypt","England","France","Germany","Ghana",
  "Haiti","IR Iran","Iraq","Japan","Jordan","Korea Republic",
  "Morocco","Netherlands","New Zealand","Norway","Panama",
  "Paraguay","Portugal","Qatar","Saudi Arabia","Scotland",
  "Senegal","South Africa","Spain","Sweden","Switzerland",
  "Tunisia","Türkiye","Uruguay","Uzbekistan"
];

// MANUALLY ASSIGN TEAMS HERE
const teamAssignments = {
  "Algeria": "Test",
  "Argentina": "Unassigned",
  "Australia": "Unassigned",
  "Austria": "Unassigned",
  "Belgium": "Unassigned",
  "Bosnia and Herzegovina": "Unassigned",
  "Brazil": "Unassigned",
  "Canada": "Unassigned",
  "Cabo Verde": "Unassigned",
  "Colombia": "Unassigned",
  "Congo DR": "Unassigned",
  "Côte d'Ivoire": "Unassigned",
  "Croatia": "Unassigned",
  "Curaçao": "Unassigned",
  "Czechia": "Unassigned",
  "Ecuador": "Unassigned",
  "Egypt": "Unassigned",
  "England": "Unassigned",
  "France": "Unassigned",
  "Germany": "Unassigned",
  "Ghana": "Unassigned",
  "Haiti": "Unassigned",
  "IR Iran": "Unassigned",
  "Iraq": "Unassigned",
  "Japan": "Unassigned",
  "Jordan": "Unassigned",
  "Korea Republic": "Unassigned",
  "Mexico": "Unassigned",
  "Morocco": "Unassigned",
  "Netherlands": "Unassigned",
  "New Zealand": "Unassigned",
  "Norway": "Unassigned",
  "Panama": "Unassigned",
  "Paraguay": "Unassigned",
  "Portugal": "Unassigned",
  "Qatar": "Unassigned",
  "Saudi Arabia": "Unassigned",
  "Scotland": "Unassigned",
  "Senegal": "Unassigned",
  "South Africa": "Unassigned",
  "Spain": "Unassigned",
  "Sweden": "Unassigned",
  "Switzerland": "Unassigned",
  "Tunisia": "Unassigned",
  "Türkiye": "Unassigned",
  "Uruguay": "Unassigned",
  "USA": "Unassigned",
  "Uzbekistan": "Unassigned"
};

// MANUALLY EDIT THIS LIST ONLY
const knockedOutTeams = [];

const peopleList = [
  "Luke","Lucy","Ant","Dave","Hardeep","David","Tom","Rob",
  "Jack","James","Dom","Sita","Dave","Jasmine/Rosalie","Lin","Selene",
  "Andy","Emily","Nathan","Joe","James","Mark","Rich","Nic",
  "Alan","Lola","Keisha","Josh","Maisie","Brian","Kirsty","James",
  "Jason","Niall","George","Claire","Liv","Luke","Lucy","Mark",
  "Leigh","Antonia","Nigel","Genesa","Harmeet","Andy","Ken","BOGEY"
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
        setTimeLeft("DRAW TIME!");
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
                className="team"
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