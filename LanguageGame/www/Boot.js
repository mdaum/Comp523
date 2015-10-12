/**
 * Created by mdaum on 10/12/2015.
 */
var LanguageGame = {};
LanguageGame.Boot=function(game){};
LanguageGame.Boot.prototype={
  preload: function(){
    this.load.image('preloadBar','assets/images/loading.png');
      this.load.image('titleimage','assets/images/TitleImage');

  },
    create: function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = true;
        this.scale.setScreenSize(true);
        this.input.addPointer();
        this.stage.backgroundColor = '#171642';
        this.state.start('Preloader');
    }
};