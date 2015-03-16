module objects {
    export class Ocean extends createjs.Bitmap {

        //public variables
        public width;
        public height;


        //private variables
        private _dy = 5;

        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("ocean"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;


      

            //set island to start at random x
            this._reset();

        }
        //private methods++++++++++++++++++++++++++
        private _reset() {
            this.x = 0;
            this.y = -960;
        }
        private _checkbounds() {
            if (this.y >=0) {
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