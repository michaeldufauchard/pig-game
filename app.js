/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// event listener for clicking on "roll"
document.querySelector('.btn-roll').addEventListener('click', function() {

	if(gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. Update the round score IF the rolled number was NOT a 1
		if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

// event listener for clicking on "hold"
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// Add CURRENT score to player's GLOBAL score
		scores[activePlayer] += roundScore;
		// Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		// Check if player won the game (100 points)
		if (scores[activePlayer] >= 100){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});


// event listener for clicking on "new game"
document.querySelector('.btn-new').addEventListener('click', init);

// FUNCTIONS

function nextPlayer() {
	// Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		// if (activePlayer === 0) {
		// 	activePlayer = 1;
		// } else {
		// 	activePlayer = 0;
		// }

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
};

function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	// hide image of dice
	document.querySelector('.dice').style.display = 'none';

	// set all scores to 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// change winner back to Player 1 / Player 2
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// remove winner and active classes
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	// add active class to player 0 (has to be removed first so active class is not repeated twice)
	document.querySelector('.player-0-panel').classList.add('active');
};









// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
