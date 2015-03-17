/*
 * this is the laser that the player fires from the character it will be removed if it collides with something
 */
module objects {
    export class Laser extends objects.GameObject {


        //constructor ++++++++++++++++++++++++++++
        constructor(x: number, y: number) {
            super("laser");
            this.x = x;
            this.y = y;
            this._dx = 7;

            this.soundString = "laser_sound"; 

        }

        //public methods+++++++++++++++++++++++++++
        public update() {

            if (this.x = 680 + this.width) {
                stage.removeChild(this);
            }
            this.x += this._dx;
        }
        public hit() {
            stage.removeChild(this);
        }
    }
}  