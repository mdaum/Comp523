//Global boolean determining whether device is Android
var isAndroid=window.navigator.platform.toLowerCase().indexOf("win")==-1&&window.navigator.platform.toLowerCase().indexOf("mac")==-1;

//Initialization of the LanguageGame object.  This object is passed around through every other state in our game.
var LanguageGame = {
    gameDB : null, //database for the game
    score : null,
    multiplier: null,
    lives : null
};

//Initialization of the Boot object of LanguageGame.  Populates gameDB.
LanguageGame.Boot=function(game){

    /*On boot, setup a variable representing the gameDB, using
      an XMLHttpRequest to localhost or the Android file system as appropriate for our db file.  The requested file
      is an array of bytes representing the DB, which is then converted and used to instantiate the gameDB variable
     */

    var xhr = new XMLHttpRequest();
    if(isAndroid){
        xhr.open('GET','file:///android_asset/www/databases/test.db'); //android version
    }
    else{
        xhr.open('GET', 'http://localhost:63342/Comp523/LanguageGame/www/databases/test.db', true);//pc version
    }
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
        var uInt8Array = new Uint8Array(this.response);
        LanguageGame.gameDB = new SQL.Database(uInt8Array);
    };
    xhr.send(); 
};

//Prototpye for the Boot object of LanguageGame
LanguageGame.Boot.prototype={

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running

    /* Built-in function used by Phaser.  Called on instantiation of object but before
     * the create() method.  Loads all the relevant assets for the succeeding Preloader state.
     */
    preload: function(){

      //Load the images needed by the Preloader state
      this.load.image('preloadBar','assets/images/loader_bar.png');
      this.load.image('titleimage','assets/images/title.png');

  },

    /* Built-in function used by Phaser.  Called on instantiation of object after preloader() completes.
     *  Sets some variables for the game and scales the game's stage.
     */
    create: function(){

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scaleStage();
        this.input.addPointer();
        this.stage.backgroundColor = '#000000';
        this.state.start('Preloader');
    },

    //-------------------------  UTILITY FUNCTONS -------------------------//
    //The following functions provide utilities that are used in create() and update()
    
    //Function to scale the game stage
    scaleStage: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.scale.maxwidth=720;
        this.scale.maxHeight=1024;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
};