//Initialize the scores for the player and the enemy
var playerScore = 0;
var lives = 3;

// Enemies our player must avoid
var Enemy = function(xAxis, yAxis, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = xAxis;
    this.y = yAxis;

    //pass the size of the enemyBug
    this.width = 80;
    this.height = 50;

    //pass the speed of the bug 
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = 0; //reposition the bug once it reached the canvas (right side)
    }
};

Enemy.prototype.score = function() {
    if (lives <= 0) {
        alert("It looks like the bugs beats you.  Try again.")
        playerScore = 0;
        lives = 3;
        return lives;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(xAxis, yAxis) {
    this.x = xAxis;
    this.y = yAxis;
    this.width = 50;
    this.height = 75;
    this.sprite = "images/char-boy.png";
}

// Once the player reach the water
// Reposition the player back to starting position
// Track the score of the Player as it reach the water
Player.prototype.update = function(dt) {

    if (this.y <= 0) {
        this.score();
        // reposition the player from the start
        this.reset(202, 404);
    }
}

Player.prototype.score = function() {
    // If the player reached the water add a score  
    playerScore++;
    if (playerScore >= 3) {
        if (confirm('Wow you beat the bugs!  Well done.')) {
            playerScore = 0;
            lives = 3;
        } else {
            alert("Thank you for playing");
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Display the score for the player 
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + playerScore, 0, 20);

    // Display the score for the enemy 
    ctx.fillText("Remaining Lives: " + lives, 300, 20);
}

// Player movement functions
Player.prototype.handleInput = function(direction) {
    Player.prototype.handleInput = function(keyCode) {
        if (keyCode === 'left' && this.x > 0) {
            this.x -= 101;
        } else if (keyCode === 'right' && this.x < 400) {
            this.x += 101;
        } else if (keyCode === 'up' && this.y > 0) {
            this.y -= 83;
        } else if (keyCode === 'down' && this.y < 400) {
            this.y += 83;
        }
    };
}

// Set the x and y coordinates of the bugs
// x-horizontal, y-vertical, speed
// speed maybe set at random by using 
// Math.floor((Math.random() * 100) + 30);
var bug1Speed = Math.floor((Math.random() * 100) + 100);
var allEnemies = [
    new Enemy(0, 65, bug1Speed), //bug 1 
    new Enemy(50, 150, 75), //bug 2     
    new Enemy(0, 225, 120) //bug 3
];

// Instatiate the player
// Set it to starting position
var player = new Player(202, 404);

// Reset's player postion after collison with enemies 
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;

};

// Check for collisions between the bugs and the player
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            lives--; // Update the enemy score
            Enemy.prototype.score();
            player.reset(202, 404);
        }
    }
}


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