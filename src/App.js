import React from "react";
import "./styles.css";

const Lanunch_query = `
{
  launchesPast(limit: 15) {
    id
    mission_name
  }
}
`;

export default function App() {
  const launches = useLaunches();

  return (
    <div className="App">
      <h1>Spacex launches</h1>
      <h2>Basic graphql api SpaceX data fatching without third party dependencies!</h2>

      <ol>
        {launches.map((launch) => (
          <li className="list" key={launch.id}> {launch.mission_name}</li>
        ))}
      </ol>
    </div>
  );
}

function useLaunches() {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: Lanunch_query })
    })
      .then((response) => response.json())
      .then((data) => setLaunches(data.data.launchesPast));
  }, []);
  return launches;
}
