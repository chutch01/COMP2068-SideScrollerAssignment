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
            
            
            this.soundString = "laser_sound"; 
         
            

        }

        //public methods+++++++++++++++++++++++++++
        public update() {

            this.x += 5; 
            if (!background.addEventListener("click", fire)) {
                stage.removeChild(this);
                
            } 
            if (this.x > 500) {
                stage.removeChild(this);
            }     
        }
        public hit() {
            stage.removeChild(this);
        }

    }
}  