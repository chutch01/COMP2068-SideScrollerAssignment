/*
 * This is the player, the player is capable of moving up and down, and firing a laser at the enemies that fly at you.
 * you have a set amount of life that will go down if you are hit
 */

module objects {
    export class Samus extends objects.GameObject {
        //private methods
        public lifePoints: number;
        //public methods
        public height: number;
        public width: number;
        public laser: objects.Laser;
        public lasers: objects.Laser[] = [];
        public totalLasers;


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("samus");

            this.x = 50;
        }
        //public methods+++++++++++++++++++++++++++
        /*
         * shoot method is what makes the player fire lasers from their current position
         */
     
        
        public shoot() {
            this.lasers[this.totalLasers] = new objects.Laser(this.x, this.y, this);
            stage.addChild(this.lasers[this.totalLasers]);
            this.totalLasers++;
            
            
            createjs.Sound.play("lasersound");
           

        }
        public hit() {
            console.log("samus took damage");
            constants.PLAYER_LIVES--;
            console.log(constants.PLAYER_LIVES);
            this.soundString = "explosion";
            
        }

        public update() {
            this.y = stage.mouseY;
        }
        
    }
} 