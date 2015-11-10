LanguageGame.Ninja = function (game) {
    this.points;
    this.card;
    this.ningaBG;
    this.wordBox;
    this.backBox;
    this.backText;
    this.backWordText;
    //this.boxWordText;
    this.boxText;
    this.numCards;
    this.ninjaDB;
};

LanguageGame.Ninja.prototype = {
    create: function () {
        this.ninjaDB = new SQL.Database();
        this.numCards = 0;

        this.populateDatabase(this);

        var results = this.ninjaDB.exec("SELECT english, unicode FROM test T WHERE T.category like '%number%'");
        var randNumber = Math.floor(Math.random() * 9);
        var boxWordText = results[0]["values"][randNumber][0];
        var unicodeVal = results[0]["values"][randNumber][1];

        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'dojo');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.backBox = this.add.image(0, this.game.height - 60, 'box');
        this.card = this.add.image(-400, -400, 'card');
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

        for(var i = 0; i <3;i++) {
            this.newCard(this,unicodeVal);
        }

    },

    populateDatabase: function(game) {
        this.ninjaDB.run("CREATE TABLE test( wid INT PRIMARY KEY, english TEXT, category TEXT, unicode INT)");
        this.ninjaDB.run("INSERT INTO test VALUES (1, 'one', 'numbers', 19968)");
        this.ninjaDB.run("INSERT INTO test VALUES (2, 'two', 'numbers', 20108)");
        this.ninjaDB.run("INSERT INTO test VALUES (3, 'three', 'numbers', 19977)");
        this.ninjaDB.run("INSERT INTO test VALUES (4, 'four', 'numbers', 22235)");
        this.ninjaDB.run("INSERT INTO test VALUES (5, 'five', 'numbers', 20116)");
        this.ninjaDB.run("INSERT INTO test VALUES (6, 'six', 'numbers', 20845)");
        this.ninjaDB.run("INSERT INTO test VALUES (7, 'seven', 'numbers', 19971)");
        this.ninjaDB.run("INSERT INTO test VALUES (8, 'eight', 'numbers', 20843)");
        this.ninjaDB.run("INSERT INTO test VALUES (9, 'nine', 'numbers', 20061)");
        this.ninjaDB.run("INSERT INTO test VALUES (10, 'ten', 'numbers', 21313)");
    },


    stopCard: function (pointer, card,tween) {
        tween.stop(true);
        this.numCards--;
        this.newCard(this);

    },

    newCard: function (game,unicodeVal) {
        this.numCards++;
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        var card = this.add.image(0, this.game.height, 'card');
        var cardText = this.game.add.text(card.width / 2, card.height / 2, String.fromCharCode(unicodeVal), style);
        cardText.anchor.set(0.5);
        card.addChild(cardText);

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
        card.events.onInputDown.addOnce(this.stopCard, this,card,tween); //will happen when input happens
        cardText.events.onInputDown.addOnce(this.stopCard, this,card,tween); //will happen when input happens

        tween.delay(1000*this.numCards);
        tween.start();
    },

    back: function (pointer) {
        this.state.start('MainMenu');
    }
};


