LanguageGame.Ninja = function (game) {
    this.points = null;
    this.card = null;
    this.ninjaBG = null;
    this.wordBox = null;
    this.backBox = null;
    this.livesBox = null;
    this.scoresBox = null;
    this.backText = "";
    this.backWordText = "";
    this.boxText = "";
    this.numCards = 0;
    this.goodCard = 0;
    this.results = null;
    this.cardArray = [];
    this.category = "";
    this.lives = 0;
    this.score = 0;
    this.style = "";
    this.goodCardIdx = 0;
    this.multiplier = 1;
};

LanguageGame.Ninja.prototype = {
    create: function () {
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        //------- select the category for the round ------------//
        this.results = LanguageGame.gameDB.exec("SELECT DISTINCT category FROM test");
        var len = this.results[0]["values"].length;
        var rnd = Math.floor(Math.random()*len);
        this.category = this.results[0]["values"][rnd][0];
        console.log(len);
        console.log(rnd);
        //---------------------------------------------//

        //------------- initialize game state ------------//
        this.results = LanguageGame.gameDB.exec("SELECT english, unicode FROM test T WHERE T.category like '%"+ this.category+"%'");
        this.ninjaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'dojo');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.card = this.add.image(-400, -400, 'card');
        this.card.goodCard = "false";
        //------------------------------------------------------//

        //--------------------- Create Back Button -----------------//
        this.backBox = this.add.image(0, this.game.height - 60, 'box');
        this.backWordText = "Back";
        this.backText = this.game.add.text(this.backBox.width / 2, this.backBox.height / 2 - 35, this.backWordText, this.style);
        this.backText.anchor.set(0.5);
        this.backBox.addChild(this.backText);
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens
        //------------ end back button ---------------------------//

        //------------- count for player lives to be displayed -----//
        this.lives = 3;
        this.setLivesBox();
        //---------------------------------------------//
        this.setScoreBox();
        //------------ Make Starting Cards -----------//
        this.goodCardIdx = Math.floor(Math.random()*3);
        for (var i = 0; i < 3; i++) {
            this.aNewCard(this.goodCardIdx,i, this);
        }
        console.log(this.numCards);
        //------------------------------//
    },

    stopCard: function (pointer, game, card, tween, bool) {

        tween.stop(true);

        if (bool == "true") {
            this.score+= 100*this.multiplier;
            this.multiplier++;
            console.log("multiplier is " + this.multiplier);

            //increment score
        }else{
            this.lives--;
            this.multiplier = 1;
            console.log("multiplier is " + this.multiplier);
            this.setLivesBox();
            //portray decremented lives and check for death
        }
        card.kill();
        this.numCards--;

        if(this.numCards==0) {
            this.goodCardIdx = Math.floor(Math.random()*3)
            for (var i = 0; i < 3; i++) {
                this.aNewCard(this.goodCardIdx, i, this);
            }
        }

    },

    aNewCard: function (goodCardIdx, i, game) {
        this.numCards++;

        var catLen = this.results[0]["values"].length;
        var randNumber = Math.floor(Math.random() * catLen);
        var boxWordText = this.results[0]["values"][randNumber][0];
        var unicodeVal = this.results[0]["values"][randNumber][1];

        var cardStyle = {font: "60px Serif", fill: "000000", align: "center"};
        var card = this.add.image(0, this.game.height, 'card');
        var cardText = this.game.add.text(card.width / 2, card.height / 2, String.fromCharCode(unicodeVal), cardStyle);
        cardText.anchor.set(0.5);
        card.addChild(cardText);
        card.goodCard = "false";

        //--------------------------------------------//
        if (goodCardIdx == i) {
            card.goodCard = "true";
            this.goodCard++;
        }
        //--------------------------------------------//

        var style = {font: "50px Georgia", fill: "000000", align: "center"};


        if (card.goodCard == "true") {

            var newBoxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, boxWordText, style);
            newBoxText.anchor.set(0.5);
            this.wordBox.removeChild(this.boxText);
            this.wordBox.addChild(newBoxText);
            this.boxText = newBoxText;
        }


        var x1 = 4;
        var x2 = 100;
        var x3 = 136;
        var x4 = 300;
        var x5 = 438;
        var x6 = 500;

        var tween = this.add.tween(card).to({
            x: [x1, x2, x3, x4, x5, x6],
            y: [483, 0, 50, 0, 383, 900]
        }, 5000);

        tween.interpolation(function (v, k) {
            return Phaser.Math.bezierInterpolation(v, k);
        });

        //var tween2 = this.game.add.tween(card).to({x: card.x, y: this.game.height + 500}, 1);
        //tween.chain(tween2);

        card.inputEnabled = true;
        cardText.inputEnabled = true;
        card.events.onInputDown.addOnce(this.stopCard,this, this.game, card, tween, card.goodCard); //will happen when input happens

        tween.delay(1000 * this.numCards);
        tween.start();

        this.cardArray[this.numCards-1] = card;
    },

    clear: function(){
            this.points = null;
            this.card = null;
            this.ninjaBG = null;
            this.wordBox = null;
            this.backBox = null;
            this.livesBox = null;
            this.scoresBox = null;
            this.backText = "";
            this.backWordText = "";
            this.boxText = "";
            this.numCards = 0;
            this.goodCard = 0;
            this.results = null;
            this.cardArray = [];
            this.category = "";
            this.lives = 0;
            this.score = 0;
            this.style = "";
            this.goodCardIdx = 0;
            this.multiplier = 1;
        console.log("multiplier is " + this.multiplier);
    },

    back: function (pointer) {
        this.clear();
        this.state.start('MainMenu');
    },

    setLivesBox: function() {
        this.livesBox = null;
        this.livesBox = this.add.image(this.world.width - 200, 10, 'box');
        var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, this.lives, this.style);
        lifeText.anchor.set(0.5);
        this.livesBox.addChild(lifeText);
    },

    setScoreBox: function() {
        this.scoreBox = null;
        this.scoreBox = this.add.image(200, 10, 'box');
        var scoreText = this.game.add.text(this.scoreBox.width / 2, this.scoreBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },


    update : function(){
        this.setLivesBox();
        this.setScoreBox();

        for(var i = 0; i < this.cardArray.length;i++)
        {
            if(this.cardArray[i] != null && ( this.cardArray[i].x > this.game.width || this.cardArray[i].y > this.game.height))
            {

                if (this.cardArray[i].goodCard == "true") {
                    this.goodCard--;
                    this.lives--;
                    this.multiplier = 1;
                    console.log("multiplier is " + this.multiplier);

                }

                this.cardArray[i].kill();
                this.cardArray[i] = null;
                this.numCards--;
                console.log(this.numCards);
            }
        }

        if(this.numCards == 0)
        {
            this.goodCardIdx = Math.floor(Math.random()*3)
            for (var i = 0; i < 3; i++) {
                this.aNewCard(this.goodCardIdx, i, this);
            }
        }

    if(this.lives <=0) {
        alert("GAME OVER");
        this.lives = 3;
        this.clear();
        this.state.start("Ninja");
    }
    }

};


