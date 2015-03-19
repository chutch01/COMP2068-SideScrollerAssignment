module objects {
    export class Background extends createjs.Bitmap {

        //public variables
        public width;
        public height;


        //private variables
        private _dx = 5;

        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("background"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this._reset();

        }
        //private methods++++++++++++++++++++++++++
        private _reset() {
            this.y = 0;
            this.x = constants.BACKGROUND_RESET_WIDTH;
        }
        private _checkbounds() {
            if (this.x <=-127) {
                this._reset();

            }
        }



        //public methods+++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;
            this._checkbounds();

        }
    }
}   