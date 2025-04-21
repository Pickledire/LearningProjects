function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
  }

  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }




  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  
  function createBoard() {
    const boardContainer = document.getElementById("tic-tac-toe");
    boardContainer.innerHTML = "";
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => {
        if (currentPlayer === "X") makeMove(index);
      });
      boardContainer.appendChild(cellDiv);
    });
  }
  
  function makeMove(index) {
    if (!gameActive || board[index] !== "") return;
  
    board[index] = currentPlayer;
    checkWinner();
    createBoard();
  
    if (gameActive && currentPlayer === "X") {
      currentPlayer = "O";
      setTimeout(() => {
        computerMove();
      }, 400);
    }
  }
  
  function computerMove() {
    const emptyIndices = board
      .map((val, idx) => (val === "" ? idx : null))
      .filter((val) => val !== null);
  
    for (let i of emptyIndices) {
      board[i] = "O";
      if (checkPotentialWin("O")) {
        checkWinner();
        currentPlayer = "X";
        createBoard();
        return;
      }
      board[i] = "";
    }
  
    for (let i of emptyIndices) {
      board[i] = "X";
      if (checkPotentialWin("X")) {
        board[i] = "O";
        checkWinner();
        currentPlayer = "X";
        createBoard();
        return;
      }
      board[i] = "";
    }
  
    if (board[4] === "") {
      board[4] = "O";
      checkWinner();
      currentPlayer = "X";
      createBoard();
      return;
    }
  
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => board[i] === "");
    if (emptyCorners.length > 0) {
      const move = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
      board[move] = "O";
      checkWinner();
      currentPlayer = "X";
      createBoard();
      return;
    }
  
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = "O";
    checkWinner();
    currentPlayer = "X";
    createBoard();
  }
  
  function checkPotentialWin(player) {
    const winConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winConditions.some(([a, b, c]) => 
      board[a] === player && board[b] === player && board[c] === player
    );
  }
  
  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const [a, b, c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        document.getElementById("winnerText").textContent = `${board[a]} wins! 🎉`;
        gameActive = false;
        return;
      }
    }
  
    if (!board.includes("")) {
      document.getElementById("winnerText").textContent = "It's a draw! 🤝";
      gameActive = false;
    }
  }
  
  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("winnerText").textContent = "";
    createBoard();
  }
  
  function openPopup(id) {
    document.getElementById(id).style.display = "block";
    if (id === "popup4") {
      restartGame();
    }
  }  