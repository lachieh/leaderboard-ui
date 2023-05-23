import { useState } from "react";
import "./App.css";
import Game from "./Game/Game";
import Leaderboard from "./Leaderboard/Leaderboard";
import NavBar, { View } from "./NavBar/NavBar";
import NewScore from "./NewScore/NewScore";
import Team from "./Team/Team";

function App() {
  const [view, setView] = useState<View>(View.Game);
  const [score, setScore] = useState<number>(0);

  const handleEnd = (score: number) => {
    setScore(score);
    setView(View.NewScore);
  };

  const handleNewScore = () => {
    setView(View.Leaderboard);
  };

  return (
    <>
      <header>
        <h1>Clickability</h1>
        <NavBar view={view} setView={setView} />
      </header>
      <main>
        <Team>
          {view === View.Game && <Game onEnd={handleEnd} />}
          {view === View.NewScore && (
            <NewScore score={score} onSubmit={handleNewScore} />
          )}
          {view === View.Leaderboard && <Leaderboard />}
        </Team>
      </main>
      <footer>
        Made with ❤️ by <a href="https://cosmonic.com">Cosmonic</a>
      </footer>
    </>
  );
}

export default App;
