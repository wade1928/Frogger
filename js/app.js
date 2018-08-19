//Variables to determine score
let score = 5;
let arrayOfStars = Array.from(document.getElementById('starsCount').children);
//Object constructor for enemies
var Enemy = function() {
	this.sprite = 'images/enemy-bug.png';
	this.width = 70;
	debugger;
	this.height = 70;
	this.x = -20;
	this.y = this.calculateY();
};

//Object constructor for player
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.width = 70;
	this.height = 70;
	this.x = 202.5;
	this.y = 550;
	this.move = 'none';
};
//Instance of player
let player = new Player();
//Function to allow user to choose sprite at the beginning of each game
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
//Object constructor for middle rock
var StaticRock = function() {
	this.x = 202.5;
	this.y = 225;
	this.rock = 'images/Rock.png';
	this.width = 70;
	this.height = 70;
};
let sRock = new StaticRock();
//Object constructor for random rocks
var RandomRock = function() {
	let randNumX = Math.random() * 100;
	this.x = this.calculateX();
	this.y = this.calculateY();
	this.rock = 'images/Rock.png';
	this.width = 70;
	this.height = 70;
};

//Object constructor for blue gem
var Gem = function() {
	this.x = 217;
	this.y = 172;
	this.gem = 'images/blueGem.png';
	this.width = 70;
	this.height = 70;
};
let blueGem = new Gem();
//Event listener for key presses
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
//Method to update enemy position using delta time
Enemy.prototype.update = function(dt) {
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
	//Speed for each of the Enemy instances
	let slow = dt * 10;
	let slow2 = dt * 25;
	let medium = dt * 40;
	let medium2 = dt * 55;
	let fast = dt * 100;
	let stupid = dt * 1000;
	allEnemies[0].x += slow;
	allEnemies[1].x += medium;
	allEnemies[2].x += fast;
	allEnemies[3].x += slow2;
	allEnemies[4].x += medium2;

};
//Method to update player position based on delta time
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

//Methods to render each object instance
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

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.gem), this.x, this.y);
};

Enemy.prototype.calculateY = function() {
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
};

RandomRock.prototype.calculateX = function() {
	let randNumX = Math.random() * 100;
	let pos;
	if (randNumX > 80) {
		pos = 1.5;
	} else if (randNumX > 60) {
		pos = 101.5;
	} else if (randNumX > 40) {
		pos = 303.5;
	} else if (randNumX > 20) {
		pos = 404.5;
	} else {
		pos = 505.5;
	}
	return pos;
};

RandomRock.prototype.calculateY = function() {
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
};


//Instances of enemies
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let enemy4 = new Enemy();
let enemy5 = new Enemy();
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
let rRock = new RandomRock();
let rRock2 = new RandomRock();
let rocks = [sRock, rRock, rRock2];
if (rRock.y === rRock2.y && rRock.x === rRock2.x) {
	rRock.y += 80;
	rRock.x += 100;
};
//Method to handle user directional input
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


//Function to check for enemy/player collision and update sprite accordingly
function checkCollisions() {
	for (let enemy of allEnemies) {
		if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
			player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
			player.x = 202.5;
			player.y = 550;
			score -= 1;
		}

	}
};

//Function to check if the player has obtained the blue gem and reached the top level
function checkWin() {
	if ((player.x > 195 && player.x < 215) && (player.y > 140 && player.y < 150)) {
		blueGem.y = 12;
	};
	if (player.y < -0 && blueGem.y === 12) {
		let modal = document.getElementById('endModal');
		checkStars();
		modal.style.display = "block";
	} else if (player.y < -0 && blueGem.y !== 12) {
		player.x = 202.5;
		player.y = 550;
	}
};

//Function to stop player movement if rock is present
function checkRocks(dt) {

	for (let rock of rocks) {
		{
			if (player.move === 'up' && player.y > rock.y) {
				if (player.x < rock.x + 3 && player.x > rock.x - 3) {
					let newPos = player.y - 80;
					if (newPos + player.height < rock.y + 80) {
						player.x += 0;
						player.y += 0;
						player.move = 'none';
					}
				}
			} else if (player.move === 'down' && player.y < rock.y) {
				if (player.x < rock.x + 3 && player.x > rock.x - 3) {
					let newPos = player.y + 80;
					if (newPos + player.height > rock.y) {
						player.x += 0;
						player.y += 0;
						player.move = 'none';
					}
				}
			} else if (player.move === 'left' && player.x > rock.x) {
				if (player.y < rock.y + 10 && player.y > rock.y - 10) {
					let newPos = player.x - 100;
					if (newPos + player.width < rock.x + 100) {
						player.x += 0;
						player.y += 0;
						player.move = 'none';
					}
				}

			} else if (player.move === 'right' && player.x < rock.x) {
				if (player.y < rock.y + 10 && player.y > rock.y - 10) {
					let newPos = player.x + 100;
					if (newPos + player.width > rock.x) {
						player.x += 0;
						player.y += 0;
						player.move = 'none';
					}
				}


			}
		}
	}
};
//Function to display the correct number of stars in the end modal
function checkStars() {
	if (score === 4) {
		document.getElementById('star1').style.display = 'none';
	} else if (score === 3) {
		document.getElementById('star1').style.display = 'none';
		document.getElementById('star2').style.display = 'none';
	} else if (score === 2) {
		document.getElementById('star1').style.display = 'none';
		document.getElementById('star2').style.display = 'none';
		document.getElementById('star3').style.display = 'none';
	} else if (score <= 1) {
		document.getElementById('star1').style.display = 'none';
		document.getElementById('star2').style.display = 'none';
		document.getElementById('star3').style.display = 'none';
		document.getElementById('star4').style.display = 'none';

	}
};