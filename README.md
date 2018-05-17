A simple clone of 2048 made in JS, using the p5.js library. P5 is used to make the use of canvas easier -- the point of the project isn't to make a functional clone, just to try something out.

I started the project after being inspired watching "TheCodingTrain" try to make one, but I didn't like the way the board was 'handled'.

I wanted to make a version where the function to merge/combine tiles would not have to take any direction into account, just merge `{2,0,2,0}` into `{4, 0, 0, 0}`. Even if the tiles weren't moving right -> left, but maybe up -> down. To do this, I made the `slice()` function in grid.js. I think this makes for a *much* more elegant solution than trying to account for the direction in a `merge` function.

Right now, the game isn't fully functional as some `{2, 2, 0, 2}` combinations don't merge properly (solution would probably be to keep a copy of the previous state). But I just wanted to find a more elegant solution to merging.
