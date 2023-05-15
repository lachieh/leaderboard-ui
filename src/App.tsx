import { useState } from "react";
import "./App.css";
import NavBar, { View } from "./NavBar/NavBar";

function App() {
  const [view, setView] = useState<View>(View.Game);

  return (
    <>
      <header>
        <h1>Clickability</h1>
        <NavBar view={view} setView={setView} />
      </header>
      <main>
        {view === View.Game && "Game"}
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
