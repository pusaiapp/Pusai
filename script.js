(function () {
  "use strict";

  /** @type {HTMLDivElement} */
  const statusEl = document.getElementById("status");
  /** @type {HTMLDivElement} */
  const boardEl = document.getElementById("board");
  /** @type {HTMLButtonElement} */
  const resetBtn = document.getElementById("reset");

  /** @type {(number[])[]} */
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /** @type {("X"|"O"|null)[]} */
  let boardState = Array(9).fill(null);
  /** @type {"X"|"O"} */
  let currentPlayer = "X";
  let gameOver = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function render() {
    for (let i = 0; i < 9; i++) {
      /** @type {HTMLButtonElement|null} */
      const cell = boardEl.querySelector(`.cell[data-index="${i}"]`);
      const value = boardState[i];
      if (!cell) continue;
      cell.textContent = value ? value : "";
      cell.classList.toggle("x", value === "X");
      cell.classList.toggle("o", value === "O");
      cell.disabled = gameOver || Boolean(value);
    }
  }

  function checkWinner() {
    for (const [a, b, c] of winningLines) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    return null;
  }

  function isDraw() {
    return boardState.every((v) => v !== null);
  }

  function handleCellClick(event) {
    if (gameOver) return;
    /** @type {HTMLButtonElement} */
    const cell = event.currentTarget;
    const index = Number(cell.getAttribute("data-index"));
    if (boardState[index] !== null) return;

    boardState[index] = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      setStatus(`Kazanan: ${winner}!`);
      render();
      return;
    }

    if (isDraw()) {
      gameOver = true;
      setStatus("Berabere!");
      render();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus(`Sıra: ${currentPlayer}`);
    render();
  }

  function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    setStatus("Sıra: X");
    render();
  }

  function init() {
    const cells = boardEl.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
    resetBtn.addEventListener("click", resetGame);
    render();
  }

  init();
})();

