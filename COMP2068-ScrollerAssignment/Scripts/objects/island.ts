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
            this.y = Math.floor(Math.random() * 480);
            this.x = this.width + 680;
            this._dx = -5;
            this._dy = 0;
        }
        private _checkbounds() {
            if (this.x <= -480 + this.width) {
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