LanguageGame.Ninja = function(game) {
    this.points;
    this.card;
    this.cardText;
    this.ningaBG;
    this.wordBox;
    this.boxText;
    this.x1;
    this.x2
    this.x3;
    this.x4;
    this.x5;
    this.x6;

};

LanguageGame.Ninja.prototype = {
    create: function() {
        this.ningaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');
        this.card = this.add.image(4, 400, 'card');

        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.boxText = this.game.add.text(this.wordBox.width / 2, this.card.height / 8 + 10, "Blue", style);
        this.cardText = this.game.add.text(this.card.width / 2, this.card.height / 2, String.fromCharCode(34253), style);
        this.boxText.anchor.set(0.5);
        this.cardText.anchor.set(0.5);
        this.card.addChild(this.cardText);
        this.wordBox.addChild(this.boxText);

       this.card.events.onInputDown.addOnce(this.stopCard, this); //will happen when input happens
       this.cardText.events.onInputDown.addOnce(this.stopCard, this); //will happen when input happens


        var tween = this.add.tween(this.card).to({
            x: [4, 100, 136, 300, 438, 500],
            y: [483, 0, 50, 0, 483, 900]
        }, 2000);
        tween.interpolation(function (v, k) {
            return Phaser.Math.bezierInterpolation(v, k);
        });
        tween.start();
        tween.stop(true);

            x1 = 4;
            x2 = 100;
            x3 = 136;
            x4 = 300;
            x5 = 438;
            x6 = 500;

            tween = this.add.tween(this.card).to({
                x: [x1, x2, x3, x4, x5, x6],
                y: [483, 0, 50, 0, 383, 900]
            }, 2000);

            tween.interpolation(function (v, k) {
                return Phaser.Math.bezierInterpolation(v, k);
            });

            tween.repeat(Infinity);
            tween.start();

    },

    stopCard: function(game){
        this.tween.pause();
    }
};


