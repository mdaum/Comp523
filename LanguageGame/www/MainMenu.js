/*Initialization of the MainMenu object of LanguageGame.  This object represents the MainMenu state, and its respective
 * variables and parameters.  The purpose of this state is give the user a nice way to navigate between games.
 */
LanguageGame.MainMenu=function(game){
    this.game1 = null;              //Text/Card for Conveyor Game
    this.game2 = null;              //Text/Card for Wordaga Game
    this.game3 = null;              //Text/Card for Card Ninja Game
    this.selectionPrompt = null;    //Text telling the user to choose a game
    this.mainBG = null;             //Background for Main Menu
    this.cardText1 = null;          //Text for Conveyor card
    this.cardText2 = null;          //Text for Wordaga card
    this.cardText3 = null;          //Text for Card Ninja card
    this.style = null;              //Default style for text
    this.help = null;               //Text/Card for "How to play" display

};

//Prototype for MainMenu object of LanguageGame
LanguageGame.MainMenu.prototype={

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running


    /* Built-in function used by Phaser.  Called upon entering the MainMenu state
     * Initializes the MainMenu state.
     */
     create: function(){

         //Adding background
         this.mainBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');

         //Adding help button
         this.help = this.add.image(this.world.centerX - 225,this.game.height-50, 'help');
         this.help.anchor.set(0.5);
         this.help.inputEnabled = true;
         this.help.events.onInputDown.addOnce(this.startHelp, this);

         //Adding Conveyor card and text
         this.game1=this.add.image(this.world.centerX-80,this.world.centerY+100,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText1=this.game.add.text(138/2,180/2,"Card\nNinja",this.style);
          this.cardText1.anchor.set(0.5);
          this.cardText1.x = Math.floor(this.game1.x + 138/2);
          this.cardText1.y= Math.floor(this.game1.y+180/2);


         //Adding Wordaga card and text
          this.game2=this.add.image(this.world.centerX-80,this.world.centerY-100,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText2=this.game.add.text(138/2,180/2,"Wordaga",this.style);
          this.cardText2.anchor.set(0.5);
          this.cardText2.x = Math.floor(this.game2.x + 138/2);
          this.cardText2.y= Math.floor(this.game2.y+180/2);

          var card2Subtext = this.game.add.text(138/2,180/2 + 25, "Coming Soon",{font: "15px Georgia",fill:"000000",align:"center"});
          card2Subtext.anchor.set(0.5);
          card2Subtext.x = Math.floor(this.game2.x + 138/2);
          card2Subtext.y= Math.floor(this.game2.y+180/2 +25);

          //Adding Card Ninja card and text
          this.game3=this.add.image(this.world.centerX-80,this.world.centerY-300,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText3=this.game.add.text(138/2,180/2,"Conveyor",this.style);
          this.cardText3.anchor.set(0.5);
          this.cardText3.x = Math.floor(this.game3.x + 138/2);
          this.cardText3.y= Math.floor(this.game3.y+180/2);

          //Setting all the game cards to accept input, and start the appropriate games
          this.game1.inputEnabled=true;
          this.game1.events.onInputDown.addOnce(this.startNinja,this);

          this.game2.inputEnabled=true;
          this.game2.events.onInputDown.addOnce(this.startWordaga,this);

          this.game3.inputEnabled=true;
          this.game3.events.onInputDown.addOnce(this.startConveyor,this);

          //Set the selection prompt text.
          this.selectionPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+300, 'eightbitwonder', 'Choose a Game', 24);

  },

    //-------------------------  UTILITY FUNCTONS -------------------------//
    //The following functions provide utilities that are used in create() and update()

    //Function to start the "How to play" state
    startHelp: function(pointer){
        this.state.start('HowTo');
    },
    //Function to start Card Ninja
    startNinja:function(pointer){
        this.state.start('Ninja');
    },
    //Function to start Wordaga
    startWordaga:function(pointer){
      this.state.start('Wordaga');
    },
    //Function to start Conveyor
    startConveyor:function(pointer){
        this.state.start('Conveyor');
    }
};