/**
 * Created by mdaum on 10/12/2015.
 */

var LanguageGame = {
    gameDB : null //database for the game
};
LanguageGame.Boot=function(game){

    /*On boot, setup a variable representing the gameDB, using
      an XMLHttpRequest to localhost for our db file
     */


    var xhr = new XMLHttpRequest();
    if(window.navigator.platform.toLowerCase().indexOf("win")==-1&&window.navigator.platform.toLowerCase().indexOf("mac")==-1){
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
LanguageGame.Boot.prototype={
  preload: function(){
      this.load.image('preloadBar','assets/images/loader_bar.png');
      this.load.image('titleimage','assets/images/title.png');

  },
    create: function(){


        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scaleStage();
        this.input.addPointer();
        this.stage.backgroundColor = '#000000';
        this.state.start('Preloader');
    },

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