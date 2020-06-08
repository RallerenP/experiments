class Cell {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;

        this.visited = false;

        this.walls = [true, true, true, true];
    }

    checkNeighbors() {
        const {x, y} = this;
        const neighbors = [];

        const top = index(x, y - 1);
        const right = index(x + 1, y);
        const bottom = index(x, y + 1);
        const left = index(x - 1, y);

        if (top !== null && !top.visited)
            neighbors.push(top);

        if (right !== null && !right.visited)
            neighbors.push(right);

        if (bottom !== null && !bottom.visited)
            neighbors.push(bottom);

        if (left !== null && !left.visited)
            neighbors.push(left);

        if (neighbors.length !== 0) {
            return neighbors[floor(random(0, neighbors.length))];
            
        } else return null;
    }

    highlight() {
        const { w } = this;

        const x = this.x * this.w;
        const y = this.y * this.w;

        if (this.visited) {
            noStroke();
            fill(0, 255, 255);
            rect(x, y, w, w);
        }
    }

    getBoundaries() {
        
    }

    show() {
        const { w } = this;

        const x = this.x * this.w;
        const y = this.y * this.w;

        if (this.visited) {
            noStroke();
            fill(255, 0, 255);
            rect(x, y, w, w);
        }

        stroke(0);
        strokeWeight(1);

        if (this.walls[0])
            line(x, y, x + w, y);
        if (this.walls[1])
            line(x + w, y, x + w, y + w); 
        if (this.walls[2])
            line(x + w, y + w, x, y + w);
        if (this.walls[3])
            line(x, y, x, y + w);
            console.log("x: " + x, "y: " + y);
            console.log("x + w: " + (x + w), "y + w: " + (y + w));
            
    }

}