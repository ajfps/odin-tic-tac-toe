const gameboard = (function () {
  const startBtn = document.querySelector(".start");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const bottomContainer = document.querySelector(".bottom-container");
  const restartText = document.createElement("h1");
  restartText.textContent = "Play again?";
  restartText.setAttribute(
    "style",
    "display: inline; margin-left: 8px; color: green; font-size: 20px;"
  );

  restartText.addEventListener("click", () => {
    winner = "";
    winnerText.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
    })
    Xturns = [];
    Oturns = [];
    currentPlayer = "X";
  })

  let playerOneName = "";
  let playerTwoName = "";

  let isStarted = false;

  startBtn.addEventListener("click", () => {
    if (player1.value === "" || player2.value === "") {
      alert("Please enter a valid name");
    } else {
      playerOneName = player1.value;
      playerTwoName = player2.value;
      isStarted = true;
      bottomContainer.remove();
      winnerText.textContent = `It's your turn, ${playerOneName}!`;
    }
  });

  const cells = document.querySelectorAll(".field");
  const winCondition = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
    [3, 5, 7],
  ];

  let currentPlayer = "X";

  let Xturns = [];
  let Oturns = [];

  const winnerText = document.querySelector(".result");
  let winner = "";

  function checkWinner() {
    for (const condition of winCondition) {
      let Xcounter = 0;
      let Ocounter = 0;

      for (const num of Xturns) {
        if (condition.includes(num)) {
          Xcounter++;
        }
      }

      for (const num of Oturns) {
        if (condition.includes(num)) {
          Ocounter++;
        }
      }
      if (Xcounter === 3) {
        winner = `Player ${playerOneName} wins`;
        winnerText.textContent = winner;
        winnerText.appendChild(restartText);
      }

      if (Ocounter === 3) {
        winner = `Player ${playerTwoName} wins`;
        winnerText.textContent = winner;
        winnerText.appendChild(restartText);
      }
    }
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellId = parseInt(cell.id);

      const letter = document.createElement("h1");

      if (isStarted) {
        if (!winner) {
          if (cell.textContent === "") {
            if (currentPlayer === "X") {
              letter.textContent = "X";
              cell.appendChild(letter);
              currentPlayer = "O";
              Xturns.push(cellId);

              checkWinner();

              if (!winner) {
                winnerText.textContent = `It's your turn, ${playerTwoName}!`;
              }
            } else if (currentPlayer === "O") {
              letter.textContent = "O";
              cell.appendChild(letter);
              currentPlayer = "X";
              Oturns.push(cellId);

              checkWinner();

              if (!winner) {
                winnerText.textContent = `It's your turn, ${playerOneName}!`;
              }
            }
          }
        }
      }
    });
  });
})();
