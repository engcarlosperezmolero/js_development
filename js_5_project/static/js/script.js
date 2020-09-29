// Challenge 1: your age in days

function ageInDays() {
	var birthYear = prompt("What year were you born?");
	var yearToDays = (2020 - birthYear) * 365;
	var h1 = document.createElement('h1');
	var textAnswer = document.createTextNode('You are ' + yearToDays + ' days old.')
	h1.setAttribute('id', 'ageInDays');
	h1.appendChild(textAnswer);
	document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
	document.getElementById('ageInDays').remove();
}

// functions for challenge 2: cat generator

function generateCat() {
	var image = document.createElement('img');
	var div = document.getElementById('flex-cat-gen');
	image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
	div.appendChild(image)
}


//=======================================================================

// function for challenge 3: rock, paper, scissors: kindof OOP

function rpsGame(yourChoice) {
	var humanChoice, botChoice;
	humanChoice = yourChoice.id;
	botChoice = numberToChoice(randToRpsInt());
	results = decideWinner(humanChoice, botChoice);
	message = finalMessage(results); // {'message': 'you won!', 'color': 'green'} 
	rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
	return Math.floor(Math.random() * 3); //generating random numbers between 0 - 3 (0,1,2)
}

function numberToChoice(number) {
	return ['rock', 'paper', 'scissors'][number]; // the number would be the random number generated look at botChoice
}

function decideWinner(yourChoice, botChoice) {
	var rpsDatabase = {
		'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},
		'paper':{'rock':1, 'paper':0.5, 'scissors':0},
		'scissors':{'paper':1, 'scissors':0.5,'rock':0}
	}

	var yourScore = rpsDatabase[yourChoice][botChoice];
	var botScore = rpsDatabase[botChoice][yourChoice];

	return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
	if (yourScore === 0) {
		return {'message': 'You lost!', 'color': 'red'};
	} else if (yourScore === 0.5) {
		return {'message': 'You tied!', 'color': 'yellow'};
	} else {
		return {'message':'you won!', 'color':'green'};
	}
}

function rpsFrontEnd(humanImg, botImg, finalMessage) {

	// database containing the images
	var imagesdb = {
		'rock': document.getElementById('rock').src,
		'paper': document.getElementById('paper').src,
		'scissors': document.getElementById('scissors').src
	}

	// removing all the first three images
	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

	// creando contenedores para cada componente
	var humanDiv = document.createElement('div');
	var botDiv = document.createElement('div');
	var mesageDiv = document.createElement('div');

	// creando el codigo html de las nuevas imagenes que van a aparecer como resultado y dandoles estilo css directo
	humanDiv.innerHTML = " <img src=' " + imagesdb[humanImg] + " ' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'> ";
	mesageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"
	botDiv.innerHTML = " <img src=' " + imagesdb[botImg] + " ' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'> ";

	// añadiendo cada contenedor con la imagen correspondiente al contenedor padre para que aparezcan en pantalla
	document.getElementById('flex-box-rps-div').appendChild(humanDiv);
	document.getElementById('flex-box-rps-div').appendChild(mesageDiv);
	document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//=======================================================================
// CHALLENGE 4: CHANGE BUTTON COLORS

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
	copyAllButtons.push(all_buttons[i].classList[1]);
}


function buttonColorChange(buttonThingy) {
	if (buttonThingy.value === 'red') {
		buttonRed();
	} else if (buttonThingy.value === 'green') {
		buttonGreen();
	} else if (buttonThingy.value === 'reset') {
		buttonColorReset();
	}else if (buttonThingy.value === 'random') {
		randomColors();
	}
}

function buttonRed() {
	for (let i=0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-danger');
	}
}

function buttonGreen() {
	for (let i=0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-success');
	}
}

function buttonColorReset() {
	for (let i=0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(copyAllButtons[i]);
	}
}

function randomColors() {
	var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

	for (let i=0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(choices[Math.floor(Math.random() * 4)]);
	}
}


//=======================================================================
// CHALLENGE 5: HOW BLACKJACK WORKS

let bjGame = {
	'you':{'scoreSpan':'#your-bj-result', 'div':'#your-box', 'score': 0},
	'dealer':{'scoreSpan':'#dealer-bj-result', 'div':'#dealer-box', 'score': 0},
	'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
	'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1, 11]},
	'wins': 0,
	'losses':0,
	'draws':0,
	'isStand':false,
	'turnsOver':false,
};

//active players dictionaries: YOU,DEALER
const YOU = bjGame['you'];
const DEALER = bjGame['dealer'];

