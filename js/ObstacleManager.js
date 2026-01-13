export class ObstacleManager {
    constructor(game) {
        this.game = game;
        this.obstacles = [];
        this.timer = 0;
        this.nextSpawnInterval = 1000;
        this.types = ['CACTUS_SMALL', 'CACTUS_LARGE', 'BIRD'];
        this.image = new Image();
        this.image.src = 'assets/cactus.png';
    }

    reset() {
        this.obstacles = [];
        this.timer = 0;
    }

    update(deltaTime) {
        // Spawning
        if (this.timer > this.nextSpawnInterval) {
            this.spawn();
            this.timer = 0;
            // Randomize next spawn, but faster as game speeds up
            this.nextSpawnInterval = Math.random() * 1000 + 500 + (10000 / this.game.gameSpeed);
        } else {
            this.timer += deltaTime;
        }

        // Move & Prune
        this.obstacles.forEach(obs => {
            obs.update(this.game.gameSpeed, deltaTime);
        });

        this.obstacles = this.obstacles.filter(obs => !obs.markedForDeletion);
    }

    draw(ctx) {
        this.obstacles.forEach(obs => obs.draw(ctx));
    }

    spawn() {
        const type = this.types[Math.floor(Math.random() * this.types.length)];
        // Logic to determine spawn Y and size based on type
        // For now, let's keep it simple

        let width = 20;
        let height = 40;
        let y = this.game.height - 20 - height; // Ground level

        if (type === 'CACTUS_LARGE') {
            width = 30;
            height = 60;
            y = this.game.height - 20 - height;
        }
        // else if (type === 'BIRD') { // To be added later
        //     width = 40;
        //     height = 30;
        //     y = this.game.height - 100; // In the air
        // }

        this.obstacles.push(new Obstacle(this.game, this.game.width, y, width, height, type, this.image));
    }
}

class Obstacle {
    constructor(game, x, y, width, height, type, image) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.image = image;
        this.markedForDeletion = false;
        this.color = '#535353';
    }

    update(speed, deltaTime) {
        this.x -= speed;
        if (this.x < -this.width) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
