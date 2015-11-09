/**
 * Created by sgbyers on 11/3/2015.
 */

LanguageGame.Conveyor = function(game) {
    this.points;

    this.card;
    this.card2;
    this.card3;

    this.cardText;
    this.cardText2;
    this.cardText3;

    this.ningaBG;
    this.wordBox;
    this.boxWordText;
    this.boxText;

    this.xf;

    this.backBox;
    this.backText;
    this.backWordText;
};

LanguageGame.Conveyor.prototype = {

    create: function() {

        this.xf = this.game.width;

        this.card = this.add.image(-800, -800, 'card');//dummy card

        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');

        this.buildBackBox(this);
        this.buildWordBox(this);
        this.buildCards(this);
        this.tweenCard(this);


    },

    buildBackBox: function(game){
        this.backBox = this.add.image(0,this.game.height-60,'box');
        this.backWordText = "Back";
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.backText = this.game.add.text(this.backBox.width/2,this.backBox.height/2-35,this.backWordText, style);
        this.backText.anchor.set(0.5);
        this.backBox.addChild(this.backText);

        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    buildWordBox: function(game){
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.boxWordText = "Blue";
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        this.boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, this.boxWordText, style);
        this.boxText.anchor.set(0.5);
        this.wordBox.addChild(this.boxText);

    },

    buildCards: function(game){

        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        y1=10;
        this.card = this.add.image(0,y1, 'card');
        y2 = y1+this.card.height+5;
        this.card2 = this.add.image(0- this.card.width, y2, 'card');
        y3 = y2+this.card.height+5;
        this.card3 = this.add.image(0- this.card.width, y3, 'card');
        this.cardText = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(34253), style);
        this.cardText2 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32169), style);
        this.cardText3 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32043), style);
        this.cardText.anchor.set(0.5);
        this.cardText2.anchor.set(0.5);
        this.cardText3.anchor.set(0.5);
        this.card.addChild(this.cardText);
        this.card2.addChild(this.cardText2);
        this.card3.addChild(this.cardText3);

    },

    tweenCard: function(game){
        tween = this.add.tween(this.card).to({
            x: [this.xf],
            y: [y1]
        }, 7500);

        tween2 = this.add.tween(this.card2).to({
            x: [this.xf],
            y: [y2]
        }, 7500);

        tween3 = this.add.tween(this.card3).to({
            x: [this.xf],
            y: [y3]
        }, 7500);

        tween.interpolation(function (v, k) {
            return Phaser.Math.linearInterpolation(v, k);
        });

        tween2.interpolation(function (v, k) {
            return Phaser.Math.linearInterpolation(v, k);
        });

        tween3.interpolation(function (v, k) {
            return Phaser.Math.linearInterpolation(v, k);
        });

        this.card.events.onInputDown.addOnce(this.stopCard, this, this.card, tween); //will happen when input happens
        //this.cardText.events.onInputDown.addOnce(this.stopCard, this); //will happen when input happens

        tween.repeat(Infinity);
        tween.start();

        tween2.delay(3000);
        tween2.repeat(Infinity);
        tween2.start();

        tween3.delay(1000);
        tween3.repeat(Infinity);
        tween3.start();
    },

    stopCard: function(pointer, card, tween){
      tween.stop(true);
    },

    back: function(pointer){
        this.state.start('MainMenu');
    }

};