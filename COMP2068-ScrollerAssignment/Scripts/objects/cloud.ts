module objects {
    export class Cloud extends objects.GameObject {

  

        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("cloud");

            this.soundString = "thunder";

            //set island to start at random x
            this._reset();

        }
        //private methods++++++++++++++++++++++++++
        private _reset() {
            this.y = Math.floor(Math.random() * 640);
            this.x = -this.height;
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;
            
        }
        private _checkbounds() {
            if (this.x > 480 + this.height) {
                this._reset();

            }
        }



        //public methods+++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x += this._dx;
            this._checkbounds();



        }
    }
} 