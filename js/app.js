// Enemies our player must avoid
var Enemy = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.width = 70;
	this.height = 70;
	this.x = -20;
	this.y = (function() {
		let randNumX = Math.random() * 100;
		let pos;
		if (randNumX > 80) {
			pos = 225;
		} else if (randNumX > 60) {
			pos = 145;
		} else if (randNumX > 40) {
			pos = 305;
		} else if (randNumX > 20) {
			pos = 385;
		} else {
			pos = 65;
		}
		return pos;
	}());
};



var Player = function() {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/char-boy.png';
	this.width = 70;
	this.height = 70;
	this.x = 202.5;
	this.y = 550;
	this.move = 'none';
};


(function getSprite() {
	document.getElementById('play').addEventListener('click', function() {
		player = new Player();

	});
	let sprites = Array.from(document.querySelectorAll('img'));
	for (let i = 0; i < sprites.length; i++) {
		sprites[i].addEventListener('click', function() {
			let spriteSRC = sprites[i].getAttribute('src');
			player.sprite = spriteSRC;
			document.getElementById('beginModal').style.display = 'none';
		});
	}

}());

let player = new Player();

var StaticRock = function() {
	this.x = 202.5;
	this.y = 225;
	this.rock = 'images/Rock.png';
	this.width = 70;
	this.height = 70;
};

var RandomRock = function() {
	let randNumX = Math.random() * 100;
	this.x = (function() {
		let pos;
		if (randNumX > 80) {
			pos = 1.5;
		} else if (randNumX > 60) {
			pos = 101.5;
		} else if (randNumX > 40) {
			pos = 303.5;
		} else if (randNumX > 20) {
			pos = 404.5;
		}
		return pos;
	}());
	this.y = (function() {
		let pos;
		if (randNumX > 80) {
			pos = 225;
		} else if (randNumX > 60) {
			pos = 145;
		} else if (randNumX > 40) {
			pos = 305;
		} else if (randNumX > 20) {
			pos = 385;
		} else {
			pos = 65;
		}
		return pos;
	}());
	this.rock = 'images/Rock.png';
	this.width = 70;
	this.height = 70;
};

let sRock = new StaticRock();
let rRock = new RandomRock();
let rRock2 = new RandomRock();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
	//this.x = (this.x + 50) * dt;

	let randNumX = Math.random() * 100;
	if (this.x > 505) {
		this.x = -25;
		this.y = (function() {
			let pos;
			if (randNumX > 80) {
				pos = 225;
			} else if (randNumX > 60) {
				pos = 145;
			} else if (randNumX > 40) {
				pos = 305;
			} else if (randNumX > 20) {
				pos = 385;
			} else {
				pos = 65;
			}
			return pos;
		}());
	};

	let slow = dt * 5;
	let slow2 = dt * 5;
	let medium = dt * 5;
	let medium2 = dt * 5;
	let fast = dt * 5;
	let stupid = dt * 1000;



	allEnemies[0].x += slow;
	allEnemies[1].x += medium;
	allEnemies[2].x += fast;
	allEnemies[3].x += slow2;
	allEnemies[4].x += medium2;

};



//this.x = this.x + (((Math.random() * 100) * 2) + ((Math.random() * 100) * 2) + ((Math.random() * 100) * 2)) * dt;
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.



Player.prototype.update = function(dt) {

	let speed = dt * 100;
	if (this.move === 'up') {
		let newPos = this.y - 80;
		while (this.y > newPos) {
			this.y -= speed;
		}
	} else if (this.move === 'down') {
		let newPos = this.y + 80;
		while (this.y < newPos) {
			this.y += speed;
		}
	} else if (this.move === 'left') {
		let newPos = this.x - 100;
		while (this.x > newPos) {
			this.x -= speed;
		}
	} else if (this.move === 'right') {
		let newPos = this.x + 100;
		while (this.x < newPos) {
			this.x += speed;
		}
	}
	this.move = 'none';
};



// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
	debugger;
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

StaticRock.prototype.render = function() {
	ctx.drawImage(Resources.get(this.rock), this.x, this.y);
};

RandomRock.prototype.render = function() {
	ctx.drawImage(Resources.get(this.rock), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(dir) {

	if (dir === 'up' && (this.y - 80) > -30) {
		this.move = 'up';
	} else if (dir === 'down' && this.y + 80 < 600) {
		this.move = 'down';
	} else if (dir === 'left' && this.x - 100 > -10) {
		this.move = 'left';
	} else if (dir === 'right' && this.x + 100 < 450) {
		this.move = 'right';
	} else {
		this.y += 0;
		this.x += 0;
	}
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let enemy4 = new Enemy();
let enemy5 = new Enemy();
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	console.log(allowedKeys[e.keyCode]);
	player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
	for (let enemy of allEnemies) {
		if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
			player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
			player.x = 202.5;
			player.y = 550;
		}
	}
};

function checkWin() {
	if (player.y < -0) {
		let modal = document.getElementById('endModal');
		modal.style.display = "block";
	}
};