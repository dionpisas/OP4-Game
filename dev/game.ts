/// <reference path="phaser/phaser.d.ts" />

module Game {

    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game
        constructor() {
            super()
        }
        sprites: Phaser.Sprite

        preload() {
            this.load.image("title", "../dev/Assets/Graphics/TitleScreen.png")

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
            this.load.image("spaceship1", "../dev/Assets/Graphics/Spaceship1.png")
            this.load.image("spaceship2", "../dev/Assets/Graphics/Spaceship2.png")
            this.load.image("spaceship3", "../dev/Assets/Graphics/Spaceship3.png")
        }
        create() {
            this.spaceshipImage = this.add.sprite(300, 300, "spaceship1")
            this.spaceshipImage = this.add.sprite(500, 300, "spaceship2")
            this.spaceshipImage = this.add.sprite(700, 300, "spaceship3")
            this.input.onTap.addOnce(this.spaceshipClicked, this) // <-- that um, this is extremely important
        }
        spaceshipClicked() {
            this.game.state.start("GameRunningState")
         
        }
    }

    export class MiniGameState extends Phaser.State {
        constructor() {
            super()
        }
        game: Phaser.Game
        star: Phaser.Sprite
        Sprite: Phaser.Sprite
       
        spaceshipSprite: Phaser.Sprite
       
        Cursors: Phaser.CursorKeys
        Keyboard: Phaser.Keyboard
        uiSprite: Phaser.Sprite
        popup: Phaser.Sprite
        confirm: Phaser.Button
        cancel: Phaser.Button
        text: Phaser.Text
        text1: Phaser.Text
        timeDelay: number = 0
        preload() {
            this.game.load.image('player', '../dev/Assets/graphics/spaceship.png');
            this.game.load.image("ui", "../dev/Assets/Graphics/ui.png")
            this.game.load.image("star", "../dev/Assets/Graphics/star.png")
            this.game.load.image("popup", "../dev/Assets/Graphics/popup.png")
            this.game.load.image("button", "../dev/Assets/graphics/button.png")
        }
        create() {

            // Start Physics engine set world bounds and create stars
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < 200; i++) {
                this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star")

            }

           

         

            // Spaceship settings
            this.spaceshipSprite = this.game.add.sprite(1165, 1916, 'player');
            this.game.physics.enable(this.spaceshipSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite.body.velocity.y = 100;
            
            this.spaceshipSprite.body.collideWorldBounds = true
            this.spaceshipSprite.body.setSize(10, 10, 15, 20)
            this.spaceshipSprite.body.setCircle(20)

            // popup settings
       
           

            //add keyboard controls
            this.Cursors = this.game.input.keyboard.createCursorKeys();
            this.Keyboard = this.game.input.keyboard
            this.game.camera.follow(this.spaceshipSprite);

            

        }

        update() {

          



            //sets keyboard controls
            //this.spaceshipSprite.body.setZeroVelocity()
            this.game.input.update()
            if (this.Cursors.up.isDown) {
                this.spaceshipSprite.body.velocity.y = -300

            }
            else if (this.Cursors.down.isDown) {
                this.spaceshipSprite.body.velocity.y = 300

            }
            if (this.Cursors.left.isDown) {
                this.spaceshipSprite.body.velocity.x = -300;
            }
            else if (this.Cursors.right.isDown) {
                this.spaceshipSprite.body.velocity.x = 300
            }
            if (this.Cursors.up.isUp && this.Cursors.down.isUp && this.Cursors.left.isUp && this.Cursors.right.isUp) {
                this.spaceshipSprite.body.velocity.y = 0
                this.spaceshipSprite.body.velocity.x = 0
            }



        }
    }
    export class GameRunningState extends Phaser.State {
        constructor() {
            super()
        }
        game: Phaser.Game
        star: Phaser.Sprite
        Sprite: Phaser.Sprite
        sunSprite: Phaser.Sprite
        venusSprite: Phaser.Sprite
        marsSprite: Phaser.Sprite
        spaceshipSprite: Phaser.Sprite
        earthSprite: Phaser.Sprite
        jupiterSprite: Phaser.Sprite
        saturnSprite: Phaser.Sprite
        Cursors: Phaser.CursorKeys
        Keyboard: Phaser.Keyboard
        uiSprite: Phaser.Sprite
        popup: Phaser.Sprite
        confirm: Phaser.Button
        cancel: Phaser.Button
        text: Phaser.Text
        text1: Phaser.Text
        timeDelay: number = 0
        preload() {
            this.game.load.image('player', '../dev/Assets/graphics/spaceship.png');
            this.game.load.image('earth', '../dev/Assets/graphics/earth.png');
            this.game.load.image('venus', '../dev/Assets/graphics/venus.png')
            this.game.load.image('mars', '../dev/Assets/graphics/mars.png')
            this.game.load.image("sun", "../dev/Assets/Graphics/sun.png")
            this.game.load.image("earth", "../dev/Assets/Graphics/earth.png")
            this.game.load.image("ui", "../dev/Assets/Graphics/ui.png")
            this.game.load.image("jupiter", "../dev/Assets/Graphics/jupiter.png")
            this.game.load.image("saturn", "../dev/Assets/graphics/saturn.png")
            this.game.load.image("star", "../dev/Assets/Graphics/star.png")
            this.game.load.image("popup", "../dev/Assets/Graphics/popup.png")
            this.game.load.image("button", "../dev/Assets/graphics/button.png")
        }
        create() {

            // Start Physics engine set world bounds and create stars
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.setBounds(0, 0, 3000, 3000);

            for (let i = 0; i < 200; i++) {
                this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, "star")

            }

           

            // earth settings
            this.earthSprite = this.game.add.sprite(this.game.world.centerY, this.game.world.centerX, 'earth');
            this.game.physics.enable(this.earthSprite, Phaser.Physics.ARCADE);
            this.earthSprite.body.setCircle(49)
            this.earthSprite.body.immovable = true;
            console.log(this.earthSprite.x)
          

            // sun settings
            this.sunSprite = this.game.add.sprite(this.game.world.centerY + 350, this.game.world.centerX + 100, 'sun')
            this.game.physics.enable(this.sunSprite, Phaser.Physics.ARCADE)
            this.sunSprite.body.setCircle(295)
            this.sunSprite.body.immovable = true

            // mars settings
            this.marsSprite = this.game.add.sprite(this.game.world.centerY - 500, this.game.world.centerX + 100, "mars")
            this.game.physics.enable(this.marsSprite, Phaser.Physics.ARCADE)
            this.marsSprite.body.setCircle(50)
            this.marsSprite.body.immovable = true

            // venus settings
            this.venusSprite = this.game.add.sprite(this.game.world.centerY + 100, this.game.world.centerX + 600, "venus")
            this.game.physics.enable(this.venusSprite, Phaser.Physics.ARCADE)
            this.venusSprite.body.setCircle(100)
            this.venusSprite.body.immovable = true

            // jupiter settings
            this.jupiterSprite = this.game.add.sprite(this.game.world.centerY - 1000, this.game.world.centerX + 100, "jupiter")
            this.game.physics.enable(this.jupiterSprite, Phaser.Physics.ARCADE)
            this.jupiterSprite.body.setCircle(175)
            this.jupiterSprite.body.immovable = true

            // Saturn settings
            this.saturnSprite = this.game.add.sprite(this.game.world.centerY - 1500, this.game.world.centerX - 500, "saturn")
            this.game.physics.enable(this.saturnSprite, Phaser.Physics.ARCADE)
            this.saturnSprite.body.setSize(100, 100, 170, 190)
            this.saturnSprite.body.setCircle(150)


            // Spaceship settings
            this.spaceshipSprite = this.game.add.sprite(1165, 1916, 'player');
            this.game.physics.enable(this.spaceshipSprite, Phaser.Physics.ARCADE);
            this.spaceshipSprite.body.velocity.y = 100;
            
            this.spaceshipSprite.body.collideWorldBounds = true
            this.spaceshipSprite.body.setSize(10, 10, 15, 20)
            this.spaceshipSprite.body.setCircle(20)

            // popup settings
       
           

            //add keyboard controls
            this.Cursors = this.game.input.keyboard.createCursorKeys();
            this.Keyboard = this.game.input.keyboard
            this.game.camera.follow(this.spaceshipSprite);

            

        }
        confirmClicked() {
            this.game.state.start("MiniGameState") 
        }

        update() {

            //Earth Colission Settings and functions
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.earthSprite, () => {
                console.log("earth")
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.earthSprite.x / 1.3, this.earthSprite.y - 200, 'popup')
                    this.popup.alpha = 0.9
                    this.text1 = this.game.add.text(this.earthSprite.x / 1.3 + 150, this.earthSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' })
                    this.confirm = this.game.add.button(this.earthSprite.x / 1.3, this.earthSprite.y + 219, 'button', this.confirmm, this, 2, 1, 0)
                    this.cancel = this.game.add.button(this.earthSprite.x + 40, this.earthSprite.y + 219, 'button', this.cancell, this, 2, 1, 0)

                    this.text = this.game.add.text(this.earthSprite.x - 180, this.earthSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' })

                    this.timeDelay = this.game.time.now + 10000
                }
            });
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.sunSprite, () => {
                console.log("Boom, je bent verbrand in de zon")

            });
             //Mars Colission Settings and functionality
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.marsSprite, () => {
                console.log("mars")
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.marsSprite.x / 1.3, this.marsSprite.y - 200, 'popup')
                    this.popup.alpha = 0.9
                    this.text1 = this.game.add.text(this.marsSprite.x / 1.3 + 150, this.marsSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' })
                    this.confirm = this.game.add.button(this.marsSprite.x / 1.3, this.marsSprite.y + 219, 'button', this.confirmm, this, 2, 1, 0)
                    this.cancel = this.game.add.button(this.marsSprite.x + 154, this.marsSprite.y + 219, 'button', this.cancell, this, 2, 1, 0)

                    this.text = this.game.add.text(this.marsSprite.x - 60, this.marsSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' })
                  
                    this.timeDelay = this.game.time.now + 10000
                }
            })

            //Venus Colission Settings and functionality
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.venusSprite, () => {
                console.log("venus")
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.venusSprite.x / 1.3, this.venusSprite.y - 200, 'popup')
                    this.popup.alpha = 0.9
                    this.text1 = this.game.add.text(this.venusSprite.x / 1.3 + 150, this.venusSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' })
                    this.confirm = this.game.add.button(this.venusSprite.x / 1.3, this.venusSprite.y + 219, 'button', this.confirmm, this, 2, 1, 0)
                    this.cancel = this.game.add.button(this.venusSprite.x + 15, this.venusSprite.y + 219, 'button', this.cancell, this, 2, 1, 0)

                    this.text = this.game.add.text(this.venusSprite.x - 200, this.venusSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' })

                    this.timeDelay = this.game.time.now + 10000000000
                }
            })

             //Saturn Colission Settings and functionality
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.saturnSprite, () => {
                console.log("Saturn")
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.saturnSprite.x / 1.3, this.saturnSprite.y - 200, 'popup')
                    this.popup.alpha = 0.9
                    this.text1 = this.game.add.text(this.saturnSprite.x / 1.3 + 150, this.saturnSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' })
                    this.confirm = this.game.add.button(this.saturnSprite.x, this.saturnSprite.y + 219, 'button', this.confirmm, this, 2, 1, 0)
                    this.cancel = this.game.add.button(this.saturnSprite.x + 385, this.saturnSprite.y + 219, 'button', this.cancell, this, 2, 1, 0)

                    this.text = this.game.add.text(this.saturnSprite.x + 150, this.saturnSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' })

                    this.timeDelay = this.game.time.now + 10000000000
                }
            })

            //Jupiter Colission Settings and functionality
            this.game.physics.arcade.overlap(this.spaceshipSprite, this.jupiterSprite, () => {
                console.log("Jupiter")
                if (this.game.time.now > this.timeDelay) {
                    this.popup = this.game.add.sprite(this.jupiterSprite.x / 1.3, this.jupiterSprite.y - 200, 'popup')
                    this.popup.alpha = 0.9
                    this.text1 = this.game.add.text(this.jupiterSprite.x / 1.3 + 150, this.jupiterSprite.y - 100, ' start je missie?', { font: '64px Arial', fill: '#ffffff' })
                    this.confirm = this.game.add.button(this.jupiterSprite.x - 115, this.jupiterSprite.y + 219, 'button', this.confirmm, this, 2, 1, 0)
                    this.cancel = this.game.add.button(this.jupiterSprite.x + 270, this.jupiterSprite.y + 219, 'button', this.cancell, this, 2, 1, 0)

                    this.text = this.game.add.text(this.jupiterSprite.x + 60, this.jupiterSprite.y + 240, 'Ja                                                                    Nee', { font: '20px Arial', fill: '#ffffff' })

                    this.timeDelay = this.game.time.now + 10000000000
                }
            })



            //sets keyboard controls
            //this.spaceshipSprite.body.setZeroVelocity()
            this.game.input.update()
            if (this.Cursors.up.isDown) {
                this.spaceshipSprite.body.velocity.y = -300

            }
            else if (this.Cursors.down.isDown) {
                this.spaceshipSprite.body.velocity.y = 300

            }
            if (this.Cursors.left.isDown) {
                this.spaceshipSprite.body.velocity.x = -300;
            }
            else if (this.Cursors.right.isDown) {
                this.spaceshipSprite.body.velocity.x = 300
            }
            if (this.Cursors.up.isUp && this.Cursors.down.isUp && this.Cursors.left.isUp && this.Cursors.right.isUp) {
                this.spaceshipSprite.body.velocity.y = 0
                this.spaceshipSprite.body.velocity.x = 0
            }



        }
        confirmm() {
            this.game.state.start("MiniGameState") 
        }
        cancell() {
            this.confirm.pendingDestroy = true
            this.cancel.pendingDestroy = true
            this.popup.pendingDestroy = true
            this.text.pendingDestroy = true
            this.text1.pendingDestroy = true
            this.timeDelay = this.game.time.now + 2000
        }

        render() {
            this.game.debug.body(this.earthSprite)

        }

    }

    export class SpaceGame {
        game: Phaser.Game

        constructor() {
            this.game = new Phaser.Game(window.innerWidth - 20, window.innerHeight - 20, Phaser.CANVAS, 'content')

            this.game.state.add("GameRunningState", GameRunningState, false)
            this.game.state.add("MiniGameState",MiniGameState ,false)
            this.game.state.add("TitleScreenState", TitleScreenState, false)
            this.game.state.add("SpaceshipScreenState", SpaceshipScreenState, false)
            this.game.state.start("TitleScreenState", true, true)
        }

    }
}

window.onload = () => {
    var game = new Game.SpaceGame()
};