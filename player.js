function Player(hero, nick, positionX, positionY, ctx){
    this.nick = nick;
    this.hero = heroList[hero];
    this.positionX = positionX;
    this.positionY = positionY;
    this.ctx = ctx;
    this.speed = heroList[hero].info.speed;
    this.maxspeed = 15;
    this.hp = 100;
    
    this.state = 'stand'
    this.framecount = 1;
    
    this.renderCharacter()
    
    window.addEventListener("keydown", this.KeySaverToBool.bind(this));
    window.addEventListener("keyup", this.KeySaverToBool.bind(this));
    // naciśnięcie przycisku
}
    
Player.prototype.renderCharacter = function(){
    // rysowanie postaci
    let player = new Image();
    player.src = "player.png";
    this.ctx.drawImage(player, (this.framecount*32), this.hero[this.state].startY, 32,32,this.positionX,this.positionY,32,32)
    
    
    
    if(this.speed>=this.maxspeed){
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(this.positionX, this.positionY, 32, 32);
    }
    
    
    // Rysowanie nicku nad postacią
    this.ctx.font = "12px Arial";
    var textWith = this.ctx.measureText(`${this.nick}(${this.hp})`).width;
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${this.nick}(${this.hp})`,(this.positionX+16-(textWith/2)),this.positionY-5);
}

let frame;
Player.prototype.nextFrame = function(){
    if(frame>=7-(this.speed/3)) {
        if(this.framecount < this.hero[this.state].count) {
        this.framecount += 1;
        frame = null;
        } else {
            this.framecount = 1;
        }
    }
    //console.log(this.framecount);
}
var map = {87: false, 83: false, 65: false, 68: false};
var change;

/*
    87 - W
    83 - S
    65 - A
    68 - D
*/
Player.prototype.KeySaverToBool = function(e){
    // obsługa wielu klawiszy jednocześnie. :)
    if (e.type == 'keydown' && e.keyCode in map) {
        map[e.keyCode] = true;
        change = !change
    }
    if(e.type == 'keyup' && e.keyCode in map){
        map[e.keyCode] = false;
        change = !change
    }
    
}

Player.prototype.detectCollision = function(){
    if(map[83] || map[87] || map[68] || map[65]){
        let canvas = document.querySelector('#map');
        if(this.positionY>=canvas.width-32){
            this.positionY=canvas.width-32;
        }
        if(this.positionY<=0){
            this.positionY=0;
        }
        
        
        if(this.positionX>=canvas.width-32){
            this.positionX=canvas.width-32;
        }
        if(this.positionX<=0){
            this.positionX=0;
        }
    }
}

Player.prototype.move = function(){
    if(map[87] || map[83] || map[65] || map[68]){
        if(this.speed <=this.maxspeed) this.speed += 0.1
        this.nextFrame();
        frame++;
        //console.log(this.speed);
    }
    
    if(map[87] && map[65]){
        this.state = 'up';
        this.positionY -= 1+(this.speed*0.2);
        this.positionX -= 1+(this.speed*0.2);
    } else if(map[87] && map[68]){
        this.state = 'up';
        this.positionY -= 1+(this.speed*0.2);
        this.positionX += 1+(this.speed*0.2);
    } else if(map[87]){
        this.state = 'up';
        this.positionY -= 1+(this.speed*0.2);
    }
    
    if(map[83] && map[65]){
        this.state = 'down';
        this.positionY += 1+(this.speed*0.2);
        this.positionX -= 1+(this.speed*0.2);
    } else if(map[83] && map[68]){
        this.state = 'down';
        this.positionY += 1+(this.speed*0.2);
        this.positionX += 1+(this.speed*0.2);
    } else if(map[83]){
        this.state = 'down';
        this.positionY += 1+(this.speed*0.2);
    }
    
    
    if(map[65] && (!map[83] && !map[87])){
        this.state = 'left';
        this.positionX -= 1+(this.speed*0.2);
    } 
    
    if(map[68] && (!map[83] && !map[87])){
        this.state = 'right';
        this.positionX += 1+(this.speed*0.2);
    } 
    
    if(!map[83] && !map[87] && !map[68] && !map[65]){
        this.framecount = 1;
        frame = 0;
        this.speed = 5;
        //console.log(this.speed);
    }
    
    // detekcja kolizji
    this.detectCollision();
    
}

Player.prototype.init = function(){
    this.renderCharacter();
    this.move();
}



const heroList = {
    ninja: {
        info: {speed: 5, sizeSprite: 32},
        stand: {startY: 0, count: 1},
        up: {startY: 96, count: 5},
        down: {startY: 0, count: 5},
        left: {startY: 32, count: 5},
        right: {startY: 64, count: 5},
    },
    barba: {
        info: {startX: 0, startY: 0, sizeSprite: 32},
        up: {stand: 2, count: 6},
        down: {stand: 2, count: 6},
        left: {stand: 2, count: 6},
        right: {stand: 2, count: 6},
    }
}