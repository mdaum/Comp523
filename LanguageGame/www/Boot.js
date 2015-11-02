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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.scale.maxwidth=720;
        this.scale.maxHeight=1024;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
};