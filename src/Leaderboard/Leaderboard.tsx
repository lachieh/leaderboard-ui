import { useEffect, useState } from "react";
import { API_URL, TEAM_NAME_KEY } from "../environment";
import styles from "./Leaderboard.module.css";

interface Score {
  owner_id: string;
  owner_name: string;
  value: number;
}

const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const teamName = window.localStorage.getItem(TEAM_NAME_KEY);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/leaderboards/${teamName}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setScores(data.scores);
      });
  }, [teamName]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Rank&emsp;</th>
          <th>Name&emsp;</th>
          <th>Score&emsp;</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={3}>Loading...</td>
          </tr>
        )}
        {!loading && scores.length === 0 && (
          <tr>
            <td colSpan={3}>No scores yet</td>
          </tr>
        )}
        {scores.map((score, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.owner_name}</td>
              <td>{score.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Leaderboard;
