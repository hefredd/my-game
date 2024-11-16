let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

getScore();

let isAutoPlaying = false;
let intervalid;

function autoPlay(){
  if(!isAutoPlaying){
    intervalid = setInterval(() => {
      const move2 = getMove();
      findResult(move2);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.auto-button')
      .innerHTML = 'Pause';
  }else{
    clearInterval(intervalid);
    isAutoPlaying = false;

    document.querySelector('.auto-button')
      .innerHTML = 'Auto play';
  }
}

document.querySelector('.rock-button')
  .addEventListener('click', () => {
    findResult('rock');
  })

document.querySelector('.paper-button')
  .addEventListener('click', () => {
    findResult('paper');
  })
document.querySelector('.scissors-button')
  .addEventListener('click', () => {
    findResult('scissors');
  })
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    findResult('rock');
  }else if(event.key === 'p'){
    findResult('paper');
  }else if(event.key === 's'){
    findResult('scissors');
  }else if(event.key === 'a'){
    autoPlay();
  }else if (event.key === 'Backspace'){
    showConfirmation();
  }
});

function resetScores(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  getScore();
}
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    showConfirmation();
  });
document.querySelector('.auto-button')
  .addEventListener('click', () =>{
    autoPlay();
  });
function showConfirmation(){
  document.querySelector('.confirm-reset').innerHTML = 
    `Are you sure you want to reset score? 
    <button class="yes-button js-yes-button">
      Yes
    </button>
    <button class="no-button js-no-button">
      No
    </button>`;
  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScores();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });

}
function hideResetConfirmation() {
  document.querySelector('.confirm-reset')
    .innerHTML = '';
}


function findResult (playerMove){
  const computerMove = getMove();
  let result = '';
  if(playerMove === 'paper' && computerMove === 'rock' ){
    result = 'You win';
  }else if (playerMove === 'rock' && computerMove === 'scissors' ){
    result = 'You win';
  }else if(playerMove === 'scissors' && computerMove === 'paper'){
    result = 'You win';
  }else(result= 'You lose');
  if(playerMove === computerMove){
  result = 'Tie';
  }
  if(result ==='You win'){
    score.wins++;
  }else if(result === 'You lose'){
    score.losses++;
  }else if(result === 'Tie'){
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  
  getScore();

  document.querySelector('.the-results').innerHTML = result;
  document.querySelector('.both-moves').innerHTML = 
    `You picked <img src="images/${playerMove}-emoji.png" alt="" class="emoji-icon"> - Computer picked  <img src="images/${computerMove}-emoji.png" alt="" class="emoji-icon">`;
  }
     




function getScore(){
  document.querySelector('.the-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function getMove (){
  const computerMove = Math.random();
   let theMove = '';
  if(computerMove < 1 / 3){
   theMove ='paper';
  }else if(computerMove > 1 / 3 && computerMove < 2 / 3){
   theMove = 'rock';
  }else if(computerMove > 2 / 3 && computerMove < 1){
   theMove ='scissors';
  }
  return theMove;
}
