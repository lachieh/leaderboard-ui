import React, { PropsWithChildren, useState } from "react";
import styles from "./Team.module.css";
import { API_URL, TEAM_NAME_KEY } from "../environment";

const Team = ({ children }: PropsWithChildren) => {
  const [team, setTeam] = useState<string>(
    window.localStorage.getItem(TEAM_NAME_KEY) || ""
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/leaderboards`, {
      method: "POST",
      body: JSON.stringify({ id: team, name: team }),
    })
      .then((res) => res.status < 400)
      .then((success) => {
        if (!success) {
          throw new Error("Team name already exists");
        }
        window.localStorage.setItem(TEAM_NAME_KEY, team);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.Team}>
      {!team && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="team">Team: </label>
          <input
            aria-label="Team name"
            className={styles.input}
            type="text"
            id="team"
            required
            value={team}
            onChange={(event) => setTeam(event.target.value)}
            pattern="[a-zA-Z0-9_-]{1,26}"
            title="alphanumeric characters with hyphen and underscore only"
          />
          <button type="submit" className={styles.button}>
            Save
          </button>
        </form>
      )}
      {team && children}
    </div>
  );
};

export default Team;
