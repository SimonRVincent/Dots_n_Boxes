/* Some "global" variables */
let numPlayers = 2;
let playerTurn = 1;
let playerScores = [];

/* Adds the scores to the HTML document, is used to initialize and update the score text.*/
function makeScores() {
if (numPlayers == 2) {
	let scoreDiv = document.getElementById('scores');
	scoreDiv.innerHTML = '<h3>Player 1: ' + playerScores[0] + '&nbsp;' + '</h3><h3>Player 2: ' + playerScores[1] + '</h3>';
	finishGame(2);

} else if (numPlayers == 3) {
	let scoreDiv = document.getElementById('scores');
	scoreDiv.innerHTML = '<h3>Player 1: ' + playerScores[0] + '&nbsp;' + '</h3><h3>Player 2: ' + playerScores[1] + '&nbsp;' + '</h3><h3>Player 3: ' + playerScores[2] + '</h3>';
	finishGame(3);
}
}

/* Checks to see if all squares are full; ends the game if true */
function finishGame(numPlayers) {
	if (sq1.full == true && sq2.full == true && sq3.full == true && sq4.full == true && sq5.full == true && sq6.full == true && sq7.full == true && sq8.full == true && sq9.full == true) {
		var delayInMilliseconds = 500;
		setTimeout(function() {
			let aString = '';
			if (numPlayers == 3){
				let p = Math.max(...playerScores);
				if (p == playerScores[0]) {
					aString = 'Player 1 wins!';
				} else if (p == playerScores[1]) {
					aString = 'Player 2 wins!';
				} else if (p == playerScores[2]) {
					aString = 'Player 3 wins!';
				}
			
			let string = 'Game Over! \n -Results- \n Player 1: ' + playerScores[0] + ' \n Player 2: ' + playerScores[1] + ' \n Player 3: ' + playerScores[2] + ' \n' + aString;
			window.alert(string);
		} else if (numPlayers == 2) {
			let aString = '';
			let p = Math.max(...playerScores);
				if (p == playerScores[0]) {
					aString = 'Player 1 wins!';
				} else if (p == playerScores[1]) {
					aString = 'Player 2 wins!';
				}
			let string = 'Game Over! \n -Results- \n Player 1: ' + playerScores[0] + ' \n Player 2: ' + playerScores[1] + ' \n' + aString;
			window.alert(string);
		}
		  }, delayInMilliseconds);

	}
}

/* Defining the square object, represents the HTML squares logically. */
class square {
	constructor(top, left, bottom, right) {
		this.top = top;
		this.left = left;
		this.bottom = bottom;
		this.right = right;
		let full = false;
		}
		
		isFull() {
			this.full = true;
		}
		
}


/* Construct the square objects */
let sq1 = new square(0, 0, 0, 0);
let sq2 = new square(0, 0, 0, 0);
let sq3 = new square(0, 0, 0, 0);
let sq4 = new square(0, 0, 0, 0);
let sq5 = new square(0, 0, 0, 0);
let sq6 = new square(0, 0, 0, 0);
let sq7 = new square(0, 0, 0, 0);
let sq8 = new square(0, 0, 0, 0);
let sq9 = new square(0, 0, 0, 0);

/* Get the number of players , in this case 2 */
function twoPlayers() {
	numPlayers = 2;
	playerCreator();
	makeScores();
}

/* Get the number of players , in this case 3 */
function threePlayers() {
	numPlayers = 3;
	playerCreator();
	makeScores();
}

/* Player Creator, creates players, which only consist of their scores to be updates by the score manager */
function playerCreator() {
if (numPlayers == 2) {
	let player1 = 0;
	let player2 = 0;
	playerScores = [player1, player2];
} else if (numPlayers == 3) {
	let player1 = 0;
	let player2 = 0;
	let player3 = 0;
	playerScores = [player1, player2, player3];
}
}

/* Player score manager, gives players points based on who's turn it is */
function playerScoreManager() {
if (playerTurn == 1) {
	playerScores[0] += 1;
} else if (playerTurn == 2) {
	playerScores[1] += 1;
} else if (playerTurn == 3) {
	playerScores[2] += 1;
}
makeScores();
}

/* Player turn manager, is called upon to change turns */
function playerTurnManager() {

	if (numPlayers == 2) {
		if (playerTurn == 1) {
			playerTurn = 2;
		} else {
			playerTurn = 1;
		}

	} else if (numPlayers == 3) {
	if (playerTurn == 1) {
		playerTurn = 2;
	} else if (playerTurn == 2) {
		playerTurn = 3;
	} else if (playerTurn == 3) {
		playerTurn = 1;
	}
	}
/* Update the HTML to show the current player's turn */
document.getElementById('turnText').innerHTML = 'It is Player ' + playerTurn + '\'s turn';

}

/* Checks square, if all side are drawn, then the player is given a point and they keep their turn.*/
function checkSquare(id) {
	console.log(id);
	id = eval(id);
	if (id.top == 1 && id.left == 1 && id.bottom == 1 && id.right == 1 && id.full != true) {
		id.isFull();
		playerScoreManager();
	}
	else {
		playerTurnManager();
	}
}

