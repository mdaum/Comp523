/**
 * Created by mdaum on 10/12/2015.
 */
LanguageGame.MainMenu=function(game){
  this.game1;
    this.game2;
    this.game3;
    this.selectionPrompt;
};
LanguageGame.MainMenu.prototype={
  create:function(){
      game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'ninjaselect'); //wordninja
      game2=this.add.image(this.world.centerX-80,this.world.centerY-100,'WIP');//will be for wordaga
      game3=this.add.image(this.world.centerX-80,this.world.centerY-300,'WIP');//will be for conveyer belt...
      game1.inputEnabled=true;
      game1.events.onInputDown.addOnce(this.startNinja,this);
      selectionPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+300, 'eightbitwonder', 'Choose a Game', 24);
  },
    startNinja:function(pointer){
        this.state.start('Ninja');
    }
};