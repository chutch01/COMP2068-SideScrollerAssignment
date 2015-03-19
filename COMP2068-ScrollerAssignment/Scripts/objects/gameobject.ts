module objects {
    export class GameObject extends createjs.Bitmap {

        //public variables
        public width: number;
        public height: number;
        public isColliding: boolean;
        public soundString: string;
        public name: string;

        //private variables
        protected _dy;
        protected _dx;

        //constructor ++++++++++++++++++++++++++++
        constructor(assetString:string) {
            super(assetLoader.getResult(assetString));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //this.width = this.getBounds().width * 0.5;
            //this.height = this.getBounds().height * 0.5;


            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.isColliding = false;


        }
        //this is an empty method that is overridden in the other objects that inherit this class
        public hit() {
        }
        
    }
}  