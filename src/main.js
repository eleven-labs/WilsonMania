requirejs.config({
    paths: {
        Phaser: '../lib/phaser'
    }
});

require(['Phaser', 'game'], function (Phaser, Game) {
    var game = new Game();
    game.start();
});
