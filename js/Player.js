import { Particle } from './Particle.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 44;
        this.height = 47;
        this.x = 50;
        this.y = this.game.height - this.height - 20; // 20px ground buffer
        this.groundY = this.game.height - this.height - 20;

        this.vy = 0;
        this.weight = 1.2;
        this.jumpPower = -17;

        // Placeholder simple graphics
        this.color = '#ff0055'; // Accent color dino
        this.image = new Image();
        this.image.src = 'assets/dino.png';
    }

    reset() {
        this.y = this.groundY;
        this.vy = 0;
    }

    update(input, deltaTime) {
        // Jump
        if (input.keys.jump && this.onGround()) {
            this.vy = this.jumpPower;
            for (let i = 0; i < 30; i++) {
                this.game.particles.push(new Particle(this.game, this.x + this.width / 2, this.y + this.height, '#e8eaed'));
            }
        }

        // Gravity
        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
            this.y = this.groundY;
        }

        // Duck (todo: change hit box)
    }

    draw(ctx) {
        // ctx.fillStyle = this.color;
        // Simple shape for now
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Fallback
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Debug eye
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 30, this.y + 10, 5, 5);
    }

    onGround() {
        return this.y >= this.groundY;
    }
}
