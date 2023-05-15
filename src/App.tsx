import { useState } from "react";
import "./App.css";
import Game from "./Game/Game";
import NavBar, { View } from "./NavBar/NavBar";

function App() {
  const [view, setView] = useState<View>(View.Game);

  const handleEnd = (score: number) => {
    console.log(score);
    setView(View.NewScore);
  };

  return (
    <>
      <header>
        <h1>Clickability</h1>
        <NavBar view={view} setView={setView} />
      </header>
      <main>
        {view === View.Game && <Game onEnd={handleEnd} />}
        {view === View.NewScore && "New Score"}
        {view === View.Leaderboard && "Leaderboard"}
      </main>
      <footer>
        Made with ❤️ by <a href="https://cosmonic.com">Cosmonic</a>
      </footer>
    </>
  );
}

export default App;
