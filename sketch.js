var grid;
var w = 100;
c = console.table;

function setup() {
    createCanvas(401, 401);
    grid = new Grid();
    grid.newTile();
    grid.newTile();

    noFill();
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(28);
}

function draw() {
    background(255, 255, 255);
    stroke(0);

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            rect(x * w, y * w, w, w, 0);

            let txt = grid.tile(x, y).v.toString();
            if (txt === "0")
                continue;
	    text(txt, x * w + w / 2, y * w + w / 2);
        }
    }
}
