class Particle {
    constructor(pos) {
        this.pos = pos;
        this.vel = p5.Vector.fromAngle(random(0, TWO_PI))
        this.vel.setMag(2)
        this.res = createVector()
        this.lifetime = 60 * particleLifetime.value();
        
        let xq = floor(map(this.pos.x, 0, width, 0, 3));
        let yq = floor(map(this.pos.y, 0, height, 0, 3));


        if (xq !== 3 && yq !== 3) {
            this.ogq = quadrants[yq][xq];
        };
        
        
    }

    collide(x, y, x2, y2) {
        
        for (const cell of grid) {
            
            for (const collider of cell.getColliders()) {
                const mag = this.vel.mag();
                // TOP COLLISION
                    if (collider.p1.y < y && collider.p1.y > y2) {
                        if (collider.p1.x < x2 && collider.p2.x > x2) {
                            
                            this.vel = p5.Vector.fromAngle(-(collider.getVector().angleBetween(this.vel)));
                            this.pos.y = collider.p1.y + 2;
                            return;
                        }
                    }
                    if (collider.p1.y > y && collider.p1.y < y2) {
                        if (collider.p1.x < x2 && collider.p2.x > x2) {
                            this.vel = p5.Vector.fromAngle(-(collider.getVector().angleBetween(this.vel)));
                            this.pos.y = collider.p1.y - 2;
                            return;
                        }
                    }
                    if (collider.p1.x > x && collider.p1.x < x2) {
                        if (collider.p1.y < y2 && collider.p2.y > y2) {
                            this.vel = p5.Vector.fromAngle((collider.getVector().angleBetween(this.vel) - HALF_PI));
                            this.pos.x = collider.p1.x + this.vel.x;
                            
                            return;
                        }
                    }
                    if (collider.p1.x < x && collider.p1.x > x2) {
                        if (collider.p1.y < y2 && collider.p2.y > y2) {
                            this.vel = p5.Vector.fromAngle(-(collider.getVector().angleBetween(this.vel) - HALF_PI));
                            this.pos.x = collider.p1.x + this.vel.x;
                            return;
                        }
                    }

                    if (this.pos.y + 20 > height) {
                        this.vel.y = -this.vel.y;
                        this.pos.y = height - 21;
                        return;
                    }
            }
        }
        this.pos.add(this.vel);
    }


    update() {
        const oldx = this.pos.x;
        const oldy = this.pos.y;
        const newx = this.pos.x + this.vel.x
        const newy = this.pos.y + this.vel.y
        

        this.collide(oldx, oldy, newx, newy);
        this.vel.lerp(createVector(0,0), 0.01)
        this.lifetime--;
    }

    draw() {
        stroke(255);
        strokeWeight(particleSize.value());
        point(this.pos);
    }
}