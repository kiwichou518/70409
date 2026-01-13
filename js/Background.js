export class Background {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.layer1Speed = 0.2; // Far background
        this.layer2Speed = 1;   // Ground
        this.x1 = 0;
        this.x2 = 0;
    }

    reset() {
        this.x1 = 0;
        this.x2 = 0;
    }

    update() {
        // Simple repeating background logic
        this.x1 -= this.game.gameSpeed * 0.1;
        if (this.x1 <= -this.width) this.x1 = 0;

        this.x2 -= this.game.gameSpeed;
        if (this.x2 <= -this.width) this.x2 = 0;
    }

    draw(ctx) {
        // Draw sky
        // ctx.fillStyle = '#202124'; // Handled by CSS

        // Draw Ground (Placeholder Line)
        ctx.strokeStyle = '#535353';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Ground is at height - 20
        let groundY = this.height - 20;
        ctx.moveTo(this.x2, groundY);
        ctx.lineTo(this.x2 + this.width, groundY);
        // Second segment for loop
        ctx.moveTo(this.x2 + this.width, groundY);
        ctx.lineTo(this.x2 + this.width * 2, groundY);
        ctx.stroke();

        // Add some random details for "Ground speed" visuals
        ctx.fillStyle = '#333';
        // Just small dots to show motion
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(this.x2 + (i * 100), groundY + 5, 4, 4);
            ctx.fillRect(this.x2 + this.width + (i * 100), groundY + 5, 4, 4);
        }
    }
}
