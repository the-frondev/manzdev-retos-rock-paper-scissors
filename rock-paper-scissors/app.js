const rock = 1, paper = 2, scissors = 3, spock = 4, lizard = 5;
let difficulty = 3;
let playerScore = 0, cpuScore = 0;
const scorePlayer = document.querySelector('.player-score');
const scoreCPU = document.querySelector('.cpu-score');
const playerEmoji = document.querySelector('.player');
const cpuEmoji = document.querySelector('.cpu');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.weapon');
const btnPlayAgain = document.querySelector('.play-again');
btnPlayAgain.addEventListener('click', () => {
  document.querySelector('.modal').close();
  scorePlayer.textContent = 0;
  scoreCPU.textContent = 0;
  result.textContent = '';
  document.querySelector('#difficulty').disabled = false;
});

const selectDifficulty = document.querySelector('#difficulty');
selectDifficulty.addEventListener('click', (e) => {
  if (!e.target.checked) {
    difficulty = 3;
    document.querySelectorAll('.hard').forEach((btn) => {
      btn.classList.add('hidden');
    })
  }
  else {
    difficulty = 4;
    document.querySelectorAll('.hard').forEach((btn) => {
      btn.classList.remove('hidden');
    })
  }
});

buttons.forEach((btn) => {  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(difficulty);
    document.querySelector('#difficulty').disabled = true;
    const cpu = Math.floor(Math.random() * difficulty)+1;
    console.log(cpu);
    const player = Number(e.target.dataset.weapon);
    playerEmoji.classList.add('shake');
    cpuEmoji.classList.add('shake');
    setTimeout(() => {
    playerEmoji.classList.remove('shake');
    cpuEmoji.classList.remove('shake');
  }, 300);
  let battleResult = play(player, cpu)

    setTimeout(() => {
      if (battleResult === 0) result.textContent = "TIE";
      if (battleResult === 1) {
        result.textContent = "YOU WIN";
        playerScore++;
        scorePlayer.textContent = playerScore;
      }
      if (battleResult === 2) {
        result.textContent = "CPU WIN";
        cpuScore++;
        scoreCPU.textContent = cpuScore;
      }
      if (playerScore === 3 || cpuScore === 3) {
        document.querySelector('.modal').showModal();
        if (playerScore === 3) {
          document.querySelector('.winner').textContent = 'YOU WIN';
        }
        if (cpuScore === 3) {
          document.querySelector('.winner').textContent = 'YOU LOOSE';
        }
        playerScore = 0;
        cpuScore = 0;
      }
    }, 1000);
  })
})

function play(player, cpu) {
  setTimeout(() => {
    playerEmoji.textContent = player === rock ? '✊' : player === scissors ? '✌' : player === paper ? '✋' : player === spock ? '🖖' : '🦎';
    cpuEmoji.textContent = cpu === rock ? '✊' : cpu === scissors ? '✌' : cpu === paper ? '✋' : cpu === spock ? '🖖' : '🦎';
  }, 300);
  setTimeout(() => {
    playerEmoji.textContent = '🤜';
    cpuEmoji.textContent = '🤛';
  }, 1300);
  if (player === cpu) return 0;
  if (player === rock) {
    return (cpu === paper || cpu === spock) ? 2 : 1;
  }
  if (player === paper) {
    return (cpu === scissors || cpu === lizard) ? 2 : 2;
  }
  if (player === scissors) {
    return (cpu === rock || cpu === spock) ? 2 : 1;
  }
  if (player === spock) {
    return (cpu === paper || cpu === lizard) ? 2 : 1;
  }
  if (player === lizard) {
    return (cpu === scissors || cpu === rock) ? 2 : 1;
  }
}