/**
 * Created by sgbyers on 11/3/2015.
 */
LanguageGame.Wordaga = function (game) {
    this.score = 0;
    this.lives = 3;
    this.card = null;
    //this.i;
    this.cardArray = [];
    this.tweenArray = [];

    this.wordBG = null;
    this.wordBox = null;
    this.backBox = null;
    this.livesBox = null;
    this.scoreBox = null;
    this.style = "";

};

LanguageGame.Wordaga.prototype = {
    create: function () {

        this.wordBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'stars');
        this.card = this.add.image(-800, -800, 'card');//dummy card
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        this.createButtons();
        this.createWord();
        this.makeCards();
        this.makeTweens();
    },

    createWord: function () {
        /*
         function to "generate" a word in the "search" box...
         * */
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        var boxWordText = "Blue";
        var boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, boxWordText, style);
        boxText.anchor.set(0.5);
        this.wordBox.addChild(boxText);


    },

    createButtons: function () {
        /*
         Method to create the back buttons, etc...
         * */
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.backBox = this.add.image(this.world.centerX - 250, this.game.height - 100, 'back');
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens


        this.livesBox = this.add.image(this.world.width + 125, this.world.height + 60, 'box');
        //var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        //lifeText.anchor.set(0.5);
        //this.livesBox.addChild(lifeText);
    },

    stopCard: function (pointer, card, tween) {
        tween.stop(true);
    },

    back: function (pointer) {
        this.state.start('MainMenu');
    },

    makeTweens: function () {

        for (var i = 0; i < 3; i++) {
            this.tweenArray[i] = this.game.add.tween(this.cardArray[i]).to({
                x: this.cardArray[i].x,
                y: this.cardArray[i].y
            }, 1);

            var tweenFin = this.game.add.tween(this.cardArray[i]).to({x: -800, y: -500}, 1);
            this.tweenArray[i].chain(tweenFin);
            this.tweenArray[i].repeat(Infinity);
            this.tweenArray[i].start();
            this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.cardArray[i], this.tweenArray[i]); //will happen when input happens
        }

    },

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

    makeCards: function () {

        for (var i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    this.cardArray[i] = this.add.image(this.world.centerX - 80, 10, 'card');
                    this.cardArray[i].addChild(this.getCardText(i));
                    this.cardArray[i].inputEnabled = true;
                    break;

                case 1:
                    this.cardArray[i] = this.add.image(this.world.centerX - 80 - this.card.width, 15 + this.card.height, 'card');
                    this.cardArray[i].addChild(this.getCardText(i));
                    this.cardArray[i].inputEnabled = true;
                    break;

                case 2:
                    this.cardArray[i] = this.add.image(this.world.centerX - 80 + this.card.width, 15 + this.card.height, 'card');
                    this.cardArray[i].addChild(this.getCardText(i));
                    this.cardArray[i].inputEnabled = true;
                    break;

                default:
                    break;

            }
        }
    },

    updateScore: function () {
        this.scoreBox = null;
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - (this.wordBox.height +10), 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    updateLives: function () {
        this.livesBox = null;
        this.livesBox = this.add.image(this.world.centerX + 125, this.game.height - 60, 'box');
        var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        lifeText.anchor.set(0.5);
        this.livesBox.addChild(lifeText);
    },

    update: function(){
        this.updateScore();
        this.updateLives();
    }



};