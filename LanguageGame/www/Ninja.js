LanguageGame.Ninja = function(game) {
    this.ninjaText;
};

LanguageGame.Ninja.prototype = {
    create: function() {
        ninjaText = this.add.bitmapText(this.world.centerX - 155, this.world.centerY + 180, 'eightbitwonder', 'Click on me to do Database stuff!', 24);

    }
};

