/**
 * Created by sgbyers on 11/3/2015.
 */
LanguageGame.Conveyor = function (game) {
    this.lives = 3;             //the number of lives the player has remaining
    this.goodCard = 0;          //the number of cards that match as correct
    this.score = 0;             //Holds the current score of the player
    this.multiplier = 1;        //The Multiplier for the score

    this.card = null;           //A place holder card allowing for global dimensional references
    this.style = "";            //The default style to be used by text in the game
    this.gameBG = null;         //Background assets for the game
    this.wordBox = null;        //Box containing the correct word in English
    this.backBox = null;        //Box containing the "back arrow" to exit the Ninja game to the Main Menu
    this.livesBox = null;       //Box containing the number of lives remaining
    this.scoreBox = null;       //Box containing the score

    this.xf = 0;                //The terminating point for a processing card

    this.cardArray = [];        //An array to hold all the cards in the game at a given moment
    this.tweenArray = [];
    this.numCards = 0;          //The number of Cards onscreen at a given instant

    this.results = null;        //The results of the most recent database call made in the Ninja game
    this.category = "";         //The category for the current round (e.g. numbers, colors etc.)

    this.goodCardIdx = 0;
};

//The Prototype for the Conveyor Game
LanguageGame.Conveyor.prototype = {

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running

    /* Built-in function used by Phaser.  Called upon entering the Conveyor game-state
     * Initializes the Conveyor game-state.
     */

    create: function () {
        this.xf = this.game.width;
        this.card = this.add.image(-800, -800, 'card');//dummy card
        this.gameBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'belt');

        //Set the default font style for the game, using CSS styling
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        //------- select the category for the round ------------//
        //Retrieve all the categories in the DB, and select one at random
        this.results = LanguageGame.gameDB.exec("SELECT DISTINCT category FROM test");
        var len = this.results[0]["values"].length;
        var rnd = Math.floor(Math.random() * len);
        this.category = this.results[0]["values"][rnd][0];
        //---------------------------------------------//
        //Retrieve all the english,unicode pairs from the DB, and add the background and wordBox assets
        //Note that this DB query is the only one that needs to be made in a given round
        this.results = LanguageGame.gameDB.exec("SELECT english, unicode FROM test T WHERE T.category like '%" + this.category + "%'");


        Math.floor(Math.random()*3); //*numcards to be random for larger sets?

        this.buildBackBox();
        this.buildLivesCounter();
        this.buildScoreBox();
        this.buildCards();
        this.tweenCard();

    },

    /* Built-in function used by Phaser.  Is called 30 times a second to update the game and its
     * relevant parameters
     */
    update: function () {
        this.updateScore();
        this.updateLives();

        for(var i = 0; i < this.cardArray.length;i++){
            if( this.cardArray[i]!= null&&this.cardArray[i].x > (this.game.width-this.card.width)) {
                if (this.cardArray[i].goodCard == "true") {
                    this.goodCard--;
                    this.score+= (100*this.multiplier);
                    this.multiplier++;
                }else{
                    this.multiplier = 1;
                    this.lives--;
                }

                this.cardArray[i].kill();
                this.cardArray[i] = null;
                this.numCards--;
            }

        }

        if(this.numCards==0){
            this.buildCards();
            this.tweenCard();
        }

        if(this.lives==0){
            this.lives = 3;
            LanguageGame.score = this.score;
            LanguageGame.multiplier = this.multiplier;
            LanguageGame.lives = 0;
            this.clear();
            this.state.start('ConveyorOver');
        }
    },

    //-------------------------  UTILITY FUNCTONS -------------------------//
    //The following functions provide utilities that are used in create() and update()

    /* Stops a card, adjusting all the necessary information, and then killing the card. Is called when the
     *  onInputDown event fires on a card (See aNewCard() function).
     *
     *  parameters:  pointer - a reference to the card object that was touched/clicked (not used, had trouble using)
     *               game - a reference to the current game
     *               card - a reference to the card object that was touched/clicked
     *               tween - a reference to the tween attached to a card
     *               bool - marker of whether or not it is a correct card
     */
    stopCard: function (pointer, game, card, tween, bool) {
        this.numCards--;
        if (bool == "true") {
            this.lives--;
            this.multiplier = 1;
            //portray decremented lives and check for death
        }
        tween.stop(true);
        card.kill();

    },

    //Builds the world element that serves as the back button
    buildBackBox: function () {
        this.backBox = this.add.image(this.world.centerX - 250, this.game.height - 100, 'back');
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    //Builds the world element that serves as the life counter
    buildLivesCounter: function () {
        this.livesBox = this.add.image(this.game.width+100, this.game.height + 600, 'box');
    },

    //Builds the world element that serves to hold the score
    buildScoreBox: function () {
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - this.livesBox.height + 5, 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    //Generates cards for the game
    buildCards: function () {
        // var rnd = Math.floor(Math.random() * 3);
        var j = 0;
        var y1 = 10;
        var x = 0 - this.card.width;
        if (this.goodCard == 0) {
            this.goodCard++;
            j = Math.floor((Math.random() * 3));
        }

        for (var i = 0; i < 3; i++) {
            this.cardArray[i] = this.add.image(x, y1 + (i * (this.card.height + 5)), 'card');
            this.cardArray[i].goodCard = "false";
            this.cardArray[i].addChild(this.getCardText(i));
            this.numCards++;

            switch (i) {
                case 0:
                    this.cardArray[0].engText = "Blue";
                    break;
                case 1:
                    this.cardArray[1].engText = "Orange";
                    break;

                case 2:
                    this.cardArray[2].engText = "Yellow";
                    break;
                default:
                    break;
            }

        }
        switch (j) {
            case 0:
                this.cardArray[0].goodCard = "true";
                this.buildWordBox(0);
                break;
            case 1:
                this.cardArray[1].goodCard = "true";
                this.buildWordBox(1);
                break;

            case 2:
                this.cardArray[2].goodCard = "true";
                this.buildWordBox(2);
                break;
            default:
                break;
        }

    },

    //Build world element that holds the desired word(s)
    buildWordBox: function (i) {
        this.wordBox = null;
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        var boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, this.cardArray[i].engText, this.style);
        boxText.anchor.set(0.5);
        this.wordBox.addChild(boxText);
    },

    //gets the words for the cards for the game state
    getCardText: function (num) {
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        switch (num) {
            case 0:
                var cardText = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(34253), style);
                cardText.anchor.set(0.5);
                return (cardText);
                break;
            case 1:
                var cardText2 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32169), style);
                cardText2.anchor.set(0.5);
                return (cardText2);
                break;
            case 2:
                var cardText3 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32043), style);
                cardText3.anchor.set(0.5);
                return (cardText3);
                break;
            default:
                break;
        }


    },

    //apply the tween to a card object
    tweenCard: function () {

        var y1 = 10;
        for (var i = 0; i < 3; i++) {
            this.tweenArray[i] = this.add.tween(this.cardArray[i]).to({
                x: [this.xf],
                y: [y1 + (i * (this.card.height + 5))]
            }, 7500);

            this.cardArray[i].inputEnabled = true;
            this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.game, this.cardArray[i], this.tweenArray[i], this.cardArray[i].goodCard); //will happen when input happens

            //juvenile random delay computation
            this.tweenArray[i].delay((3000 * Math.random()) + 500);
            this.tweenArray[i].start();
        }

    },

    //Function to set/reset the scoreBox with the appropriate score
    updateScore: function () {
        this.scoreBox = null;
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - this.livesBox.height + 5, 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    //Function to set/reset the livesBox with the appropriate number of lives
    updateLives: function () {
        this.livesBox = null;
        this.livesBox = this.add.image(this.world.centerX + 100, this.game.height - 60, 'box');
        var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        lifeText.anchor.set(0.5);
        this.livesBox.addChild(lifeText);
    },

    /* Resets all the variables in the game-state.  Necessary because it seems that restarting the game-state
     * does NOT reset the variables associated with that state.  Therefore, this method is called right before any
     * restarts or when leaving the game-state.
     */
    clear: function(){
        this.lives = 3;
        this.goodCard = 0;
        this.score = 0;
        this.multiplier = 1;

        this.card = null;
        this.style = null;
        this.gameBG = null;
        this.wordBox = null;
        this.backBox = null;
        this.livesBox = null;
        this.scoreBox = null;

        this.xf = 0;

        this.cardArray = [];
        this.tweenArray = [];
        this.numCards = 0;
    },

    //Function to return to the MainMenu
    back: function (pointer) {
        this.clear();
        this.state.start('MainMenu');
    }

};