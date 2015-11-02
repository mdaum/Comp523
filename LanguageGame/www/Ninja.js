LanguageGame.Ninja = function(game) {
    this.points;
    this.card;
    this.cardText;
};

LanguageGame.Ninja.prototype = {
    create: function() {
        this.card = this.add.image(4,483,'card');
        var style={font: "50px Arial",fill:"000000",align:"center"};
        this.cardText=this.game.add.text(this.card.width/2,this.card.height/2,String.fromCharCode(40643),style);
        this.cardText.anchor.set(0.5);
        this.card.addChild(this.cardText);
        var tween = this.add.tween(this.card).to({
            x: [4,85,136,152,238,322],
            y: [483,22,273,22,483,40]
        }, 2000);
        tween.interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
        tween.repeat(Infinity);
        tween.start();
    }

};


