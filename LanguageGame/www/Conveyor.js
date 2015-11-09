/**
 * Created by sgbyers on 11/3/2015.
 */

LanguageGame.Conveyor = function (game) {
    this.points = 0;

    this.card = null;
    this.style = null;
    this.ningaBG = null;
    this.wordBox = null;
    this.backBox = null;

    this.xf = 0;

    this.cardArray = [];
    this.tweenArray = [];
};

LanguageGame.Conveyor.prototype = {

    create: function () {

        this.xf = this.game.width;
        this.card = this.add.image(-800, -800, 'card');//dummy card
        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        this.buildBackBox();
        this.buildWordBox();
        this.buildCards();
        this.tweenCard();

    },

    stopCard: function (pointer, card, tween) {
        tween.stop(true);
    },

    buildBackBox: function () {
        this.backBox = this.add.image(0, this.game.height - 60, 'box');
        var backWordText = "Back";
        var backText = this.game.add.text(this.backBox.width / 2, this.backBox.height / 2 - 35, backWordText, this.style);
        backText.anchor.set(0.5);
        this.backBox.addChild(backText);

        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    buildWordBox: function () {
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.wordBox.addChild(this.getBoxText());

    },

    buildCards: function () {

        var y1 = 10;
        var x = 0 - this.card.width;

        for (var i = 0; i < 3; i++) {
            this.cardArray[i] = this.add.image(x, y1 + (i * (this.card.height + 5)), 'card');
            this.cardArray[i].addChild(this.getCardText(i));
        }

    },

    getBoxText: function(){
        var boxWordText = "Blue";
        var boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, boxWordText, this.style);
        boxText.anchor.set(0.5);
        return(boxText);
    },

    getCardText: function(num){
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

            var tweenFin = this.add.tween(this.cardArray[i]).to({x: [-800], y: [-500]}, 1);
            this.tweenArray[i].chain(tweenFin);
            this.tweenArray[i].repeat(Infinity);
            this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.cardArray[i], this.tweenArray[i]); //will happen when input happens
            this.tweenArray[i].delay(i*(3000*Math.random()));
        }

        //need to think of math to incorporate this in to loop based off of index: mod?
        //this.tweenArray[1].delay(3000);
        //this.tweenArray[2].delay(1000);

        for (var j = 0; j < 3; j++) {
            this.tweenArray[j].start();
        }

    },

    back: function (pointer) {
        this.state.start('MainMenu');
    }

};