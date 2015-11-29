
LanguageGame.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText=null;
    this.ready = false;
    this.loaded=null;
};
function getMediaURL(s) {
    if(isAndroid) return "/android_asset/www/" + s;
    return s;
}
function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

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
        this.load.image('sword','assets/images/katana.png')
        if(!isAndroid) { //we use regular phaser sounds
            this.load.audio('welcome', getMediaURL('assets/audio/welcomeSound.mp3'));
            this.load.audio('woops',getMediaURL('assets/audio/youSuck.mp3'));
            this.load.audio('yea',getMediaURL('assets/audio/yea.mp3'));
            this.load.audio('gameOver',getMediaURL('assets/audio/gameOver.mp3'));
        }
    },

    create : function() {
        this.preloadBar.cropEnabled = false;
    },
    update:function(){
        this.ready=true;
        this.state.start('Title');
    }

};