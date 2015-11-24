LanguageGame.Ninja = function (game) {
    this.points = null;
    this.card = null;
    this.ninjaBG = null;
    this.wordBox = null;
    this.backBox = null;
    this.backText = "";
    this.backWordText = "";
    //this.boxWordText;
    this.boxText = "";
    this.numCards = 0;
    this.goodCard = 0;
    this.results = null;
    this.cardArray = [];
};

LanguageGame.Ninja.prototype = {
    create: function () {

        this.numCards = 0;

        this.results = LanguageGame.gameDB.exec("SELECT english, unicode FROM test T WHERE T.category like '%number%'");
        var randNumber = Math.floor(Math.random() * 9);
        var boxWordText = this.results[0]["values"][randNumber][0];
        var unicodeVal = this.results[0]["values"][randNumber][1];

        this.ninjaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'dojo');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.backBox = this.add.image(0, this.game.height - 60, 'box');
        this.card = this.add.image(-400, -400, 'card');
        this.card.goodCard = "false";
        // this.boxWordText = "Blue";
        this.backWordText = "Back";
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, boxWordText, style);
        this.backText = this.game.add.text(this.backBox.width / 2, this.backBox.height / 2 - 35, this.backWordText, style);
        this.boxText.anchor.set(0.5);
        this.backText.anchor.set(0.5);
        this.wordBox.addChild(this.boxText);
        this.backBox.addChild(this.backText);

        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens


        //------------I HAVE NO IDEA WHAT IM DOING - S -----------//
        this.newCard(this, unicodeVal);

        for (var i = 0; i < 2; i++) {
            randNumber = Math.floor(Math.random() * 9);
            unicodeVal = this.results[0]["values"][randNumber][1];
            this.newCard(this, unicodeVal);
        }
        //------------------------------//
        this.update();
    },

    stopCard: function (pointer, card, tween, bool) {
        //var child = new Phaser.TweenData(tween);
        //var c = child.parent;
        console.log(bool);
        if (bool == "true") {
            this.goodCard--;
        }
        tween.stop(true);
        this.numCards--;
        this.aNewCard(this);

    },

    newCard: function (game, unicodeVal) {

        this.numCards++;
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        var card = this.add.image(0, this.game.height, 'card');
        card.goodCard = "false";
        //--------------------------------------------//
        if (this.goodCard < 1) {
            card.goodCard = "true";
            this.goodCard++;
        }
        //--------------------------------------------//
        var cardText = this.game.add.text(card.width / 2, card.height / 2, String.fromCharCode(unicodeVal), style);
        cardText.anchor.set(0.5);
        card.addChild(cardText);

        // console.log(card.goodCard);

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

        var tween2 = this.game.add.tween(card).to({x: card.x, y: this.game.height + 500}, 1);
        tween.chain(tween2);

        card.inputEnabled = true;
        cardText.inputEnabled = true;
        card.events.onInputDown.addOnce(this.stopCard, this, this.card, tween, card.goodCard); //will happen when input happens
        cardText.events.onInputDown.addOnce(this.stopCard, this, this.card, tween); //will happen when input happens

        tween.delay(1000 * this.numCards);
        tween.start();

        this.cardArray[this.numCards] = card.goodCard;
    },

    aNewCard: function (game) {
        this.numCards++;
        var randNumber = Math.floor(Math.random() * 9);
        var boxWordText = this.results[0]["values"][randNumber][0];
        var unicodeVal = this.results[0]["values"][randNumber][1];


        var card = this.add.image(0, this.game.height, 'card');
        var cardText = this.game.add.text(card.width / 2, card.height / 2, String.fromCharCode(unicodeVal), style);
        cardText.anchor.set(0.5);
        card.addChild(cardText);

        card.goodCard = "false";
        //--------------------------------------------//
        if (this.goodCard < 1) {
            card.goodCard = "true";
            this.goodCard++;
        }
        //--------------------------------------------//

        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        var newBoxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, boxWordText, style);

        if (card.goodCard == "true") {

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

        var tween2 = this.game.add.tween(card).to({x: card.x, y: this.game.height + 500}, 1);
        tween.chain(tween2);

        card.inputEnabled = true;
        cardText.inputEnabled = true;
        card.events.onInputDown.addOnce(this.stopCard, this, this.card, tween, card.goodCard); //will happen when input happens
        cardText.events.onInputDown.addOnce(this.stopCard, this, this.card, tween); //will happen when input happens

        tween.delay(1000 * this.numCards);
        tween.start();

        this.cardArray[this.numCards] = card.goodCard;
    },

    back: function (pointer) {
        this.state.start('MainMenu');
    },

    update : function(){
        var trueCard = "truth has been found";
        if(this.cardArray[this.numCards]== "true"){
            console.log(trueCard);
        }

    }


};


