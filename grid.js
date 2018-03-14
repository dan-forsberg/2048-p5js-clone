var HORIZONTAL = 0;
var VERTICAL = 1;

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

    this.print = function() {
        console.log("-------------------------");
        for (let i = 0; i < 4; i++) {
            var line = "|  ";
            for (let j = 0; j < 4; j++)
                line += this.tile(j, i).v + "  |  ";
            console.log(line);
            console.log("-------------------------");
        }

    };

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

    this.combine = function(dir, rev = false) {
        for (let i = 0; i < 4; i++) {
            var tiles = new Array();
            var arr = this.slice(i, dir, rev);
            for (let j = 0; j < 4; j++) {
                if (arr[j].v != 0) {
                    tiles.push(arr[j]);
                }
            }

            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i].v == tiles[i + 1].v) {
                    console.log(tiles[i]);
                    tiles[i].v = 0;
                    tiles[i + 1].combine();
                }
            }

            for (let i = 1; i < arr.length - 1; i++)
                if (arr[i].v == 0)
                    arr[i].v = arr[i - 1].v;

        }
    };
}
