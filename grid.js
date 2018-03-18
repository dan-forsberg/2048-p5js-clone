var HORIZONTAL = 0;
var VERTICAL = 1;
var H = 0;
var V = 1;

function Game() {
    this.grid = new Array();

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            this.grid.push({
                'x': x,
                'y': y,
                'v': 0,
                combine: function() {
                    this.v *= 2;
                }
            });
        }
    }
};

Game.prototype = {
    tile: function(x, y) {
        return this.grid[x + y * 4];
    },

    /*
     * Set an empty tile to either a 2 or 4 (75% chance for 2)
     * Ignore count
     */
    newTile: function() {
        let empty_tiles = new Array();
        for (let i = 0; i < 4 * 4; i++)
            if (game.grid[i].v == 0)
                empty_tiles.push(game.grid[i]);

        let r = floor(random(empty_tiles.length));
        let tile = empty_tiles[r];
        tile.v = (random(0, 4) < 3 ? 2 : 4);
        return tile;
    },

    /* 
     * Get an array of references to tiles in either a row or column
     * to get the 3rd row: game.slice(2, HORIZONTAL)
     * to get the last column in reverse: game.slice(3, VERTICAL, true)
     */
    slice: function(i, dir, rev = false) {
        let arr = new Array();
        if (dir == VERTICAL) {
            for (let y = 0; y < 4; y++)
                arr.push(this.tile(i, y));
        } else {
            for (let x = 0; x < 4; x++)
                arr.push(this.tile(x, i));
        }
        return !rev ? arr : arr.reverse();
    },

    /*
     * Works:
     * 0 2 2 0 -> 0 0 0 4 (hor and vert)
     * 0 2 0 2 -> 4 0 0 0
     * 2 2 0 0 -> 4 0 0 0
     * 
     */
    combine: function(dir, rev = false) {
        for (let i = 0; i < 4; i++) {
            /*
             * Get the relevant row/col ("slice")
             * Make new arrays, one for empty and one for non-empty tiles in that slice
             *
             * Go through non-empty tiles, check if n and n+1 are equal
             *   check if n or n+1 is at the edge, then save into $tile
             *   if not at the edge, take the suitable $empty spot
             *
             * Combine them, and 0 the correct tile
             */
            var arr = this.slice(i, dir, rev);
            var tiles = new Array();
            var empty = new Array();

            /* shift some tiles to the right position
             * in case of (0, x, y, z) -> (x, y, z, 0) it works
             */
            for (let i = 0; i < 3; i++) {
                if (arr[i].v == 0) {
                    arr[i].v = arr[i + 1].v;
                    arr[i + 1].v = 0;
                }
            }

            for (let i = 0; i < 4; i++) {
                if (arr[i].v != 0)
                    tiles.push(arr[i]);
            }

            for (let i = 0; i < tiles.length - 1; i++) {
        
                if (tiles[i].v == tiles[i + 1].v) {
                    let v = tiles[i].v * 2;
                    tiles[i].v = tiles[i + 1].v = 0;
                    for (let i = 0; i < 3; i++) {
                        if (arr[i].v == 0) {
                            arr[i].v = v;
                            break;
                        }
                    }
                }
            }
        }
    },

    set: function(x, y, v) {
        this.tile(x, y).v = v;
    }

};
