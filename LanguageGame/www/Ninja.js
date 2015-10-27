LanguageGame.Ninja = function(game) {
    this.points;
};

LanguageGame.Ninja.prototype = {
    create: function() {
        var square = this.add.graphics();
        square.beginFill(0xffffff);
        square.drawCircle(0, 0, 20);
        square.position.set(4,484);
        var tween = this.add.tween(square).to({
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


