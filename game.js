function Game(cw, ch){
    this.canvas = document.querySelector('#map');
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = cw;
    this.canvas.height = ch;
    this.map = [2, 3];
    this.tileSize = 32;
    this.players = [];
    
    document.addEventListener('mousemove', this.drawText.bind(this));
    
    this.render();
}

Game.prototype.drawMap = function(){
    let game = new Image();
    game.src = "tilemap32.png";
    
    let count = 15;
    for(CountY = 0; CountY<=count; CountY++){
        for(CountX = 0; CountX<=count; CountX++){
            this.ctx.drawImage(game, 74+32+1,32+1,32,32,(0+CountX*32),(0+CountY*32),32,32)
        }
    }
};

Game.prototype.render = function(){
    this.drawMap();
    this.players.forEach((player) => player.init());
    
    
    //setTimeout(() => this.render(), 100)
    window.requestAnimationFrame(() => this.render())
};

Game.prototype.createPlayer = function(nick){
    
    // stworzenie specjalnej warstwy, tylko dla graczy.
    var canvas = document.querySelector('#map');
    var ctx = canvas.getContext("2d");
    // przekazanie wszystkich parametrów.
    this.players.push(new Player('ninja', nick, 100, 300, ctx))
};

Game.prototype.drawText = function(e){
    let canvas = document.querySelector('#animation');
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    let ctx = canvas.getContext("2d");
    
    let position = []
    position.push(e.clientX-canvas.offsetLeft)
    position.push(e.clientY-canvas.offsetTop)
    
    if(this.players[0]){
        var a = position[0] - (this.players[0].positionX+16)
        var b = position[1] - (this.players[0].positionY+16)

        var c = Math.sqrt( a*a + b*b )/32;
        console.log(`Kamil jest: ${c} kratek dalej!`);
    }
    
    ctx.font = "10px Arial";
    ctx.fillText(`x:${position[0]}:y:${position[1]}`,position[0],position[1]);
    
};

console.log('Wpisz komendę game.createPlayer("nick postaci"), aby stworzyć bohatera')



var game = new Game(512, 512);