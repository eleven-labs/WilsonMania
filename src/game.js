define([
    'Phaser',
    'Isometric'
    ], function (Phaser, Isometric) {
        'use strict';

        function Game() {
            console.log('Making the Game');
        }

        Game.prototype = {
            constructor: Game,

            start: function() {
                this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
                    preload: this.preload,
                    create: this.create
                });
            },

            preload: function() {
                this.game.load.image('cube', '../assets/cube.png');
                // Add and enable the plug-in.
                this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
                // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
                // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
                this.game.iso.anchor.setTo(0.5, 0.2);
            },

            create: function() {
                // Create a group for our tiles, so we can use Group.sort
                var isoGroup = this.game.add.group();

                // Let's make a load of cubes on a grid, but do it back-to-front so they get added out of order.
                var cube;
                for (var xx = 256; xx > 0; xx -= 48) {
                    for (var yy = 256; yy > 0; yy -= 48) {
                        // Create a cube using the new game.add.isoSprite factory method at the specified position.
                        // The last parameter is the group you want to add it to (just like game.add.sprite)
                        cube = this.game.add.isoSprite(xx, yy, 0, 'cube', 0, isoGroup);
                        cube.anchor.set(0.5)

                        // Store the old messed up ordering so we can compare the two later.
                        cube.oldZ = cube.z;

                        // Add a slightly different tween to each cube so we can see the depth sorting working more easily.
                        this.game.add.tween(cube).to({ isoZ: 10 }, 100 * ((xx + yy) % 10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
                    }
                }

                // Just a var so we can tell if the group is sorted or not.
                var sorted = false;

                // Toggle sorting on click/tap.
                this.game.input.onDown.add(function () {
                    sorted = !sorted;
                    if (sorted) {
                        this.game.iso.simpleSort(isoGroup);
                    }
                    else {
                        isoGroup.sort('oldZ');
                    }
                }, this);
            }
        };

        return Game;
    });
