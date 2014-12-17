requirejs.config({
    paths: {
        Phaser: '../lib/phaser',
        Isometric: '../lib/isometric'
    },
    shim: {
        Isometric: {
            deps: ['Phaser'],
            exports: 'Isometric'
        }
    }
});

require(['Phaser', 'game'], function (Phaser, Game) {
    var game = new Game();
    game.start();
});
