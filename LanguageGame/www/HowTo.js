/**
 * Created by sgbyers on 11/24/2015.
 */
LanguageGame.HowTo = function (game) {
    this.points = 0;
};
LanguageGame.HowTo.prototype = {
    create: function () {
         var mainBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
    }
};