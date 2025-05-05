if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('[ServiceWorker] Registrado com sucesso:', reg.scope);
        })
        .catch(err => {
          console.error('[ServiceWorker] Erro ao registrar:', err);
        });
    });
  }
let scoreA = 0;
let scoreB = 0;
const scoreLimit = 25;
const finalSetLimit = 15;
const scoreAElement = document.getElementById('scoreA');
const scoreBElement = document.getElementById('scoreB');
const sequenceContainer = document.getElementById('sequence');
let currentSet = 1;
let setsWonA = 0;
let setsWonB = 0;

function changeScore(team, delta) {
  if (team === 'A') {
    scoreA = Math.max(0, scoreA + delta);
    scoreAElement.textContent = scoreA;
  } else {
    scoreB = Math.max(0, scoreB + delta);
    scoreBElement.textContent = scoreB;
  }
  updateSequence(team);
  checkSetWin();
}

function updateSequence(team) {
  const block = document.createElement('div');
  block.classList.add('sequence-block');
  block.classList.add(team === 'A' ? 'sequence-red' : 'sequence-blue');
  block.textContent = sequenceContainer.children.length + 1;
  sequenceContainer.appendChild(block);
}

function checkSetWin() {
  const limit = currentSet === 5 ? finalSetLimit : scoreLimit;
  if (scoreA >= limit && scoreA - scoreB >= 2) {
    setsWonA++;
    alert(`Equipe A venceu o set ${currentSet}`);
    nextSet();
  } else if (scoreB >= limit && scoreB - scoreA >= 2) {
    setsWonB++;
    alert(`Equipe B venceu o set ${currentSet}`);
    nextSet();
  }

  if (setsWonA === 3 || setsWonB === 3) {
    const winner = setsWonA === 3 ? 'red' : 'blue';
    document.body.style.background = winner === 'red' 
      ? 'linear-gradient(to bottom right, #ff4d4d, #b32424)' 
      : 'linear-gradient(to bottom right, #3399ff, #003d66)';
    alert(`Equipe ${setsWonA === 3 ? 'A' : 'B'} venceu a partida!`);
  }
}

function nextSet() {
  currentSet++;
  scoreA = 0;
  scoreB = 0;
  scoreAElement.textContent = '0';
  scoreBElement.textContent = '0';
  sequenceContainer.innerHTML = '';
}