const hitSound = new Audio('static/sounds/flip.wav');
const winSound = new Audio('static/sounds/win.wav');
const lostSound = new Audio('static/sounds/loose.mp3');

document.querySelector("#bj-hit-btn").addEventListener('click', bjHit);
document.querySelector("#bj-stand-btn").addEventListener('click', dealerLogic);
document.querySelector("#bj-deal-btn").addEventListener('click', bjDeal);

function bjHit() {
	if (bjGame['isStand'] === false){
		let card = randomCard();
		showCard(card, YOU);
		updateScore(card, YOU);
		showScore(YOU);
	}
}




function randomCard() {
	let randomIndex = Math.floor(Math.random() * 13);
	return bjGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
	if (activePlayer['score'] <= 21) {
		let cardImg = document.createElement('img');
		cardImg.src = `static/images/${card}.png`; // string template usa backticks y el ${}
		document.querySelector(activePlayer['div']).appendChild(cardImg);
		hitSound.play();
	}
}

function bjDeal() {

	if (bjGame['turnsOver'] === true) {
		let yourImgs = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImgs = document.querySelector('#dealer-box').querySelectorAll('img');  // el primer queryselecto se mete en el div, el segundo seleciona todas las imagenes dentro de ese div.
		for (let i=0; i < yourImgs.length; i++) { yourImgs[i].remove();};
		for (let i=0; i < dealerImgs.length; i++) {dealerImgs[i].remove();};
		document.querySelector('#your-bj-result').textContent = 0;
		document.querySelector('#dealer-bj-result').textContent = 0;
		YOU['score'] = 0;
		DEALER['score'] = 0;
		document.querySelector(YOU['scoreSpan']).style.color = 'white';
		document.querySelector(DEALER['scoreSpan']).style.color = 'white';
		document.querySelector('#blackjack-result').textContent = "Let's Play";
		document.querySelector('#blackjack-result').style.color = 'black';
		bjGame['isStand'] = false;
		bjGame['turnsOver'] = false;
	}
	
}

function updateScore(card, activePlayer) {
	// if adding 11 keeps me bellow 21 then add 11, otherwise add 1
	if (card === 'A') {
		if (activePlayer['score'] + bjGame['cardsMap'][card][1] <= 21) {
			activePlayer['score'] += bjGame['cardsMap'][card][1];
		} else {
			activePlayer['score'] += bjGame['cardsMap'][card][0];
		}
	} else {
	activePlayer['score'] += bjGame['cardsMap'][card];
	}
}

function showScore(activePlayer) {
	if (activePlayer['score'] > 21) {
		document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
	} else {
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
	if (bjGame['turnsOver'] === false && YOU['score'] > 1) {

		bjGame['isStand'] = true;
		while (DEALER['score'] < 16 && bjGame['isStand'] === true) {

				let card = randomCard();
				showCard(card, DEALER);
				updateScore(card, DEALER);
				showScore(DEALER);
				await sleep(1000);
			}
	

		bjGame['turnsOver'] = true;
		let winner = computeWinner();
		showResult(winner);
	
	}
}

// compute winner and retunr who you just won
// update the wins, losses and draws
function computeWinner() {
	let winner;

	if (YOU['score'] <= 21) {
		// higher score than dealer or when dealer bust but you're 21 or under
		if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)) {
			bjGame['wins']++;
			winner = YOU;
		} else if (YOU['score'] < DEALER['score']){
		  bjGame['losses']++;
		  winner = DEALER;
		} else if (YOU['score'] === DEALER['score']) {
		  bjGame['draws']++;
		}
	// condition: when user busts but dealer doesn't
	} else if (YOU['score'] > 21 && DEALER['score'] <= 21)  {
	  bjGame['losses']++;
	  winner = DEALER;

	// when you and the dealer busts
	} else if (YOU['score'] > 21 && DEALER['score'] > 21)  {
	  bjGame['draws']++;
	}

	return winner;
}

function showResult(winner) {
	let message, messageColor;

	if (winner === YOU) {
		message = 'You won!';
		messageColor = 'green';
		winSound.play();
		document.querySelector('#wins').textContent = bjGame['wins'];
	} else if ( winner === DEALER) {
		message = 'You lost!';
		messageColor = 'red';
		lostSound.play();
		document.querySelector('#losses').textContent = bjGame['losses'];
	} else {
		message = 'You drew!';
		messageColor = 'black';
		document.querySelector('#draws').textContent = bjGame['draws'];
	}

	document.querySelector('#blackjack-result').textContent = message;
	document.querySelector('#blackjack-result').style.color = messageColor;
}


