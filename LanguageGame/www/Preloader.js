LanugageGame.Preloader = function(game) {
    this.preloadBar = null;
    this.ready = false;
};

LanguageGame.Preloader.prototype = {

    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5,0.5);
        this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
    },

    create : function() {
        this.preloadBar.cropEnabled = false;
    }
}