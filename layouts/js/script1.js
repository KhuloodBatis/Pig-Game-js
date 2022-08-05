'use strict';

//Select element  
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const cutter0 = document.getElementById('current--0');
const cutter1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const dicewin = document.querySelector('.dice-win');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--1');
const player0 = document.querySelector('.player--0');

let scores,currentScore,activePlayer,playing;
//start conditions

const init = function(){
scores = [0,0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;

 score0.textContent = 0;
 score1.textContent = 0; 
 cutter0.textContent = 0;
 cutter1.textContent = 0;

 player0.classList.remove('player--winner');
 player1.classList.remove('player--winner');
 player0.style.backgroundColor = '#d4a5b2';
 player1.style.backgroundColor = '#af6f8e';
 player0.classList.add('player--active');
 player1.classList.remove('player--active');
 diceEl.classList.add('hidden');
dicewin .classList.add('hidden');

 } 
const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent =0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.add('player--active2');
  // player0.style.backgroundColor = '#af6f8e';
  // player1.style.backgroundColor = '#d4a5b2';
}

//rolling dice functionality

btnRoll.addEventListener('click', function(){
  if(playing === true){
      //1. Generating a random dice roll
const dice = Math.trunc(Math.random() * 6) + 1;

//   //2. Display  dice
  diceEl.classList.remove('hidden');
  diceEl.src = `/dice-${dice}.png`;

  //3.Chick for rolled 1: if true, switch to next player
  if( dice !== 1){
     //Add dice to current 

     currentScore += dice;
     //cutter0.textContent = currentScore //!CHANGE LATER
     document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }else{
     // Switch to next player 
  switchPlayer()
  }
  }


});

btnHold.addEventListener('click',function(){
  if(playing ){
      //1. Add current score to active player 
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1] + currentScore
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  //2. Chaeck if player's score is >= 100 
  if(scores[activePlayer] >= 20){
    playing = false;
  //Finish the game 
  document.querySelector(`.player--${activePlayer}`).style.backgroundColor = '#030203';
  document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  dicewin .classList.remove('hidden');
  dicewin .src = `/dice-win.png`;

  }

  switchPlayer();
  //Switch to the next player 
  }


});

btnNew.addEventListener('click', init );

