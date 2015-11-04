/**
 * Created by sgbyers on 11/3/2015.
 */
LanguageGame.Wordaga = function(game) {
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

    this.x1;
    this.x2
    this.x3;
    this.x4;
    this.x5;
    this.x6;
    this.xf;

    this.y1;
    this.y2;
    this.y3;
};

LanguageGame.Wordaga.prototype = {
    create: function() {

        x1 = 4;
        xf = this.game.width;

        x3 = 136;
        x4 = 300;
        x5 = 438;
        x6 = 500;

        y1 = 10;


        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.card = this.add.image(this.world.centerX-80, y1, 'card');
        y2 = y1 + this.card.height + 5;
        this.card2 = this.add.image(this.world.centerX-80 - this.card.width, y2, 'card');
        y3 = y2 + this.card.height + 5;
        this.card3 = this.add.image(this.world.centerX-80 + this.card.width, y2, 'card');

        this.boxWordText = "Blue";
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, this.boxWordText, style);

        this.cardText = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(34253), style);
        this.cardText2 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32169), style);
        this.cardText3 = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(32043), style);

        this.boxText.anchor.set(0.5);
        this.cardText.anchor.set(0.5);
        this.cardText2.anchor.set(0.5);
        this.cardText3.anchor.set(0.5);
        this.card.addChild(this.cardText);
        this.card2.addChild(this.cardText2);
        this.card3.addChild(this.cardText3);
        this.wordBox.addChild(this.boxText);

    }


};