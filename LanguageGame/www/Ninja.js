LanguageGame.Ninja = function(game) {
    this.points;
    this.card;
};

LanguageGame.Ninja.prototype = {
    create: function() {
        this.card = this.add.image(4,483,'card');
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


