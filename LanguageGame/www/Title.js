/**
 * Created by mdaum on 10/12/2015.
 */
LanguageGame.Title=function(game){
  this.startPrompt;
    this.startBG;
    this.startBG2;
    this.startBG3;
    this.startPrompt;
};
LanguageGame.Title.prototype={
  create: function() {
      startBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'titlescreenbackground');//sky in left hand corner
      startBG2 = this.add.image(this.world.centerX - 120, this.world.centerY - 220, 'titleimage'); //ripped off
      startBG3 = this.add.image(this.world.centerX - 80, this.world.centerY - 50, 'burns')//burns
      startBG.inputEnabled = true; //now we can accept clicks/touches
      startBG.events.onInputDown.addOnce(this.nextScreen, this); //will happen when input happens
      startPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+250,'eightbitwonder','Touch to Start', 24);
  },
    nextScreen: function(pointer){
     this.state.start('MainMenu');
    }
};