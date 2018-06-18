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
            this.spaceship1 = this.add.button(500, 300, "spaceship1", this.spaceshipClicked, this, 2, 1, 0);
            this.spaceship2 = this.add.button(700, 300, "spaceship2", this.spaceshipClicked, this, 2, 1, 0);
            this.spaceship3 = this.add.button(900, 300, "spaceship3", this.spaceshipClicked, this, 2, 1, 0);
            this.text = this.game.add.text(650, 200, 'Kies je Ruimteschip', { font: '20px Arial', fill: '#ffffff' });
        };
        SpaceshipScreenState.prototype.spaceshipClicked = function (spaceship) {
            this.game.state.start("GameRunningState");
            this.playerSprite = spaceship.key;
            console.log(this.playerSprite);
        };
        return SpaceshipScreenState;
    }(Phaser.State));
    Game.SpaceshipScreenState = SpaceshipScreenState;
    var GameOverScreenState = (function (_super) {
        __extends(GameOverScreenState, _super);
        function GameOverScreenState() {
            var _this = _super.call(this) || this;
            _this.timeDelay = 0;
            return _this;
        }
        GameOverScreenState.prototype.preload = function () {
            this.load.image("popup", "../dev/Assets/Graphics/popup2.png");
            this.game.load.image("button", "../dev/Assets/graphics/button.png");
        };
        GameOverScreenState.prototype.create = function () {
            this.popup = this.game.add.sprite(window.innerWidth / 2.7, window.innerHeight / 2.7, 'popup');
            this.popup.alpha = 0.8;
            this.game.add.text(this.popup.x / 1.3 + 170, this.popup.y + 10, ' Game over!', { font: '50px Arial', fill: '#ffffff' });
            this.confirm = this.game.add.button(this.popup.x, this.popup.y + 200, 'button', this.confirmm, this, 2, 1, 0);
            this.cancel = this.game.add.button(this.popup.x + 193, this.popup.y + 209, 'button', this.cancell, this, 2, 1, 0);
            this.text = this.game.add.text(this.popup.x, this.popup.y + 216, ' Probeer opnieuw           Terug ontdekken', { font: '20px Arial', fill: '#ffffff' });
            this.timeDelay = this.game.time.now + 10000000000;
        };
        GameOverScreenState.prototype.confirmm = function () {
            this.game.state.start("MiniGameState", true, true);
        };
        GameOverScreenState.prototype.cancell = function () {
            this.game.state.start("GameRunningState", true, false);
        };
        return GameOverScreenState;
    }(Phaser.State));
    Game.GameOverScreenState = GameOverScreenState;
    var WinScreenState = (function (_super) {
        __extends(WinScreenState, _super);
        function WinScreenState() {
            var _this = _super.call(this) || this;
            _this.timeDelay = 0;
            return _this;
        }
        WinScreenState.prototype.preload = function () {
            this.load.image("popup", "../dev/Assets/Graphics/minigamepopup.png");
            this.game.load.image("button", "../dev/Assets/graphics/winbutton.png");
            this.game.load.image("button1", "../dev/Assets/graphics/winbutton1.png");
        };
        WinScreenState.prototype.create = function () {
            this.popup = this.game.add.sprite(window.innerWidth / 2.7, window.innerHeight / 2.7, 'popup');
            this.popup.alpha = 0.8;
            this.timeDelay = this.game.time.now + 10000000000;
        };
        WinScreenState.prototype.confirmm = function () {
            this.game.state.start("MiniGameState", true, true);
        };
        WinScreenState.prototype.cancell = function () {
            this.game.state.start("GameRunningState", true, false);
        };
        return WinScreenState;
    }(Phaser.State));
    Game.WinScreenState = WinScreenState;
    var MiniGameState = (function (_super) {
        __extends(MiniGameState, _super);
        function MiniGameState() {
            var _this = _super.call(this) || this;
            _this.timeDelay = 0;
            _this.timePassed = 0;
            _this.asteroidSprite = [];
            _this.life = 3;
            return _this;
        }
        MiniGameState.prototype.preload = function () {
            this.game.load.image('player', '../dev/Assets/graphics/spaceship.png');
            this.game.load.image("ui", "../dev/Assets/Graphics/ui.png");
            this.game.load.image("star", "../dev/Assets/Graphics/star.png");
            this.game.load.image("popup", "../dev/Assets/Graphics/popup.png");
            this.game.load.image("button", "../dev/Assets/graphics/button.png");
            this.game.load.image("asteroid", "../dev/Assets/graphics/2.png");
            this.game.load.image("hearts", "../dev/Assets/graphics/hearts.png");
            this.game.load.image("hearts1", "../dev/Assets/graphics/hearts1.png");
            this.game.load.image("hearts2", "../dev/Assets/graphics/hearts2.png");
            this.game.load.spritesheet("kaboom", "../dev/Assets/graphics/explode.png", 128, 128);
        };
        MiniGameState.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
            for (var i = 0; i < 200; i++) {
                this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star");
            }
            for (var i = 0; i < 7; i++) {
                var posy = Math.floor(Math.random() * 800);
                var posx = Math.floor(Math.random() * 400);
                this.asteroidSprite.push(this.game.add.sprite(posy, posx, 'asteroid'));
            }
            if (this.life > 2) {
                this.game.add.sprite(window.innerWidth - 250, 50, "hearts");
            }
            this.game.physics.enable(this.asteroidSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite = this.game.add.sprite(1165, 1916, 'player');
            this.game.physics.enable(this.spaceshipSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite.body.velocity.y = 100;
            this.spaceshipSprite.body.collideWorldBounds = true;
            this.spaceshipSprite.body.setSize(10, 10, 15, 20);
            this.spaceshipSprite.body.setCircle(20);
            this.speedY = Math.floor(Math.random() * 10 + 5);
            this.Cursors = this.game.input.keyboard.createCursorKeys();
            this.Keyboard = this.game.input.keyboard;
            this.game.camera.follow(this.spaceshipSprite);
        };
        MiniGameState.prototype.update = function () {
            var _this = this;
            this.timePassed += 1;
            console.log(this.timePassed);
            if (this.life == 2) {
                this.game.add.sprite(window.innerWidth - 250, 50, "hearts1");
            }
            else if (this.life == 1) {
                this.game.add.sprite(window.innerWidth - 250, 50, "hearts2");
            }
            if (this.timePassed == 1000) {
                this.game.state.start("WinScreenState", true, false);
                this.life = 3;
                this.timePassed = 0;
            }
            var _loop_1 = function (asteroid) {
                asteroid.y += this_1.speedY;
                if (asteroid.y > window.innerHeight) {
                    asteroid.x = Math.random() * (window.innerWidth - 100);
                    asteroid.y = -400 - (Math.random() * 450);
                }
                this_1.explosions = this_1.game.add.group();
                this_1.explosions.forEach(asteroid, this_1);
                this_1.game.physics.arcade.overlap(this_1.spaceshipSprite, asteroid, function () {
                    console.log("kabooom");
                    var explosion = _this.game.add.sprite(asteroid.x, asteroid.y, 'kaboom');
                    explosion.animations.add('kaboom');
                    explosion.play('kaboom', 30, false, true);
                    asteroid.destroy();
                    _this.life--;
                    if (_this.life == 0) {
                        console.log('Game over!!');
                        _this.game.state.add("GameOverScreenState", GameOverScreenState, true);
                    }
                });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.asteroidSprite; _i < _a.length; _i++) {
                var asteroid = _a[_i];
                _loop_1(asteroid);
            }
            this.game.input.update();
            if (this.Cursors.up.isDown) {
                this.spaceshipSprite.body.velocity.y = -300;
            }
            else if (this.Cursors.down.isDown) {
                this.spaceshipSprite.body.velocity.y = 300;
            }
            if (this.Cursors.left.isDown) {
                this.spaceshipSprite.body.velocity.x = -300;
            }
            else if (this.Cursors.right.isDown) {
                this.spaceshipSprite.body.velocity.x = 300;
            }
            if (this.Cursors.up.isUp && this.Cursors.down.isUp && this.Cursors.left.isUp && this.Cursors.right.isUp) {
                this.spaceshipSprite.body.velocity.y = 0;
                this.spaceshipSprite.body.velocity.x = 0;
            }
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
            console.log(this.spaceshipSprite);
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
            this.game.state.start("MiniGameState");
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
            this.game = new Phaser.Game(window.innerWidth - 20, window.innerHeight - 20, Phaser.CANVAS, 'content');
            this.game.state.add("GameRunningState", GameRunningState, false);
            this.game.state.add("MiniGameState", MiniGameState, false);
            this.game.state.add("TitleScreenState", TitleScreenState, false);
            this.game.state.add("SpaceshipScreenState", SpaceshipScreenState, false);
            this.game.state.add("GameOverScreenState", GameOverScreenState, false);
            this.game.state.add("WinScreenState", WinScreenState, false);
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