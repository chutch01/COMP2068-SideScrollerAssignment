module objects {
    export class Samus extends createjs.Bitmap {

        public height: number;
        public width: number;


        //constructor ++++++++++++++++++++++++++++
        constructor() {
            super(assetLoader.getResult("samus"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.x = 50;
            createjs.Sound.play("engine", { loop: -1 });//this is the sound
        }
        //public methods+++++++++++++++++++++++++++
        public update() {
            this.y = stage.mouseY;
        }
    }
} 