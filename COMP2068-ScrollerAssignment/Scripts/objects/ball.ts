module objects {
    export class Ball extends objects.GameObject {

        
        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super("ball");
            this._dx = -5;
            this.soundString = "randomize";


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
        public hit() {
            console.log("points added");

            stage.removeChild(this);
            this._reset();
            stage.addChild(this);

        }
    }
}  