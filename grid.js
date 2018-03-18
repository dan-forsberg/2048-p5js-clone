var HORIZONTAL = 0;
var VERTICAL = 1;
var H = 0;
var V = 1;

function Grid() {

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

    this.tile = function(x, y) {
        return this.grid[x + y * 4];
    };

    /*
     * Set an empty tile to either a 2 or 4 (75% chance for 2)
     * Ignore count
     */
    this.newTile = function(count = 0) {
        if (count == 4 * 4)
            return -1;

        var tile = floor(random(4 * 4));
        if (this.grid[tile].v !== 0)
            return this.newTile(++count);
        else
            return this.grid[tile].v = floor(random() * 4) < 3 ? 2 : 4;
    };

    /* 
     * Get an array of references to tiles in either a row or column
     * to get the 3rd row: grid.slice(2, HORIZONTAL)
     * to get the last column in reverse: grid.slice(3, VERTICAL, true)
     */
    this.slice = function(i, dir, rev = false) {
        let arr = new Array();
        if (dir == VERTICAL) {
            for (let y = 0; y < 4; y++)
                arr.push(this.tile(i, y));
        } else {
            for (let x = 0; x < 4; x++)
                arr.push(this.tile(x, i));
        }
        return !rev ? arr : arr.reverse();
    };

    /*
     * Works: 0 2 2 0 -> 0 0 0 4 (hor and vert)
     * 
     */
    this.combine = function(dir, rev = false) {
        for (let i = 0; i < 4; i++) {
            var tiles = new Array();
            var empty = new Array();
            var arr = this.slice(i, dir, rev);

            for (let i = 0; i < 4; i++) {
                if (arr[i].v != 0)
                    tiles.push(arr[i]);
                else
                    empty.push(arr[i]);
            }

            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i].v == tiles[i + 1].v) {
                    tiles[i].combine();
                    let spot = empty[0];
                    if ((dir == HORIZONTAL && ((!rev && tiles[i].x == 0) || (rev && tiles[i].x == 3))) ||
                        (dir == VERTICAL && ((rev && tiles[i].y == 0) || (!rev && tiles[i].y == 3)))) {
                        spot = tiles[i];
                        console.log("YES dir: " + dir + " x: " + tiles[i].x + " y: " + tiles[i].y);
                    } else {
                        console.log("dir: " + dir + " x: " + tiles[i].x + " y: " + tiles[i].y);
                    }

                    let v = tiles[i].v;
                    tiles[i].v = tiles[i + 1].v = 0;
                    spot.v = v;
                }
            }
        }
    };

    this.set = function(x, y, v) {
        this.tile(x, y).v = v;
    };

    this.test = function(dir) {
        for (let x = 0; x < 4 * 4; x++)
            this.grid[x].v = 0;
        if (dir == HORIZONTAL) {
            this.tile(0, 0).v = 2;
            this.tile(1, 0).v = 2;
        } else {
            this.tile(0, 0).v = 2;
            this.tile(0, 1).v = 2;
        }
    };
}
