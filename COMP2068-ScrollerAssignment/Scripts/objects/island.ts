module objects {
    export class Island extends objects.GameObject {


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("island");
            this._dx = -5;

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
            if (this.y > 480 + this.width) {
                this._reset();

            }
        }



        //public methods+++++++++++++++++++++++++++
        public update() {
            this.x += this._dx;
            this._checkbounds();
            


        }
    }
}  