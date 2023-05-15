import { useEffect, useState } from "react";
import { API_URL, PLAYER_NAME_KEY, TEAM_NAME_KEY } from "../environment";
import style from "./NewScore.module.css";

type Props = {
  score: number;
  onSubmit: (name: string, score: number) => void;
};

const NewScore = ({ onSubmit, score }: Props) => {
  const player = window.localStorage.getItem(PLAYER_NAME_KEY) || "";
  const team = window.localStorage.getItem(TEAM_NAME_KEY) || "";
  const [name, setName] = useState<string>(player);
  const [loading, setLoading] = useState<boolean>(false);
  const [lowestHighScore, setLowestHighScore] = useState<number>(0);

  useEffect(() => {
    fetch(`${API_URL}/leaderboards/${team}`)
      .then((res) => res.json())
      .then((data) => {
        const highScores = data.scores;
        if (highScores.length < 10) {
          setLowestHighScore(0);
        } else {
          setLowestHighScore(highScores[9].value);
        }
        setLoading(false);
      });
  }, [team, score]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${API_URL}/leaderboards/${team}/scores`, {
      method: "POST",
      body: JSON.stringify({ owner_id: name, owner_name: name, value: score }),
    }).then(() => {
      window.localStorage.setItem(PLAYER_NAME_KEY, name);
      onSubmit(name, score);
    });
  };

  return (
    <div className={style.NewScore}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {score <= lowestHighScore ? (
            <div>
              <div className={style.message}>Sorry, not a high score</div>
              <div>
                <button onClick={() => onSubmit(name, score)}>
                  See Scores
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.message}>NEW HIGH SCORE!</div>

              <div className={style.fields}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  pattern="[a-zA-Z0-9_-]{1,26}"
                  title="alphanumeric characters with hyphen and underscore only"
                />

                <label htmlFor="score">Score</label>
                <input type="text" id="score" value={score} readOnly />

                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default NewScore;
