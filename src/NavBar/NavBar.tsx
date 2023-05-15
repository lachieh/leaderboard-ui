import { PropsWithChildren, useCallback } from "react";
import style from "./NavBar.module.css";

export enum View {
  Game,
  NewScore,
  Leaderboard,
}

type Props = {
  view: View;
  setView: (view: View) => void;
};

console.log(style);

const Navbar = ({ view: activeView, setView }: Props) => {
  const NavButton = useCallback(
    ({ children, view }: PropsWithChildren<{ view: View[] | View }>) => {
      const isActive = Array.isArray(view)
        ? view.includes(activeView)
        : view === activeView;
      const firstView = Array.isArray(view) ? view[0] : view;
      return (
        <button
          className={[style.button, isActive ? style.active : null].join(" ")}
          onClick={() => setView(firstView)}
        >
          {children}
        </button>
      );
    },
    [setView, activeView]
  );

  return (
    <nav>
      <NavButton view={[View.Game, View.NewScore]}>Game</NavButton>
      <NavButton view={View.Leaderboard}>Leaderboard</NavButton>
    </nav>
  );
};

export default Navbar;
