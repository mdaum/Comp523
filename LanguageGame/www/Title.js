/**
 * Created by mdaum on 10/12/2015.
 */
LanguageGame.Title=function(game){
  this.startPrompt;
    //this.startBG;
    this.startBG2;
    this.startBG3;
};
LanguageGame.Title.prototype={
  create: function(){
      startBG = this.add.image(this.world.centerX-100, this.world.centerY-120, 'titlescreenbackground');//sky
      startBG2= this.add.image(this.world.centerX-325,this.world.centerY-320,'titleimage'); //burns
      startBG3=this.add.image(this.world.centerX,this.world.centerY,'titlescreen')
      startBG.inputEnabled = true; //now we can accept clicks/touches
      startBG.events.onInputDown.addOnce(this.nextScreen, this); //will happen when input happens

      startPrompt = this.add.bitmapText(this.world.centerX-240, this.world.centerY+180, 'eightbitwonder', 'Touch Center to Start!', 24);
},
    nextScreen:function(pointer){
     this.state.start('MainMenu');
    }
};