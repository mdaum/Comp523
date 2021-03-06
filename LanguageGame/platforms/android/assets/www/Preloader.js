LanguageGame.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText=null;
    this.ready = false;
};

LanguageGame.Preloader.prototype = {

    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
        this.titleText=this.add.image(this.world.centerX,this.world.centerY-220,'titleimage');
        this.titleText.anchor.setTo(0.5,0.5);
        this.load.image('titlescreenbackground','assets/images/sky.png');
        this.load.image('burns','assets/images/burns.png');
        this.load.image('blankwood','assets/images/blankwood.png');
        this.load.image('ninjaselect','assets/images/ninjaselect.png');
        this.load.image('WIP','assets/images/WIP.png');
    },

    create : function() {
        this.preloadBar.cropEnabled = false;
    },
    update:function(){
        this.ready=true;
        this.state.start('Title');
    }

};