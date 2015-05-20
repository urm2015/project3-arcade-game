// Enemy code
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Create enemy and set it to start position
    this.sprite = 'images/enemy-bug.png';
    this.width = 20;
    this.height = 20;
    this.speed = speed;
    this.row = row;
    this.start();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //If the enemy reaches the right side of the canvas wrap back to start
    if (this.x > canvasWidth) {
        this.start(this.row);
    }
};

//Set enemy to start position
Enemy.prototype.start = function() {

    this.x = 0;
    this.y = canvasHeight / this.row;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player code
//Create Player and place in starting position
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.width = 20;
    this.height = 20;
    this.start();
};

//If the player reaches the water reset to starting position
Player.prototype.update = function(){

    if (this.y < canvasHeight / 50) {
        this.start();
    }
};

//Place the player at starting position
Player.prototype.start = function() {

    this.x = 202;
    this.y = 400;
};

//Player movement

Player.prototype.handleInput = function(direction){
    switch(direction) {
        //Move Left
        case 'left':
            if(this.x - 100 < -50) return;
            this.x -= 100;
        break;
        //Move Up
        case 'up':
            if(this.y - 1 < 0) return;
            this.y -= 85;
        break;
        //Move Right
        case 'right':
            if(this.x + 100 > canvasWidth - 99) return;
            this.x += 100;
        break;
        //Move Down
        case 'down':
            if(this.y + 85 > canvasHeight - 150) return;
            this.y += 85;
        break;
    }
};

//Draw Player on Screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var canvasWidth = 505;
var canvasHeight = 606;

var allEnemies = [];
var player = new Player();

    //Variables to define starting position of the enemies
var row1 = 2.61;
var row2 = 4;
var row3 = 8.9;

    //Variables to determine the speed of each enemy
var speed1 = 400;
var speed2 = 100;
var speed3 = 200;

    //Variables to create each enemy and load into the array
var enemy1 = new Enemy(row1, speed1);
    allEnemies.push(enemy1);
var enemy2 = new Enemy(row2, speed2);
    allEnemies.push(enemy2);
var enemy3 = new Enemy(row3, speed3);
    allEnemies.push(enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});