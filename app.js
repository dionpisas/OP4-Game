/// <reference path="phaser/phaser.d.ts" />
var Game = /** @class */ (function () {
    function Game() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content', { create: this.create, preload: this.preload, update: this.update, render: this.render });
    }
    Game.prototype.preload = function () {
        //Loads sprite images
        var sunLoader = this.game.load.image("sun", "Assets/Graphics/sun.png");
        var earthLoader = this.game.load.image("earth", "Assets/Graphics/earth.png");
        var uiLoader = this.game.load.image("ui", "Assets/Graphics/ui.png");
        var jupiterLoader = this.game.load.image("jupiter", "Assets/Graphics/jupiter.png");
        var spaceshipLoader = this.game.load.atlasXML("spaceship", "Assets/Graphics/sheet.png", "Assets/Graphics/sheet.xml");
        var starLoader = this.game.load.image("star", "Assets/Graphics/star.png");
    };
    Game.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.world.setBounds(0, 0, 3000, 3000);
        //adds the image to a variable
        //adds sprites to the game and sets coordinates
        for (var i = 0; i < 200; i++) {
            this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star");
        }
        this.Sprite = this.game.add.sprite(this.game.world.centerX - 175, this.game.world.centerY - 175, "sun");
        this.earthSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "earth");
        this.jupiterSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "jupiter");
        this.uiSprite = this.game.add.sprite(0, 40, "ui");
        this.spaceshipSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "spaceship");
        this.game.physics.p2.enable(this.spaceshipSprite);
        //scale sprites down 
        this.jupiterSprite.scale.set(0.2, 0.2);
        this.earthSprite.scale.set(0.5, 0.5);
        this.spaceshipSprite.scale.set(0.3, 0.3);
        this.Sprite.scale.set(0.5, 0.5);
        this.spaceshipSprite.frame = 218;
        // this.earthSprite.pivot.x = 1200
        //  this.jupiterSprite.pivot.x = 1200  
        this.star.pivot.x = 1200;
        this.uiSprite.fixedToCamera = true;
        //add keyboard controls
        this.Cursors = this.game.input.keyboard.createCursorKeys();
        this.Keyboard = this.game.input.keyboard;
        this.game.camera.follow(this.spaceshipSprite);
    };
    Game.prototype.update = function () {
        //sets keyboard controlss
        this.spaceshipSprite.body.setZeroVelocity();
        this.game.input.update();
        if (this.Cursors.up.isDown) {
            this.spaceshipSprite.body.moveUp(300);
        }
        else if (this.Cursors.down.isDown) {
            this.spaceshipSprite.body.moveDown(300);
        }
        if (this.Cursors.left.isDown) {
            this.spaceshipSprite.body.velocity.x = -300;
        }
        else if (this.Cursors.right.isDown) {
            this.spaceshipSprite.body.moveRight(300);
        }
        this.spaceshipSprite.rotation += 0.5;
        this.earthSprite.rotation += 0.0010;
        this.jupiterSprite.rotation += 0.0020;
        if (this.Keyboard.addKey(32).isDown) {
            this.earthSprite.rotation += 0.010;
            this.jupiterSprite.rotation += 0.020;
        }
    };
    Game.prototype.render = function () {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32)
        //this.game.debug.spriteCoords(this.spaceshipSprite, 32, 500)
    };
    return Game;
}());
window.onload = function () {
    var game = new Game();
};
/*
module Game {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game
        constructor() {
            super()
        }
        sprites: Phaser.Sprite

        preload() {
            this.load.image("title", "Assets/Graphics/TitleScreen.png")
            this.load.image("earth", "Assets/Graphics/earth_low.png")
            this.load.image("sun", "Assets/Graphics/sun.png")
            this.load.image("mars", "Assets/Graphics/mars.png")
            this.load.image("venus", "Assets/Graphics/venus.png")
            this.load.image("jupiter", "Assets/Graphics/jupiter.png")
        }
        create() {
            this.sprites = this.add.sprite(0, 0, "title")
            this.input.onTap.addOnce(this.titleClicked, this) // <-- that um, this is extremely important
        }
        titleClicked() {
            this.game.state.start("SpaceshipScreenState")
        }
    }
    export class SpaceshipScreenState extends Phaser.State {
        game: Phaser.Game
        constructor() {
            super()
       }
        spaceshipImage: Phaser.Sprite

        preload() {
            this.load.image("spaceship1", "Assets/Graphics/Spaceship1.png")
            this.load.image("spaceship2", "Assets/Graphics/Spaceship2.png")
            this.load.image("spaceship3", "Assets/Graphics/Spaceship3.png")
        }
        create() {
            this.spaceshipImage = this.add.sprite(300, 300, "spaceship1")
            this.spaceshipImage = this.add.sprite(500, 300, "spaceship2")
            this.spaceshipImage = this.add.sprite(700, 300, "spaceship3")
            this.input.onTap.addOnce(this.spaceshipClicked, this) // <-- that um, this is extremely important
        }
        spaceshipClicked() {
            this.game.state.start("GameRunningState")
            this.spaceshipImage.x++
        }
    }
    export class GameRunningState extends Phaser.State {
        constructor() {
            super()
        }
      sprites: Phaser.Sprite

        create() {
            
            this.sprites = this.add.sprite(600, 300, "earth")
            this.sprites = this.add.sprite(350, 250, "mars")
            this.sprites = this.add.sprite(1090, 350, "venus")
            this.sprites = this.add.sprite(0, 400, "jupiter")
            this.sprites = this.add.sprite(900, -300, "sun")
        }

        update() {
            
            
        }

        render() {
            
        }
    }

    export class SpaceGame {
        game: Phaser.Game

        constructor() {
            this.game = new Phaser.Game(1280,720, Phaser.WEBGL, 'content')

            this.game.state.add("GameRunningState", GameRunningState, false)
            this.game.state.add("TitleScreenState", TitleScreenState, false)
            this.game.state.add("SpaceshipScreenState", SpaceshipScreenState, false)
            this.game.state.start("TitleScreenState", true, true)
        }

    }
}

window.onload = () => {
    var game = new Game.SpaceGame()
};
*/ 
//# sourceMappingURL=app.js.map