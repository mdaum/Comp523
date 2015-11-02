/**
 * Created by mdaum on 10/12/2015.
 */
var LanguageGame = {};
LanguageGame.Boot=function(game){};
LanguageGame.Boot.prototype={
  preload: function(){
    this.load.image('preloadBar','assets/images/loader_bar.png');
      this.load.image('titleimage','assets/images/TitleImage.png');

  },
    create: function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scaleStage();
        this.input.addPointer();
        this.stage.backgroundColor = '#171642';
        this.state.start('Preloader');
    },

    scaleStage: function(){

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //this.scale.minWidth = 270;
        //this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = true;
        //this.scale.setScreenSize(true); //this is HUGE problem!!

/*        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.scale.minWidth = this.width/2;
            this.scale.minHeight = this.height/2;
            this.scale.maxWidth = this.width;
            this.scale.maxHeight = this.height;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
           // this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = this.width/2;
            this.scale.minHeight = this.height/2;
            this.scale.maxWidth = 2048; //You can change this to gameWidth*2.5 if needed
            this.scale.maxHeight = 1228; //Make sure these values are proportional to the gameWidth and gameHeight
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            //this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            //this.scale.setScreenSize(true);
        }*/
    }
};