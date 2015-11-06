/**
 * Created by sgbyers on 11/3/2015.
 */
LanguageGame.Wordaga = function(game) {
    this.points;

    this.card;
    this.card2;
    this.card3;
    this.i;
    this.cardArray = [];
    this.tweenArray = [];

    this.cardText;
    this.cardText2;
    this.cardText3;

    this.ningaBG;
    this.wordBox;
    this.boxWordText;
    this.boxText;

    this.backBox;
    this.backText;
    this.backWordText;
};

LanguageGame.Wordaga.prototype = {
    create: function() {

        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
        this.card = this.add.image(-800, -800, 'card');//dummy card

        this.createButtons(this);
        this.createWord(this);
        this.makeCards(this);
    },

    createWord: function(game){
        /*
        function to "generate" a word in the "search" box...
        * */
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        this.boxWordText = "Blue";
        this.boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, this.boxWordText, style);
        this.boxText.anchor.set(0.5);
        this.wordBox.addChild(this.boxText);



    },

    createButtons: function(game){
        /*
        Method to create the back buttons, etc...
        * */
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.backBox = this.add.image(0,this.game.height-60,'box');
        this.backWordText = "Back";
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.backText = this.game.add.text(this.backBox.width/2,this.backBox.height/2-35,this.backWordText, style);
        this.backText.anchor.set(0.5);
        this.backBox.addChild(this.backText);
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens
    },

    stopCard: function (pointer, card, tween) {
        tween.stop(true);
    },

    back: function(pointer){
        this.state.start('MainMenu');
    },

    makeCards: function(game){
        var style = {font: "50px Georgia", fill: "000000", align: "center"};

        for(var i =0;i<3;i++){
            if(i==1) {
                this.cardArray[i] = this.add.image(this.world.centerX - 80, 10, 'card');
                var cardText = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(34253), style);
                cardText.anchor.set(0.5);
                this.cardArray[i].addChild(cardText);
                this.cardArray[i].inputEnabled = true;
                var tweenA = this.game.add.tween(this.cardArray[i]).to({x: this.cardArray[i].x, y: this.cardArray[i].y}, 1);
                tweenA.repeat(Infinity);
                this.tweenArray[i]  = tweenA;
                var tween2 = this.game.add.tween(this.cardArray[i]).to({x:-800, y:-500}, 1);
                tweenA.chain(tween2);
                tweenA.start();
                this.cardArray[i].events.onInputDown.addOnce(this.stopCard,this, this.cardArray[i], tweenA); //will happen when input happens

            } else if(i==2){
                this.cardArray[i] = this.add.image(this.world.centerX-80 - this.card.width, 15+ this.card.height, 'card');
               var cardText2 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32169), style);
                cardText2.anchor.set(0.5);
                this.cardArray[i].addChild(cardText2);
                this.cardArray[i].inputEnabled = true;

                var tweenB = this.game.add.tween(this.cardArray[i]).to({x: this.cardArray[i].x, y: this.cardArray[i].y}, 1);
                tweenB.repeat(Infinity);
                this.tweenArray[i]  = tweenB;
                var tween3 = this.game.add.tween(this.cardArray[i]).to({x:-800, y: this.game.height + 500}, 1);
                tweenB.chain(tween3);
                tweenB.start();
                this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.cardArray[i], tweenB); //will happen when input happens
            } else{

                this.cardArray[i] = this.add.image(this.world.centerX-80 + this.card.width, 15+ this.card.height, 'card');
                var cardText3 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32043), style);
                cardText3.anchor.set(0.5);
                this.cardArray[i].addChild(cardText3);
                this.cardArray[i].inputEnabled = true;

                var tweenC = this.game.add.tween(this.cardArray[i]).to({x: this.cardArray[i].x, y: this.cardArray[i].y}, 1);
                tweenC.repeat(Infinity);
                this.tweenArray[i]  = tweenC;
                var tween4 = this.game.add.tween(this.cardArray[i]).to({x:-800, y: this.game.height + 500}, 1);
                tweenC.chain(tween4);
                tweenC.start();
                this.cardArray[i].events.onInputDown.addOnce(this.stopCard, this, this.cardArray[i], tweenC); //will happen when input happens

            }
        }
    }


};