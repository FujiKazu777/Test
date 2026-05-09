const HANDS = {
  rock:     { emoji: '✊', label: 'グー',  beats: 'scissors' },
  scissors: { emoji: '✌️', label: 'チョキ', beats: 'paper' },
  paper:    { emoji: '🖐️', label: 'パー',  beats: 'rock' },
};

const scores = { player: 0, computer: 0, draw: 0 };
let selectedHand = null;

function getComputerChoice() {
  const choices = Object.keys(HANDS);
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (HANDS[player].beats === computer) return 'win';
  return 'lose';
}

function selectHand(choice) {
  selectedHand = choice;

  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.choice === choice);
  });

  document.getElementById('play-btn').disabled = false;

  const playerHand = document.getElementById('player-hand');
  playerHand.textContent = HANDS[choice].emoji;
}

function play() {
  if (!selectedHand) return;

  const computerChoice = getComputerChoice();
  const result = getResult(selectedHand, computerChoice);

  document.getElementById('play-btn').disabled = true;
  document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

  animateHands(selectedHand, computerChoice);

  scores[result === 'win' ? 'player' : result === 'lose' ? 'computer' : 'draw']++;
  updateScoreBoard();
  showResult(result, selectedHand, computerChoice);

  setTimeout(() => {
    selectedHand = null;
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('selected');
    });
  }, 700);
}

function animateHands(playerChoice, computerChoice) {
  const playerHand = document.getElementById('player-hand');
  const computerHand = document.getElementById('computer-hand');

  playerHand.classList.remove('shake');
  computerHand.classList.remove('shake');

  void playerHand.offsetWidth;

  playerHand.textContent = '✊';
  computerHand.textContent = '✊';

  playerHand.classList.add('shake');
  computerHand.classList.add('shake');

  setTimeout(() => {
    playerHand.textContent = HANDS[playerChoice].emoji;
    computerHand.textContent = HANDS[computerChoice].emoji;
    playerHand.classList.remove('shake');
    computerHand.classList.remove('shake');
  }, 600);
}

function showResult(result, playerChoice, computerChoice) {
  const el = document.getElementById('result-message');
  const pLabel = HANDS[playerChoice].label;
  const cLabel = HANDS[computerChoice].label;

  el.className = 'result-message';

  setTimeout(() => {
    if (result === 'win') {
      el.textContent = `${pLabel} で 勝ち！ 🎉`;
      el.classList.add('win');
    } else if (result === 'lose') {
      el.textContent = `${cLabel} で 負け... 😢`;
      el.classList.add('lose');
    } else {
      el.textContent = `引き分け 🤝`;
      el.classList.add('draw');
    }
  }, 650);
}

function updateScoreBoard() {
  document.getElementById('player-score').textContent = scores.player;
  document.getElementById('computer-score').textContent = scores.computer;
  document.getElementById('draw-score').textContent = scores.draw;
}

function resetGame() {
  scores.player = 0;
  scores.computer = 0;
  scores.draw = 0;
  updateScoreBoard();

  document.getElementById('player-hand').textContent = '🤜';
  document.getElementById('computer-hand').textContent = '🤛';
  document.getElementById('result-message').textContent = '';
  document.getElementById('result-message').className = 'result-message';
}
