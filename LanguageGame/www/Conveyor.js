/**
 * Created by sgbyers on 11/3/2015.
 */
LanguageGame.Conveyor = function (game) {
    this.points = 0;
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
};

LanguageGame.Conveyor.prototype = {

    create: function () {
        this.xf = this.game.width;
        this.card = this.add.image(-800, -800, 'card');//dummy card
        this.gameBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'belt');
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        this.buildBackBox();
        this.buildLivesCounter();
        this.buildScoreBox();
        this.buildCards();
        this.tweenCard();

    },

    stopCard: function (pointer, game, card, tween, bool) {
        this.numCards--;
        if (bool == "true") {
            this.lives--;
            //portray decremented lives and check for death
        }
        tween.stop(true);
        card.kill();

    },

    buildBackBox: function () {
        this.backBox = this.add.image(this.world.centerX - 250, this.game.height - 100, 'back');
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    buildLivesCounter: function () {
        this.livesBox = this.add.image(this.game.width+100, this.game.height + 600, 'box');
        //var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        //lifeText.anchor.set(0.5);
        //this.livesBox.addChild(lifeText);
    },

    buildScoreBox: function () {
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - this.livesBox.height + 5, 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

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

    buildWordBox: function (i) {
        this.wordBox = null;
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        var boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, this.cardArray[i].engText, this.style);
        boxText.anchor.set(0.5);
        this.wordBox.addChild(boxText);
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

    tweenCard: function () {

        var y1 = 10;
        for (var i = 0; i < 3; i++) {
            this.tweenArray[i] = this.add.tween(this.cardArray[i]).to({
                x: [this.xf],
                y: [y1 + (i * (this.card.height + 5))]
            }, 7500);

            //var tweenFin = this.add.tween(this.cardArray[i]).to({x: [-800], y: [-500]}, 1);
            //this.tweenArray[i].chain(tweenFin);
           // this.tweenArray[i].repeat(Infinity);
            this.cardArray[i].inputEnabled = true;
            this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.game, this.cardArray[i], this.tweenArray[i], this.cardArray[i].goodCard); //will happen when input happens

            //juvenile random delay computation
            this.tweenArray[i].delay((3000 * Math.random()) + 500);
            this.tweenArray[i].start();
        }

    },

    updateScore: function () {
        this.scoreBox = null;
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - this.livesBox.height + 5, 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    updateLives: function () {
        this.livesBox = null;
        this.livesBox = this.add.image(this.world.centerX + 100, this.game.height - 60, 'box');
        var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        lifeText.anchor.set(0.5);
        this.livesBox.addChild(lifeText);
    },

    clear: function(){
        this.points = 0;
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

    back: function (pointer) {
        this.clear();
        this.state.start('MainMenu');
    },

    update: function () {
        this.updateScore();
        this.updateLives();

        for(var i = 0; i < this.cardArray.length;i++){
            if( this.cardArray[i]!= null&&this.cardArray[i].x > 800) {
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

       // if(this.numCards==0||(this.cardArray[0]!=null&&this.cardArray[0].x > 500)){
        if(this.numCards==0){
            this.buildCards();
            this.tweenCard();
        }

        if(this.lives==0){
            alert("Game Over, Sorry");
            this.clear()
            this.create();
        }
    }

};