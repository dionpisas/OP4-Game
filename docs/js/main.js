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
            this.load.image("title", "../dev/Assets/Graphics/TitleScreen.png");
        };
        TitleScreenState.prototype.create = function () {
            this.sprites = this.add.sprite(0, 0, "title");
            this.input.onTap.addOnce(this.titleClicked, this);
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
            this.spaceshipImage = this.add.sprite(300, 300, "spaceship1");
            this.spaceshipImage = this.add.sprite(500, 300, "spaceship2");
            this.spaceshipImage = this.add.sprite(700, 300, "spaceship3");
            this.input.onTap.addOnce(this.spaceshipClicked, this);
        };
        SpaceshipScreenState.prototype.spaceshipClicked = function () {
            this.game.state.start("GameRunningState");
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
        };
        GameRunningState.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, 3000, 3000);
            for (var i = 0; i < 200; i++) {
                this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star");
            }
            this.earthSprite = this.game.add.sprite(this.game.world.centerY, this.game.world.centerX, 'earth');
            this.game.physics.enable(this.earthSprite, Phaser.Physics.ARCADE);
            this.earthSprite.body.setCircle(49);
            this.earthSprite.body.immovable = true;
            console.log(this.earthSprite.x);
            this.sunSprite = this.game.add.sprite(this.game.world.centerY + 350, this.game.world.centerX + 100, 'sun');
            this.game.physics.enable(this.sunSprite, Phaser.Physics.ARCADE);
            this.sunSprite.body.setCircle(295);
            this.sunSprite.body.immovable = true;
            this.marsSprite = this.game.add.sprite(this.game.world.centerY - 500, this.game.world.centerX + 100, "mars");
            this.game.physics.enable(this.marsSprite, Phaser.Physics.ARCADE);
            this.marsSprite.body.setCircle(50);
            this.marsSprite.body.immovable = true;
            this.venusSprite = this.game.add.sprite(this.game.world.centerY + 100, this.game.world.centerX + 600, "venus");
            this.game.physics.enable(this.venusSprite, Phaser.Physics.ARCADE);
            this.venusSprite.body.setCircle(100);
            this.venusSprite.body.immovable = true;
            this.jupiterSprite = this.game.add.sprite(this.game.world.centerY - 1000, this.game.world.centerX + 100, "jupiter");
            this.game.physics.enable(this.jupiterSprite, Phaser.Physics.ARCADE);
            this.jupiterSprite.body.setCircle(175);
            this.jupiterSprite.body.immovable = true;
            this.saturnSprite = this.game.add.sprite(this.game.world.centerY - 1500, this.game.world.centerX - 500, "saturn");
            this.game.physics.enable(this.saturnSprite, Phaser.Physics.ARCADE);
            this.saturnSprite.body.setSize(100, 100, 170, 190);
            this.saturnSprite.body.setCircle(150);
            this.spaceshipSprite = this.game.add.sprite(1165, 1916, 'player');
            this.game.physics.enable(this.spaceshipSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite.body.velocity.y = 100;
            this.spaceshipSprite.body.collideWorldBounds = true;
            this.spaceshipSprite.body.setSize(10, 10, 15, 20);
            this.spaceshipSprite.body.setCircle(20);
            this.Cursors = this.game.input.keyboard.createCursorKeys();
            this.Keyboard = this.game.input.keyboard;
            this.game.camera.follow(this.spaceshipSprite);
        };
        GameRunningState.prototype.confirmClicked = function () {
            this.game.state.start("MiniGameState");
        };
        GameRunningState.prototype.update = function () {
            var _this = this;
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.earthSprite, function () {
                console.log("earth");
                if (_this.game.time.now > _this.timeDelay) {
                    _this.popup = _this.game.add.sprite(_this.earthSprite.x / 1.3, _this.earthSprite.y - 200, 'popup');
                    _this.popup.alpha = 0.9;
                    _this.text1 = _this.game.add.text(_this.earthSprite.x / 1.3 + 150, _this.earthSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' });
                    _this.confirm = _this.game.add.button(_this.earthSprite.x / 1.3, _this.earthSprite.y + 219, 'button', _this.confirmm, _this, 2, 1, 0);
                    _this.cancel = _this.game.add.button(_this.earthSprite.x + 40, _this.earthSprite.y + 219, 'button', _this.cancell, _this, 2, 1, 0);
                    _this.text = _this.game.add.text(_this.earthSprite.x - 180, _this.earthSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' });
                    _this.timeDelay = _this.game.time.now + 10000;
                }
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.sunSprite, function () {
                console.log("Boom, je bent verbrand in de zon");
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.marsSprite, function () {
                console.log("mars");
                if (_this.game.time.now > _this.timeDelay) {
                    _this.popup = _this.game.add.sprite(_this.marsSprite.x / 1.3, _this.marsSprite.y - 200, 'popup');
                    _this.popup.alpha = 0.9;
                    _this.text1 = _this.game.add.text(_this.marsSprite.x / 1.3 + 150, _this.marsSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' });
                    _this.confirm = _this.game.add.button(_this.marsSprite.x / 1.3, _this.marsSprite.y + 219, 'button', _this.confirmm, _this, 2, 1, 0);
                    _this.cancel = _this.game.add.button(_this.marsSprite.x + 154, _this.marsSprite.y + 219, 'button', _this.cancell, _this, 2, 1, 0);
                    _this.text = _this.game.add.text(_this.marsSprite.x - 60, _this.marsSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' });
                    _this.timeDelay = _this.game.time.now + 10000;
                }
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.venusSprite, function () {
                console.log("venus");
                if (_this.game.time.now > _this.timeDelay) {
                    _this.popup = _this.game.add.sprite(_this.venusSprite.x / 1.3, _this.venusSprite.y - 200, 'popup');
                    _this.popup.alpha = 0.9;
                    _this.text1 = _this.game.add.text(_this.venusSprite.x / 1.3 + 150, _this.venusSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' });
                    _this.confirm = _this.game.add.button(_this.venusSprite.x / 1.3, _this.venusSprite.y + 219, 'button', _this.confirmm, _this, 2, 1, 0);
                    _this.cancel = _this.game.add.button(_this.venusSprite.x + 15, _this.venusSprite.y + 219, 'button', _this.cancell, _this, 2, 1, 0);
                    _this.text = _this.game.add.text(_this.venusSprite.x - 200, _this.venusSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' });
                    _this.timeDelay = _this.game.time.now + 10000000000;
                }
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.saturnSprite, function () {
                console.log("Saturn");
                if (_this.game.time.now > _this.timeDelay) {
                    _this.popup = _this.game.add.sprite(_this.saturnSprite.x / 1.3, _this.saturnSprite.y - 200, 'popup');
                    _this.popup.alpha = 0.9;
                    _this.text1 = _this.game.add.text(_this.saturnSprite.x / 1.3 + 150, _this.saturnSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' });
                    _this.confirm = _this.game.add.button(_this.saturnSprite.x, _this.saturnSprite.y + 219, 'button', _this.confirmm, _this, 2, 1, 0);
                    _this.cancel = _this.game.add.button(_this.saturnSprite.x + 385, _this.saturnSprite.y + 219, 'button', _this.cancell, _this, 2, 1, 0);
                    _this.text = _this.game.add.text(_this.saturnSprite.x + 150, _this.saturnSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' });
                    _this.timeDelay = _this.game.time.now + 10000000000;
                }
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.jupiterSprite, function () {
                console.log("Jupiter");
                if (_this.game.time.now > _this.timeDelay) {
                    _this.popup = _this.game.add.sprite(_this.jupiterSprite.x / 1.3, _this.jupiterSprite.y - 200, 'popup');
                    _this.popup.alpha = 0.9;
                    _this.text1 = _this.game.add.text(_this.jupiterSprite.x / 1.3 + 150, _this.jupiterSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' });
                    _this.confirm = _this.game.add.button(_this.jupiterSprite.x - 115, _this.jupiterSprite.y + 219, 'button', _this.confirmm, _this, 2, 1, 0);
                    _this.cancel = _this.game.add.button(_this.jupiterSprite.x + 270, _this.jupiterSprite.y + 219, 'button', _this.cancell, _this, 2, 1, 0);
                    _this.text = _this.game.add.text(_this.jupiterSprite.x + 60, _this.jupiterSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' });
                    _this.timeDelay = _this.game.time.now + 10000000000;
                }
            });
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
        GameRunningState.prototype.confirmm = function () {
            console.log("start minigame");
        };
        GameRunningState.prototype.cancell = function () {
            this.confirm.pendingDestroy = true;
            this.cancel.pendingDestroy = true;
            this.popup.pendingDestroy = true;
            this.text.pendingDestroy = true;
            this.text1.pendingDestroy = true;
            this.timeDelay = this.game.time.now + 2000;
        };
        GameRunningState.prototype.render = function () {
            this.game.debug.body(this.earthSprite);
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