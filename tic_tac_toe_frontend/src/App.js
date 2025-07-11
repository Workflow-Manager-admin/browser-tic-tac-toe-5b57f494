import React, { useState, useEffect } from "react";
import "./App.css";

const COLORS = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#ff9800",
};

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

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
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
          color: squares[i] === "X" ? COLORS.primary : COLORS.accent,
        }}
        key={i}
      >
        {squares[i]}
      </button>
    );
  }

  let statusText;
  if (winnerOrStatus === "draw") {
    statusText = "It's a draw!";
  } else if (winnerOrStatus) {
    statusText = `Winner: ${winnerOrStatus}`;
  } else {
    statusText = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="ttt-outer-container">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-board-container">
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
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
              color:
                winnerOrStatus === "draw"
                  ? COLORS.secondary
                  : winnerOrStatus === "X"
                  ? COLORS.primary
                  : winnerOrStatus === "O"
                  ? COLORS.accent
                  : COLORS.secondary,
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
            Reset
          </button>
        </div>
      </div>
      <footer className="ttt-footer">Minimalistic Tic Tac Toe &middot; Powered by React</footer>
    </div>
  );
}

export default App;
