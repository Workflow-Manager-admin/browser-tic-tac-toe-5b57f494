import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Returns winner ("X" or "O"), "draw", or null (game continues)
 */
function getGameStatus(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  if (squares.every((s) => s)) return "draw";
  return null;
}

const RETRO_COLORS = {
  X: "var(--ttt-secondary)", // cyan blue
  O: "var(--ttt-accent)", // hot magenta
  default: "var(--ttt-primary)",
  drawStatus: "#f1dc91",
  winStatus: "var(--ttt-primary)",
  loseStatus: "var(--ttt-accent)",
  neutralStatus: "var(--ttt-secondary)",
};

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    // Use a retro pixel font (injected in App.css)
    document.body.style.fontFamily =
      "'Press Start 2P', 'VT323', 'Share Tech Mono', 'Courier New', Courier, monospace";
    document.documentElement.setAttribute("data-theme", "retro-pixel");
  }, []);

  const winnerOrStatus = getGameStatus(squares);

  // PUBLIC_INTERFACE
  function handleSquare(i) {
    if (squares[i] || winnerOrStatus) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleSquare(i)}
        aria-label={
          squares[i]
            ? `Cell ${i + 1}: ${squares[i]}`
            : `Cell ${i + 1}: empty`
        }
        disabled={!!squares[i] || !!winnerOrStatus}
        style={{
          color:
            squares[i] === "X"
              ? RETRO_COLORS.X
              : squares[i] === "O"
              ? RETRO_COLORS.O
              : RETRO_COLORS.default,
        }}
        key={i}
      >
        {squares[i] || ""}
      </button>
    );
  }

  let statusText;
  if (winnerOrStatus === "draw") {
    statusText = "DRAW - NO WINNERS!";
  } else if (winnerOrStatus) {
    statusText = `WINNER: ${winnerOrStatus}`;
  } else {
    statusText = `TURN: ${xIsNext ? "X" : "O"}`;
  }

  let statusColor;
  if (winnerOrStatus === "draw") {
    statusColor = RETRO_COLORS.drawStatus;
  } else if (winnerOrStatus === "X") {
    statusColor = RETRO_COLORS.X;
  } else if (winnerOrStatus === "O") {
    statusColor = RETRO_COLORS.O;
  } else {
    statusColor = RETRO_COLORS.neutralStatus;
  }

  return (
    <div className="ttt-outer-container">
      <h1 className="ttt-title">TIC-TAC-TOE <span style={{fontSize: "0.5em", color:"var(--ttt-accent)", fontWeight: 400}}>RETRO TV</span></h1>
      <div className="ttt-board-container">
        <div className="ttt-board" role="grid" aria-label="Retro Tic Tac Toe Board">
          {[0, 1, 2].map((r) => (
            <div className="ttt-board-row" key={r} role="row">
              {[0, 1, 2].map((c) => renderSquare(r * 3 + c))}
            </div>
          ))}
        </div>
        <div className="ttt-controls">
          <div
            className="ttt-status"
            style={{
              color: statusColor
            }}
            data-testid="ttt-status"
          >
            {statusText}
          </div>
          <button
            className="ttt-reset-btn"
            onClick={handleReset}
            aria-label="Reset Game"
          >
            NEW GAME
          </button>
        </div>
      </div>
      <footer className="ttt-footer">
        <span style={{color:"var(--ttt-border)"}}>
          <span role="img" aria-label="joystick">🕹️</span> Retro Tic-Tac-Toe &copy; 1986<br />Insert Coin to Continue
        </span>
      </footer>
    </div>
  );
}

export default App;
