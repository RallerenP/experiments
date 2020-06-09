let cols;
let rows;

let sW = 512;

let cW = sW / 9;

const grid = [];

let current;

const stack = [];

const particles = [];

const quadrants = []

let inputContainer;

let drawLabCheckBox;
let particleCountLabel;
let particleCount; 
let particleLifetime;
let particleLifetimeLabel;
let particleSize;
let particleSizeLabel;

function setup() {
    createCanvas(sW + 20, sW + 20, WEBGL);

    cols = floor(sW / cW);
    rows = floor(sW / cW);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid.push(new Cell(x, y, cW));
        }
    }


    for (let y = 0; y < rows; y++) {
        const qy = floor(map(y, 0, 9, 0, 3));
        
        
        if (quadrants[qy] === undefined) quadrants[qy] = [];    
        for (let x = 0; x < cols; x++) {
            const qx = floor(map(x, 0, 9, 0, 3));
            if (quadrants[qy][qx] === undefined) quadrants[qy][qx] = [];
            quadrants[qy][qx].push(grid[x + y * cols]);
        }   
        
    }   

    

    // for (let i = 0; i < 1000; i++) {
    //     particles.push(new Particle(createVector(width / 2, height / 2)));
    // }

    translate((-width/2) + 10, (-height/2) + 10, 0);
    background(255)
    
    let skip = false;

    current = grid[0];
    
    do {
        current.visited = true;
        const next = current.checkNeighbors();
        // current.highlight();
        
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
    } while (stack.length != 0);
    

   

    console.log(quadrants);
    
    for (const cell of quadrants[0][1]) {
        console.log(cell)
    }

    inputContainer = createDiv();

    particleCount = createSlider(0, 5, 1, 1);
    drawLabCheckBox = createCheckbox("Draw Labyrinth");
    particleLifetime = createSlider(0, 5, 2, 1);
    particleSize = createSlider(0, 5, 1, 1);
    

    particleCount.parent(inputContainer);
    particleCountLabel = createSpan("Particle Count: " + particleCount.value()).parent(inputContainer);
    
    particleLifetime.parent(inputContainer);
    particleLifetimeLabel = createSpan("Particle Lifetime (Seconds): " + particleLifetime.value()).parent(inputContainer);

    particleSize.parent(inputContainer);
    particleSizeLabel = createSpan("Particle Size: " + particleSize.value()).parent(inputContainer);


    drawLabCheckBox.parent(inputContainer);
}

let run = false;

function draw() {
    translate((-width/2) + 10, (-height/2) + 10, 0);
    background(0);

    if (drawLabCheckBox.checked()) {
        let len = grid.length;
        let i = 0;
    
        while(i < len) {
            grid[i].show();
            i++;
        }
    }
    
    for (let i = particles.length - 1; i > 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        if (particle.lifetime < 0) particles.splice(i, 1);
    };

    for (let i = 0; i < particleCount.value(); i++) {
        particles.push(new Particle(createVector(mouseX, mouseY)));
    }

    particleCountLabel.html("Particle Count: " + particleCount.value())
    particleLifetimeLabel.html("Particle Lifetime (Seconds): " + particleLifetime.value())
    particleSizeLabel.html("Particle Size: " + particleSize.value())
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