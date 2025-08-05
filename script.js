const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const restartButton = document.getElementById("restart");

let icons = ['🐶','🐱','🐭','🐹','🦊','🐻','🐼','🐨'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const duplicatedIcons = [...icons, ...icons];
  const shuffled = shuffle(duplicatedIcons);
  board.innerHTML = '';
  moves = 0;
  movesDisplay.textContent = moves;

  shuffled.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.addEventListener('click', revealCard);
    board.appendChild(card);
    cards.push(card);
  });
}

function revealCard() {
  if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

  this.classList.add('revealed');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesDisplay.textContent = moves;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
    checkGameOver();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkGameOver() {
  const matchedCards = document.querySelectorAll('.card.matched');
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert(`Parabéns! Você venceu em ${moves} jogadas.`);
    }, 500);
  }
}

restartButton.addEventListener('click', () => {
  cards = [];
  createBoard();
});

createBoard();
