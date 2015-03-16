module objects {
    export class Plane extends createjs.Bitmap {

        public height: number;
        public width: number;


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("plane"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.y = 430;
            createjs.Sound.play("engine", { loop: -1 });//this is the sound
        }
        //public methods+++++++++++++++++++++++++++
        public update() {
            this.x = stage.mouseX;
        }
    }
} 