/**
 * Created by mdaum on 10/12/2015.
 */
LanguageGame.MainMenu=function(game){
  this.game1;
    this.game2;
    this.game3;
    this.selectionPrompt;
    this.mainBG;
    this.cardText1;
    this.cardText2;
    this.cardText3;
    this.style
};
LanguageGame.MainMenu.prototype={
  create:function(){
      mainBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
    //game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'ninjaselect'); //wordninja
     game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'card'); //wordninja

      //card text for Ninja Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText1=this.game.add.text(138/2,180/2,"Ninja",this.style);
      this.cardText1.anchor.set(0.5);
      this.cardText1.x = Math.floor(game1.x + 138/2);
      this.cardText1.y= Math.floor(game1.y+180/2);


      game2=this.add.image(this.world.centerX-80,this.world.centerY-100,'card');//will be for wordaga

      //card text for Wordaga Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText2=this.game.add.text(138/2,180/2,"Wordaga",this.style);
      this.cardText2.anchor.set(0.5);
      this.cardText2.x = Math.floor(game2.x + 138/2);
      this.cardText2.y= Math.floor(game2.y+180/2);

      game3=this.add.image(this.world.centerX-80,this.world.centerY-300,'card');//will be for conveyer belt...

      //card text for Conveyor Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText3=this.game.add.text(138/2,180/2,"Conveyor",this.style);
      this.cardText3.anchor.set(0.5);
      this.cardText3.x = Math.floor(game3.x + 138/2);
      this.cardText3.y= Math.floor(game3.y+180/2);

      game1.inputEnabled=true;
      game1.events.onInputDown.addOnce(this.startNinja,this);

      game2.inputEnabled=true;
      game2.events.onInputDown.addOnce(this.startWordaga,this);

      game3.inputEnabled=true;
      game3.events.onInputDown.addOnce(this.startConveyor,this);

      selectionPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+300, 'eightbitwonder', 'Choose a Game', 24);
  },
    startNinja:function(pointer){
        this.state.start('Ninja');
    },

    startWordaga:function(pointer){
      this.state.start('Wordaga');
    },

    startConveyor:function(pointer){
        this.state.start('Conveyor');
    }
};