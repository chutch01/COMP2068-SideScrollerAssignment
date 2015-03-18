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
            if (this.x > 680) {
                totalLasers--;
                lasers.splice(lasers.indexOf(this), 1);//remove a laser from the array
                
                    stage.removeChild(this);
                }
             
        }
        public hit() {
            totalLasers--; //decrease the number of lasers in game
            lasers.splice(lasers.indexOf(this), 1);
            stage.removeChild(this);
        }

    }
}  