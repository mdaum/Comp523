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
        this.load.image('building','assets/images/building.png'); //title page image
        this.load.image('dojo','assets/images/dojo.png'); //ninja background
        this.load.image('card','assets/images/Paper.png'); //blank card
        this.load.image('bg','assets/images/RedBack.png'); //generic background
        this.load.image('box','assets/images/box.png'); // "button" place holder
        this.load.image('stars','assets/images/Stars.png'); //wordaga background
        this.load.image('belt','assets/images/Conveyor.png');
        this.load.image('back', 'assets/images/back_arrow.png');//back button
        this.load.image('help', 'assets/images/question.png');//help button

    },

    create : function() {
        this.preloadBar.cropEnabled = false;
    },
    update:function(){
        this.ready=true;
        this.state.start('Title');
    }

};