module objects {
    export class Enemy extends objects.GameObject {

  

        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("enemy");

            this.soundString = "thunder";

            //set cloud to start at random x
            this._reset();
            
        }
        //private methods++++++++++++++++++++++++++
        private _reset() {
            this.y = Math.floor(Math.random() * 480);
            this.x = Math.floor(Math.random() * 480) + 680;
            this._dx = -5;
            this._dy = 0;
            
        }
        private _checkbounds() {
            if (this.x <= 0 - this.width) {
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