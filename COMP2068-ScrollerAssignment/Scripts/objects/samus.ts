/*
 * This is the player, the player is capable of moving up and down, and firing a laser at the enemies that fly at you.
 * you have a set amount of life that will go down if you are hit
 */

module objects {
    export class Samus extends createjs.Bitmap {
        //private methods
        private _lifePoints: number;
        //public methods
        public height: number;
        public width: number;
        public laser: objects.Laser;


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("samus"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.x = 50;
            this._lifePoints = 5;
        }
        //public methods+++++++++++++++++++++++++++
        /*
         * shoot method is what makes the player fire lasers from their current position
         */
     
        
        public shoot() {
            this.laser = new objects.Laser(this.x, this.y);

            stage.addChild(this.laser);
            createjs.Sound.play("lasersound");

        }
        public damage() {
            this._lifePoints--;
        }

        public update() {
            this.y = stage.mouseY;
        }
        
    }
} 