/* The event handler for clicking on a sqaure, calculates which line was clicked closest to and
draws the line. Other functions are then called deal with scores, turns, etc. */

document.querySelectorAll(".square").forEach(item => { item.addEventListener('click', (ev) => {

const x = ev.offsetX;
const y = ev.offsetY;
const el_size = ev.target.getBoundingClientRect();
const el_height = el_size.height;

let side = 0;
if (x/y < 1) {
	side = 0;
} else { side = 1;
}

let side2 = 0;
if (x / (el_height - y) < 1) {
side2 = 0;
} else {
	side2 = 1;
}

let target = ev.target;
console.log(target);

if (side == 0 && side2 == 0) {
	drawLine(target, 'left');
	//target.style['border-left'] = '1px solid black';
} else if (side == 0 && side2 == 1) {
	drawLine(target, 'bottom');
	//target.style['border-bottom'] = '1px solid black';
} else if  (side == 1 && side2 == 0) {
	drawLine(target, 'top');
	//target.style['border-top'] = '1px solid black';
} else if (side == 1 && side2 == 1) {
	drawLine(target, 'right');
	//target.style['border-right'] = '1px solid black';
}

})
})

/* This function handles the styling of the html and prevents already drawn sqaures
from being drawn again */
function drawLine(target, squareLine) {
if (squareLine == 'top' && eval(target.id).top !=1) {
	eval(target.id).top = 1;
	target.style['border-' + squareLine] = '1px solid black';
	proximitySquare(target, squareLine);
	checkSquare(target.id);
	
} else if (squareLine == 'left' && eval(target.id).left !=1) {
	eval(target.id).left = 1;
	target.style['border-' + squareLine] = '1px solid black';
	proximitySquare(target, squareLine);
	checkSquare(target.id);
} else if (squareLine == 'bottom' && eval(target.id).bottom !=1) {
	eval(target.id).bottom = 1;
	target.style['border-' + squareLine] = '1px solid black';
	proximitySquare(target, squareLine);
	checkSquare(target.id);
} else if (squareLine == 'right' && eval(target.id).right !=1) {
	eval(target.id).right = 1;
	target.style['border-' + squareLine] = '1px solid black';
	proximitySquare(target, squareLine);
	checkSquare(target.id);
}
checkSquare(target.id);
}

/* Combines lines that squares share into one line logically */
function proximitySquare(target, squareLine) {
	if (target.id == 'sq1') {
		if (squareLine == 'right') {
			drawLine(document.getElementById('sq2'), 'left');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq4'), 'top');
		}
	}

	if (target.id == 'sq2') {
		if (squareLine == 'left') {
			drawLine(document.getElementById('sq1'), 'right');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq5'), 'top');
		} else if (squareLine == 'right') {
			drawLine(document.getElementById('sq3'), 'left');
		}
	}

	if (target.id == 'sq3') {
		if (squareLine == 'left') {
			drawLine(document.getElementById('sq2'), 'right');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq6'), 'top');
		}
	}

	if (target.id == 'sq4') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq1'), 'bottom');
		} else if (squareLine == 'right') {
			drawLine(document.getElementById('sq5'), 'left');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq7'), 'top');
		}
	}

	if (target.id == 'sq5') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq2'), 'bottom');
		} else if (squareLine == 'right') {
			drawLine(document.getElementById('sq6'), 'left');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq8'), 'top');
		} else if (squareLine == 'left') {
			drawLine(document.getElementById('sq4'), 'right');
		}
	}

	if (target.id == 'sq6') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq3'), 'bottom');
		} else if (squareLine == 'left') {
			drawLine(document.getElementById('sq5'), 'right');
		} else if (squareLine == 'bottom') {
			drawLine(document.getElementById('sq9'), 'top');
		}
	}

	if (target.id == 'sq7') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq4'), 'bottom');
		} else if (squareLine == 'right') {
			drawLine(document.getElementById('sq8'), 'left');
		}
	}

	if (target.id == 'sq8') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq5'), 'bottom');
		} else if (squareLine == 'right') {
			drawLine(document.getElementById('sq9'), 'left');
		} else if (squareLine == 'left') {
			drawLine(document.getElementById('sq7'), 'right');
		}
	}

	if (target.id == 'sq9') {
		if (squareLine == 'top') {
			drawLine(document.getElementById('sq6'), 'bottom');
		} else if (squareLine == 'left') {
			drawLine(document.getElementById('sq8'), 'right');
		}
	}
	checkSquare(target.id);
}
	

/* Onload setup function */
function setup() {
	if (numPlayers == 2) {
		playerCreator();
		makeScores();
} else if (numPlayers == 3) {
	playerCreator();
	makeScores();
}

document.getElementById('turnText').innerHTML = 'It is Player ' + playerTurn + '\'s turn';
}