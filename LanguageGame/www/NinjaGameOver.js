/**
 * Created by sgbyers on 06-Dec-15.
 */
LanguageGame.NinjaGameOver = function (game) {
    this.ninjaBG = null;        //Background assets for the Ninja game
    this.wordBox = null;        //Box containing the correct word in English
    this.backBox = null;        //Box containing the "back arrow" to exit the Ninja game to the Main Menu
    this.livesBox = null;       //Box containing the number of lives remaining
    this.scoresBox = null;      //Box containing the score
    this.boxText = "";
    this.numCards = 0;          //The number of Cards onscreen at a given instant
    this.goodCard = 0;          //The number of cards that match with the correct answer onscreen. Should be 1 or 0 at the present time.
    this.goodCardIdx = 0;       //The index of the correct card in cardArray
    this.cardArray = [];        //An array to hold all the cards in the game at a given moment
    this.category = "";         //The category for the current round (e.g. numbers, colors etc.)
    this.lives = 0;             //The number of lives the player has remaining
    this.score = 0;             //The current score for the player
    this.style = "";            //The default style to be used by text in the game
    this.multiplier = 1;        //The multiplier for score
};

LanguageGame.NinjaGameOver.prototype = {
    create: function () {
        this.ninjaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'dojo');

        //Set the default font style for the game, using CSS styling
        this.style = {font: "30px Georgia", fill: "000000", align: "center"};

        this.score = LanguageGame.score;
        LanguageGame.score = null;

        this.multiplier = LanguageGame.multiplier;
        LanguageGame.multiplier = null;

        this.buildBackBox();
        this.buildRestartBox()
        this.addScore();

    },

    addScore: function(){
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        //this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
        var text = this.add.bitmapText(this.world.width/2, this.world.height/2-150, 'eightbitwonder','Game Over', 42);
        text.anchor.set(0.5);
        var h1 = this.add.bitmapText(this.world.width/2, this.world.height/2-50, 'eightbitwonder','Your Score', 30);
        h1.anchor.set(0.5);
        var scoreAsText = this.score.toString();
        var scoreText = this.add.bitmapText(this.world.width/2, this.world.height/2, 'eightbitwonder',scoreAsText, 30);
        scoreText.anchor.set(0.5);

    },

    buildBackBox: function () {
        //var backBox = this.add.image(this.world.centerX - 200, this.game.height - 100, 'box');

        var backText = this.add.bitmapText(this.world.centerX - 125, this.game.height - 100, 'eightbitwonder','To Menu', 30);
        backText.anchor.set(0.5);
        backText.inputEnabled = true; //now we can accept clicks/touches
        backText.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    buildRestartBox: function(){

        var newGameText = this.add.bitmapText(this.world.centerX+125, this.game.height - 100, 'eightbitwonder','New Game', 30);
        newGameText.anchor.set(0.5);
        newGameText.inputEnabled = true; //now we can accept clicks/touches
        newGameText.events.onInputDown.addOnce(this.restart, this); //will happen when input happens
    },
    //Function to return to the MainMenu
    back: function (pointer) {
        this.state.start('MainMenu');
    },

    restart: function(pointer){
        this.state.start('Ninja');
    }

};
