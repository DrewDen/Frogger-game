let player;
let rock1;
let rock2;
let rock3;
let rock4;
let allrock;
let bug;
let lives;
let allEnemies = [];
function reset() {
    player = new Player(300, 400, 50);
    rock1 = new Rock(142);
    rock2 = new Rock(60);
    allrock = [];
    allrock.push(rock1,rock2);
    allEnemies = [];
    bugOne = new Enemy(-100, 142);
    bugTwo = new Enemy(-100, 70);
    bugThree = new Enemy(-100, 210);
    allEnemies.push(bugOne, bugTwo, bugThree);
}








/* ---------------------------------------------------------- */

const Rock = function (y){
    this.x = Math.floor((Math.random() * 500) + 1);
    this.y = y;
    this.stone = 'images/Rock.png'
    this.hasCollided = function(xVal, yVal){
        return xVal< this.x + 50 && xVal > this.x - 60 && yVal < this.y + 50 && yVal > this.y - 60;
    }
};


Rock.prototype.render = function(){
    ctx.drawImage(Resources.get(this.stone), this.x, this.y);   
};


// Enemies our player must avoid
const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 675);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
     
    this.x = this.x + (this.speed * dt)
   
    if(this.x > 950){
        this.x = -100;
    }

    if (player.x < this.x + 60 && player.x + 37 > this.x &&
    player.y < this.y + 25 && 30 + player.y > this.y 
    && !player.takingDamage)
    {
        player.takingDamage = true;
        lives--;
        console.log('taking lives');
        player.clearPlayer();
        player.newPlayer();
    
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.resetting = false;
    lives = 3;
        this.level = function(){
            alert('Bonus level');
            reset();
        };
    
        this.reset = function(){
            this.x = 300;
            this.y = 400;
            this.resetting = false;
            this.level();   
        }

        this.clearPlayer = function(){
            if(lives === 0){
               alert(`The game is over. You have ${lives} remaining lives.`);
               reset();
            } else {
                player.newPlayer();
                setTimeout(function(){
                player.takingDamage = false;    
                }, 100);
            }   
    
        }     
    
    
        this.newPlayer = function (){
            this.x = 200;
            this.y = 400;
        }
    
};

Player.prototype.update = function() {
    
    if(this.y <= -50 && !this.resetting){
        this.resetting = true;
        let backToStart = this.reset.bind(this);
        setTimeout(backToStart, 2000);
    }
    
    
    if(this.x <= 0){
        this.x = 0;
    }
    
    if(this.x >= 510){
        this.x = 500;
    }
    
    if(this.y >= 380){
        this.y = 380;
    }
    
    if(this.y <= 0){
        this.y = -50;
    }    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

Player.prototype.handleInput = function(keypress) {
    let hasCollidedWithRock = true;
    let player = this;

    switch(keypress){
        case 'left' :
        hasCollidedWithRock = allrock.some(function(rock){
            return rock.hasCollided(player.x - 98, player.y);
        });
            if(!hasCollidedWithRock){
                player.x-= 101;
            }      
        break;

        case'up' :
        hasCollidedWithRock = allrock.some(function(rock){
            return rock.hasCollided(player.x, player.y - 75);
             
        });
            if(!hasCollidedWithRock){
                player.y -= 82;
            }
        break;
        
        case 'right':
        hasCollidedWithRock = allrock.some(function(rock){
            return rock.hasCollided(player.x + 98, player.y);
        });
            if(!hasCollidedWithRock){
                player.x += 101;
            }
        break;

        case 'down':
        hasCollidedWithRock = allrock.some(function(rock){
            return rock.hasCollided(player.x, player.y + 75);
        });
            if(!hasCollidedWithRock){
                player.y += 82;
            }
        break;
    }    
};

/* const player = new Player(300,400,50);
let rock1  = new Rock(142);
let rock2 = new Rock(60);


let allrock = [];
allrock.push(rock1,rock2,rock3);
 */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* let bug = new Enemy(-100, 220);
let allEnemies = [];
allEnemies.push(bug,bug2,bug3,bug4);
 */
 
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
