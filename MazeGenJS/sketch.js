let cols;
let rows;

let sW = 512;

let cW = sW / 8;

const grid = [];

let current;

const stack = [];


function setup() {
    createCanvas(sW + 20, sW + 20, WEBGL);
    frameRate(144);

    cols = floor(sW / cW);
    rows = floor(sW / cW);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid.push(new Cell(x, y, cW));
        }        
    }

    translate((-width/2) + 10, (-height/2) + 10, 0);
    background(255)
    
    let skip = false;
    
    let len = grid.length;
    let i = 0;

    while(i < len) {
        grid[i].show();
        i++;
    }

    current = grid[0];
}

let run = false;

function draw() {
    translate((-width/2) + 10, (-height/2) + 10, 0);

    if (run) {
        current.visited = true;
        const next = current.checkNeighbors();
        current.highlight();
        
        if (next != null) {
            next.visited = true;
    
            // Step 2
            stack.push(next);
    
            // Step 3
            removeWalls(current, next);
    
            current.show();
            next.highlight();
            current = next;
            
        } else if (stack.length > 0) {
            current.show();
            current = stack.pop();
            current.highlight();
        } 
    }
}

function keyPressed() {
    if (keyCode === 32) run = !run;
}

function index(x, y) {
    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) return null;

    return grid[x + y * cols];
}

function removeWalls(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;

    if (x == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x == -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    
    if (y == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}