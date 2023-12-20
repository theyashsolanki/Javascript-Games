"use strict";

const rollBtn = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const current0El = document.querySelector(".current-score#current--0");
const current1El = document.querySelector(".current-score#current--1");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const score1El = document.querySelector(".score#score--1");
const score0El = document.querySelector(".score#score--0");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let currentPlayer, score1, score0, current1, current0, running;

dice.classList.add("hidden");

let winnerEl;
const createWinnerEl = () => {
  winnerEl = document.createElement("h1");
  winnerEl.textContent = "Winner !";
  winnerEl.style.position = "absolute";
  winnerEl.style.top = "0";
  winnerEl.style.color = "red";
  winnerEl.style.fontSize = "3rem";
};

const init = () => {
  currentPlayer = 0;
  score1 = 0;
  score0 = 0;
  current0 = 0;
  current1 = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  winnerEl?.remove();
  running = true;
};
init();

const switchPlayer = () => {
  dice.classList.add("hidden");
  if (currentPlayer) {
    currentPlayer = 0;
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
  } else {
    currentPlayer = 1;
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");
  }
  current0 = 0;
  current1 = 0;
  current0El.textContent = current0;
  current1El.textContent = current1;
};

let previousRandomInt = 0;
const getRandomDice = (start, end) => {
  let randomInt = Math.trunc(Math.random() * end) + start;
  while (randomInt == previousRandomInt) {
    randomInt = Math.trunc(Math.random() * end) + start;
  }
  previousRandomInt = randomInt;
  return randomInt;
};

const checkWinner = () => {
  if (score0 >= 100 || score1 >= 100) {
    createWinnerEl();
    if (currentPlayer) {
      player1El.classList.add("player--winner");
      player1El.prepend(winnerEl);
    } else {
      player0El.classList.add("player--winner");
      player0El.prepend(winnerEl);
    }
    running = false;
  }
};

const handleDiceRoll = () => {
  dice.classList.remove("hidden");
  let randomDice = getRandomDice(1, 6);
  dice.src = `dice-${randomDice}.png`;
  if (randomDice == 1) {
    switchPlayer();
  } else if (currentPlayer) {
    current1 += randomDice;
    current1El.textContent = current1;
  } else {
    current0 += randomDice;
    current0El.textContent = current0;
  }
};

const handleHoldBtn = () => {
  if (dice.classList.contains("hidden")) return;
  if (currentPlayer) {
    score1 += current1;
    score1El.textContent = score1;
  } else {
    score0 += current0;
    score0El.textContent = score0;
  }
  checkWinner();
  if (running) switchPlayer();
};

rollBtn.addEventListener("click", () => {
  if (running) handleDiceRoll();
});

holdBtn.addEventListener("click", () => {
  if (running) handleHoldBtn();
});

newBtn.addEventListener("click", init);
