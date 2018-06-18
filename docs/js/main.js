"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var TitleScreenState = (function (_super) {
        __extends(TitleScreenState, _super);
        function TitleScreenState() {
            return _super.call(this) || this;
        }
        TitleScreenState.prototype.preload = function () {
            this.load.image("title", "../dev/Assets/Graphics/StartScreen.png");
            this.game.load.audio('music', '../dev/assets/sounds/titlemusic.mp3');
        };
        TitleScreenState.prototype.create = function () {
            this.music = this.game.add.audio('music');
            this.music.allowMultiple = false;
            this.sprites = this.add.sprite(0, 0, "title");
            this.input.onTap.addOnce(this.titleClicked, this);
            this.music.play();
        };
        TitleScreenState.prototype.titleClicked = function () {
            this.game.state.start("SpaceshipScreenState");
        };
        return TitleScreenState;
    }(Phaser.State));
    Game.TitleScreenState = TitleScreenState;
    var SpaceshipScreenState = (function (_super) {
        __extends(SpaceshipScreenState, _super);
        function SpaceshipScreenState() {
            return _super.call(this) || this;
        }
        SpaceshipScreenState.prototype.preload = function () {
            this.load.image("spaceship1", "../dev/Assets/Graphics/Spaceship1.png");
            this.load.image("spaceship2", "../dev/Assets/Graphics/Spaceship2.png");
            this.load.image("spaceship3", "../dev/Assets/Graphics/Spaceship3.png");
        };
        SpaceshipScreenState.prototype.create = function () {
            this.spaceshipImage = this.add.sprite(500, 300, "spaceship1");
            this.spaceshipImage = this.add.sprite(700, 300, "spaceship2");
            this.spaceshipImage = this.add.sprite(900, 300, "spaceship3");
            this.text = this.game.add.text(650, 200, 'Kies je Ruimteschip', { font: '20px Arial', fill: '#ffffff' });
            this.input.onTap.addOnce(this.spaceshipClicked, this);
        };
        SpaceshipScreenState.prototype.spaceshipClicked = function () {
            this.game.state.start("GameRunningState");
            console.log(this.spaceshipClicked);
        };
        return SpaceshipScreenState;
    }(Phaser.State));
    Game.SpaceshipScreenState = SpaceshipScreenState;
    var MiniGameState = (function (_super) {
        __extends(MiniGameState, _super);
        function MiniGameState() {
            return _super.call(this) || this;
        }
        MiniGameState.prototype.create = function () {
            console.log("minigame started");
        };
        return MiniGameState;
    }(Phaser.State));
    Game.MiniGameState = MiniGameState;
    var GameRunningState = (function (_super) {
        __extends(GameRunningState, _super);
        function GameRunningState() {
            var _this = _super.call(this) || this;
            _this.timeDelay = 0;
            return _this;
        }
        GameRunningState.prototype.preload = function () {
            this.game.load.image('player', '../dev/Assets/graphics/spaceship.png');
            this.game.load.image('earth', '../dev/Assets/graphics/earth.png');
            this.game.load.image('venus', '../dev/Assets/graphics/venus.png');
            this.game.load.image('mars', '../dev/Assets/graphics/mars.png');
            this.game.load.image("sun", "../dev/Assets/Graphics/sun.png");
            this.game.load.image("earth", "../dev/Assets/Graphics/earth.png");
            this.game.load.image("ui", "../dev/Assets/Graphics/ui.png");
            this.game.load.image("jupiter", "../dev/Assets/Graphics/jupiter.png");
            this.game.load.image("saturn", "../dev/Assets/graphics/saturn.png");
            this.game.load.image("star", "../dev/Assets/Graphics/star.png");
            this.game.load.image("popup", "../dev/Assets/Graphics/popup.png");
            this.game.load.image("button", "../dev/Assets/graphics/button.png");
            this.game.load.image("engine", "../dev/assets/graphics/engine.png");
            this.game.load.image("engineleft", "../dev/assets/graphics/engineleft.png");
            this.game.load.image("engineright", "../dev/assets/graphics/engineright.png");
            this.game.load.image("noengineright", "../dev/assets/graphics/right.png");
            this.game.load.image("noengineleft", "../dev/assets/graphics/left.png");
            this.game.load.image("buttonLeft", '../dev/assets/graphics/buttonLeft.png');
        };
        GameRunningState.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, 3000, 3000);
            for (var i = 0; i < 200; i++) {
                this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star");
            }
            this.earthSprite = this.game.add.sprite(this.game.world.centerY, this.game.world.centerX, 'earth');
            this.game.physics.enable(this.earthSprite, Phaser.Physics.ARCADE);
            this.earthSprite.body.setCircle(25);
            this.earthSprite.body.immovable = true;
            console.log(this.earthSprite.x);
            this.sunSprite = this.game.add.sprite(this.game.world.centerY + 350, this.game.world.centerX + 100, 'sun');
            this.game.physics.enable(this.sunSprite, Phaser.Physics.ARCADE);
            this.sunSprite.body.setCircle(295);
            this.sunSprite.body.immovable = true;
            this.marsSprite = this.game.add.sprite(this.game.world.centerY - 500, this.game.world.centerX + 100, "mars");
            this.game.physics.enable(this.marsSprite, Phaser.Physics.ARCADE);
            this.marsSprite.body.setCircle(25);
            this.marsSprite.body.immovable = true;
            this.venusSprite = this.game.add.sprite(this.game.world.centerY + 100, this.game.world.centerX + 600, "venus");
            this.game.physics.enable(this.venusSprite, Phaser.Physics.ARCADE);
            this.venusSprite.body.setCircle(50);
            this.venusSprite.body.immovable = true;
            this.jupiterSprite = this.game.add.sprite(this.game.world.centerY - 1000, this.game.world.centerX + 100, "jupiter");
            this.game.physics.enable(this.jupiterSprite, Phaser.Physics.ARCADE);
            this.jupiterSprite.body.setCircle(131);
            this.jupiterSprite.body.immovable = true;
            this.saturnSprite = this.game.add.sprite(this.game.world.centerY - 1500, this.game.world.centerX - 500, "saturn");
            this.game.physics.enable(this.saturnSprite, Phaser.Physics.ARCADE);
            this.saturnSprite.body.setSize(100, 100, 90, 100);
            this.saturnSprite.body.setCircle(75);
            this.spaceshipSprite = this.game.add.sprite(1165, 1916, 'player');
            this.game.physics.enable(this.spaceshipSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite.body.velocity.y = 100;
            this.spaceshipSprite.anchor.set(0.5);
            this.spaceshipSprite.body.drag.set(100);
            this.spaceshipSprite.body.maxVelocity.set(200);
            this.spaceshipSprite.body.collideWorldBounds = true;
            this.spaceshipSprite.body.setSize(10, 10, 5, 4);
            this.spaceshipSprite.body.setCircle(15);
            this.Cursors = this.game.input.keyboard.createCursorKeys();
            this.Keyboard = this.game.input.keyboard;
            this.game.camera.follow(this.spaceshipSprite);
        };
        GameRunningState.prototype.confirmClicked = function () {
            this.game.state.start("MiniGameState");
        };
        GameRunningState.prototype.update = function () {
            if (this.game.physics.arcade.overlap(this.spaceshipSprite, this.earthSprite) == true) {
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.earthSprite.x / 1.3, this.earthSprite.y - 200, 'popup');
                    this.popup.alpha = 0.9;
                    this.text1 = this.game.add.text(this.earthSprite.x / 1.3 + 90, this.earthSprite.y - 150, ' start je missie?', { font: '32px Arial', fill: '#ffffff' });
                    this.confirm = this.game.add.button(this.earthSprite.x / 1.3, this.earthSprite.y + 10, 'button', this.confirmClicked, this, 2, 1, 0);
                    this.cancel = this.game.add.button(this.earthSprite.x / 1.3 + this.confirm.width - 1, this.earthSprite.y + 10, 'button', this.cancell, this, 2, 1, 0);
                    this.text = this.game.add.text(this.earthSprite.x / 1.22, this.earthSprite.y + 15, 'Ja                                Nee', { font: '20px Arial', fill: '#ffffff' });
                    this.timeDelay = this.game.time.now + 1000000;
                }
            }
            else {
                this.timeDelay = this.game.time.now;
                if (this.confirm) {
                    this.confirm.pendingDestroy = true;
                }
                if (this.cancel) {
                    this.cancel.pendingDestroy = true;
                }
                if (this.popup) {
                    this.popup.pendingDestroy = true;
                }
                if (this.text) {
                    this.text.pendingDestroy = true;
                }
                if (this.text1) {
                    this.text1.pendingDestroy = true;
                }
            }
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.earthSprite, function () {
                console.log("earth");
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.sunSprite, function () {
                console.log("Boom, je bent verbrand in de zon");
            });
            if (this.game.physics.arcade.overlap(this.spaceshipSprite, this.marsSprite)) {
                this.popup = this.game.add.sprite(this.marsSprite.x / 1.3, this.marsSprite.y - 200, 'popup');
                this.popup.alpha = 0.9;
                this.text1 = this.game.add.text(this.marsSprite.x / 1.3 + 90, this.marsSprite.y - 150, ' start je missie?', { font: '32px Arial', fill: '#ffffff' });
                this.confirm = this.game.add.button(this.marsSprite.x / 1.3, this.marsSprite.y + 10, 'button', this.confirmm, this, 2, 1, 0);
                this.cancel = this.game.add.button(this.marsSprite.x / 1.3 + this.confirm.width - 1, this.marsSprite.y + 10, 'button', this.cancell, this, 2, 1, 0);
                this.text = this.game.add.text(this.marsSprite.x / 1.20 + 20, this.marsSprite.y + 15, 'Ja                                Nee', { font: '20px Arial', fill: '#ffffff' });
                this.timeDelay = this.game.time.now + 10000;
            }
            else {
                this.timeDelay = this.game.time.now;
                if (this.confirm) {
                    this.confirm.pendingDestroy = true;
                }
                if (this.cancel) {
                    this.cancel.pendingDestroy = true;
                }
                if (this.popup) {
                    this.popup.pendingDestroy = true;
                }
                if (this.text) {
                    this.text.pendingDestroy = true;
                }
                if (this.text1) {
                    this.text1.pendingDestroy = true;
                }
            }
            if (this.game.physics.arcade.overlap(this.spaceshipSprite, this.venusSprite)) {
                this.popup = this.game.add.sprite(this.venusSprite.x / 1.3, this.venusSprite.y - 200, 'popup');
                this.popup.alpha = 0.9;
                this.text1 = this.game.add.text(this.venusSprite.x / 1.3 + 90, this.venusSprite.y - 150, ' start je missie?', { font: '32px Arial', fill: '#ffffff' });
                this.confirm = this.game.add.button(this.venusSprite.x / 1.3, this.venusSprite.y + 10, 'button', this.confirmm, this, 2, 1, 0);
                this.cancel = this.game.add.button(this.venusSprite.x / 1.3 + this.confirm.width - 1, this.venusSprite.y + 10, 'button', this.cancell, this, 2, 1, 0);
                this.text = this.game.add.text(this.venusSprite.x / 1.22, this.venusSprite.y + 15, 'Ja                                Nee', { font: '20px Arial', fill: '#ffffff' });
                this.timeDelay = this.game.time.now + 1000000;
            }
            else {
                this.timeDelay = this.game.time.now;
                if (this.confirm) {
                    this.confirm.pendingDestroy = true;
                }
                if (this.cancel) {
                    this.cancel.pendingDestroy = true;
                }
                if (this.popup) {
                    this.popup.pendingDestroy = true;
                }
                if (this.text) {
                    this.text.pendingDestroy = true;
                }
                if (this.text1) {
                    this.text1.pendingDestroy = true;
                }
            }
            if (this.game.physics.arcade.overlap(this.spaceshipSprite, this.saturnSprite)) {
                this.popup = this.game.add.sprite(this.saturnSprite.x / 1.3, this.saturnSprite.y - 200, 'popup');
                this.popup.alpha = 0.9;
                this.text1 = this.game.add.text(this.saturnSprite.x / 1.3 + 90, this.saturnSprite.y - 150, ' start je missie?', { font: '32px Arial', fill: '#ffffff' });
                this.confirm = this.game.add.button(this.saturnSprite.x / 1.3, this.saturnSprite.y + 10, 'button', this.confirmm, this, 2, 1, 0);
                this.cancel = this.game.add.button(this.saturnSprite.x / 1.3 + this.confirm.width - 1, this.saturnSprite.y + 10, 'button', this.cancell, this, 2, 1, 0);
                this.text = this.game.add.text(this.saturnSprite.x / 1.20 + 70, this.saturnSprite.y + 15, 'Ja                              Nee', { font: '20px Arial', fill: '#ffffff' });
                this.timeDelay = this.game.time.now + 1000000;
            }
            else {
                this.timeDelay = this.game.time.now;
                if (this.confirm) {
                    this.confirm.pendingDestroy = true;
                }
                if (this.cancel) {
                    this.cancel.pendingDestroy = true;
                }
                if (this.popup) {
                    this.popup.pendingDestroy = true;
                }
                if (this.text) {
                    this.text.pendingDestroy = true;
                }
                if (this.text1) {
                    this.text1.pendingDestroy = true;
                }
            }
            if (this.game.physics.arcade.overlap(this.spaceshipSprite, this.jupiterSprite)) {
                this.popup = this.game.add.sprite(this.jupiterSprite.x / 1.3, this.jupiterSprite.y - 200, 'popup');
                this.popup.alpha = 0.9;
                this.text1 = this.game.add.text(this.jupiterSprite.x / 1.3 + 90, this.jupiterSprite.y - 150, ' start je missie?', { font: '32px Arial', fill: '#ffffff' });
                this.confirm = this.game.add.button(this.jupiterSprite.x / 1.3, this.jupiterSprite.y + 10, 'button', this.confirmm, this, 2, 1, 0);
                this.cancel = this.game.add.button(this.jupiterSprite.x / 1.3 + this.confirm.width - 1, this.jupiterSprite.y + 10, 'button', this.cancell, this, 2, 1, 0);
                this.text = this.game.add.text(this.jupiterSprite.x / 1.20 + 45, this.jupiterSprite.y + 15, 'Ja                              Nee', { font: '20px Arial', fill: '#ffffff' });
                this.timeDelay = this.game.time.now + 1000000;
            }
            else {
                this.timeDelay = this.game.time.now;
                if (this.confirm) {
                    this.confirm.pendingDestroy = true;
                }
                if (this.cancel) {
                    this.cancel.pendingDestroy = true;
                }
                if (this.popup) {
                    this.popup.pendingDestroy = true;
                }
                if (this.text) {
                    this.text.pendingDestroy = true;
                }
                if (this.text1) {
                    this.text1.pendingDestroy = true;
                }
            }
            this.game.input.update();
            if (this.Cursors.up.isDown) {
                this.game.physics.arcade.accelerationFromRotation(this.spaceshipSprite.rotation, 200, this.spaceshipSprite.body.acceleration);
                this.spaceshipSprite.loadTexture("engine");
            }
            else {
                this.spaceshipSprite.body.acceleration.set(0);
                this.spaceshipSprite.loadTexture("player");
            }
            if (this.Cursors.left.isDown) {
                this.spaceshipSprite.body.angularVelocity = -300;
                this.spaceshipSprite.loadTexture("noengineright");
            }
            else if (this.Cursors.right.isDown) {
                this.spaceshipSprite.body.angularVelocity = 300;
                this.spaceshipSprite.loadTexture("noengineleft");
            }
            else {
                this.spaceshipSprite.body.angularVelocity = 0;
            }
            if (this.Cursors.up.isDown && this.Cursors.left.isDown) {
                this.spaceshipSprite.loadTexture("engineright");
            }
            if (this.Cursors.up.isDown && this.Cursors.right.isDown) {
                this.spaceshipSprite.loadTexture("engineleft");
            }
            this.buttonLeft = this.game.add.button(window.innerWidth / 5 - 100, window.innerHeight / 2 + 800, 'buttonLeft', this.moveLeft, this, 2, 1, 0);
            this.buttonLeft.fixedToCamera = true;
            this.buttonUp = this.game.add.button(window.innerWidth / 5 - 50, window.innerHeight / 2 + 700, 'buttonLeft', this.moveUp, this, 2, 1, 0);
            this.buttonUp.fixedToCamera = true;
        };
        GameRunningState.prototype.moveUp = function () {
            this.game.physics.arcade.accelerationFromRotation(this.spaceshipSprite.rotation, 200, this.spaceshipSprite.body.acceleration);
            this.spaceshipSprite.loadTexture("engine");
        };
        GameRunningState.prototype.moveLeft = function () {
            this.spaceshipSprite.body.angularVelocity = -300;
            this.spaceshipSprite.loadTexture("noengineright");
        };
        GameRunningState.prototype.confirmm = function () {
            console.log("start minigame");
            this.game.state.start("MiniGameState");
        };
        GameRunningState.prototype.cancell = function () {
            this.confirm.pendingDestroy = true;
            this.cancel.pendingDestroy = true;
            this.popup.pendingDestroy = true;
            this.text.pendingDestroy = true;
            this.text1.pendingDestroy = true;
            this.timeDelay = this.game.time.now + 10000000;
        };
        GameRunningState.prototype.render = function () {
        };
        return GameRunningState;
    }(Phaser.State));
    Game.GameRunningState = GameRunningState;
    var SpaceGame = (function () {
        function SpaceGame() {
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content');
            this.game.state.add("GameRunningState", GameRunningState, false);
            this.game.state.add("MiniGameState", MiniGameState, false);
            this.game.state.add("TitleScreenState", TitleScreenState, false);
            this.game.state.add("SpaceshipScreenState", SpaceshipScreenState, false);
            this.game.state.start("TitleScreenState", true, true);
        }
        return SpaceGame;
    }());
    Game.SpaceGame = SpaceGame;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.SpaceGame();
};
//# sourceMappingURL=main.js.map