import { InputHandler } from './InputHandler.js';
import { Player } from './Player.js';
import { Background } from './Background.js';
import { ObstacleManager } from './ObstacleManager.js';
import { Particle } from './Particle.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = 800; // Internal resolution
        this.height = this.canvas.height = 300;

        // Handle High DPI scaling
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.input = new InputHandler();
        this.player = new Player(this);
        this.background = new Background(this);
        this.obstacleManager = new ObstacleManager(this);
        this.particles = [];

        this.gameSpeed = 10;
        this.score = 0;
        this.isPlaying = false;
        this.gameOver = false;

        this.lastTime = 0;
        this.animationId = null;

        // UI Elements
        this.uiScore = document.getElementById('score-display');
        this.uiStart = document.getElementById('start-screen');
        this.uiGameOver = document.getElementById('game-over-screen');
        this.uiFinalScore = document.getElementById('final-score');
        this.restartBtn = document.getElementById('restart-btn');

        this.initListeners();
        this.drawInitialScreen();
    }

    initListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isPlaying && !this.gameOver) {
                this.start();
            }
        });

        this.restartBtn.addEventListener('click', () => {
            if (this.gameOver) {
                this.reset();
                this.start();
            }
        });
    }

    start() {
        this.isPlaying = true;
        this.uiStart.classList.add('hidden');
        this.uiStart.classList.remove('active');
        this.lastTime = 0;
        this.loop(0);
    }

    reset() {
        this.gameOver = false;
        this.score = 0;
        this.gameSpeed = 6;
        this.player.reset();
        this.background.reset();
        this.obstacleManager.reset();
        this.particles = [];
        this.uiGameOver.classList.add('hidden');
        this.uiGameOver.classList.remove('active');
        this.uiScore.textContent = '00000';
    }

    endGame() {
        this.gameOver = true;
        this.isPlaying = false;
        cancelAnimationFrame(this.animationId);
        this.uiGameOver.classList.remove('hidden');
        this.uiGameOver.classList.add('active');
        this.uiFinalScore.textContent = `Score: ${Math.floor(this.score)}`;
    }

    resize() {
        // Simple distinct scaling for now, can be made responsive
        const rect = this.canvas.getBoundingClientRect();
        // We stick to internal logic size 800x300, visual size handled by CSS
    }

    checkCollision() {
        const player = this.player;
        const obstacles = this.obstacleManager.obstacles;

        // Simple AABB Collision
        obstacles.forEach(obs => {
            // Buffer to make hitboxes slightly forgiving
            const buffer = 10;
            if (
                player.x < obs.x + obs.width - buffer &&
                player.x + player.width > obs.x + buffer &&
                player.y < obs.y + obs.height - buffer &&
                player.y + player.height > obs.y + buffer
            ) {
                this.endGame();
            }
        });
    }

    update(deltaTime) {
        if (!this.isPlaying) return;

        this.gameSpeed += 0.001; // Slowly increase speed
        this.score += 0.01 * this.gameSpeed;
        this.uiScore.textContent = Math.floor(this.score).toString().padStart(5, '0');

        this.background.update();
        this.player.update(this.input, deltaTime);
        this.obstacleManager.update(deltaTime);

        // Handle Particles
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.markedForDeletion) this.particles.splice(index, 1);
        });

        this.checkCollision();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.background.draw(this.ctx);
        this.player.draw(this.ctx);
        this.obstacleManager.draw(this.ctx);
        this.particles.forEach(particle => particle.draw(this.ctx));
    }

    loop(timestamp) {
        if (!this.isPlaying) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        this.animationId = requestAnimationFrame(this.loop.bind(this));
    }

    drawInitialScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.background.draw(this.ctx);
    }
}
