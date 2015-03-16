module objects {
    export class Island extends objects.GameObject {


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("island");
            this._dy = 5;

            this.soundString = "yay";


            //set island to start at random x
            this._reset();

        }
        //private methods++++++++++++++++++++++++++
        private _reset() {
            this.x = Math.floor(Math.random() * 640);
            this.y = -this.height;
        }
        private _checkbounds() {
            if (this.y > 480 + this.height) {
                this._reset();

            }
        }



        //public methods+++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this._checkbounds();
            


        }
    }
}  