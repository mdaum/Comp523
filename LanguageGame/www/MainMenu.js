/**
 * Created by mdaum on 10/12/2015.
 */
LanguageGame.MainMenu=function(game){
    this.game1 = null;
    this.game2 = null;
    this.game3 = null;
    this.selectionPrompt = null;
    this.mainBG = null;
    this.cardText1 = null;
    this.cardText2 = null;
    this.cardText3 = null;
    this.style = null;
    this.help = null;

};
LanguageGame.MainMenu.prototype={
  create:function(){

      this.mainBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');

      this.help = this.add.image(this.world.centerX - 225,this.game.height-50, 'help');
      this.help.anchor.set(0.5);
      this.help.inputEnabled = true;
      this.help.events.onInputDown.addOnce(this.startHelp, this);

    //game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'ninjaselect'); //wordninja
     this.game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'card'); //wordninja

      //card text for Ninja Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText1=this.game.add.text(138/2,180/2,"Card\nNinja",this.style);
      this.cardText1.anchor.set(0.5);
      this.cardText1.x = Math.floor(this.game1.x + 138/2);
      this.cardText1.y= Math.floor(this.game1.y+180/2);


      this.game2=this.add.image(this.world.centerX-80,this.world.centerY-100,'card');//will be for wordaga

      //card text for Wordaga Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText2=this.game.add.text(138/2,180/2,"Wordaga",this.style);
      this.cardText2.anchor.set(0.5);
      this.cardText2.x = Math.floor(this.game2.x + 138/2);
      this.cardText2.y= Math.floor(this.game2.y+180/2);

      var card2Subtext = this.game.add.text(138/2,180/2 + 25, "Coming Soon",{font: "15px Georgia",fill:"000000",align:"center"});
      card2Subtext.anchor.set(0.5);
      card2Subtext.x = Math.floor(this.game2.x + 138/2);
      card2Subtext.y= Math.floor(this.game2.y+180/2 +25);

      this.game3=this.add.image(this.world.centerX-80,this.world.centerY-300,'card');//will be for conveyer belt...

      //card text for Conveyor Game
      this.style={font: "30px Georgia",fill:"000000",align:"center"};
      this.cardText3=this.game.add.text(138/2,180/2,"Conveyor",this.style);
      this.cardText3.anchor.set(0.5);
      this.cardText3.x = Math.floor(this.game3.x + 138/2);
      this.cardText3.y= Math.floor(this.game3.y+180/2);

      this.game1.inputEnabled=true;
      this.game1.events.onInputDown.addOnce(this.startNinja,this);

      this.game2.inputEnabled=true;
      this.game2.events.onInputDown.addOnce(this.startWordaga,this);

      this.game3.inputEnabled=true;
      this.game3.events.onInputDown.addOnce(this.startConveyor,this);

      this.selectionPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+300, 'eightbitwonder', 'Choose a Game', 24);

  },
    startHelp: function(pointer){
        this.state.start('HowTo');
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