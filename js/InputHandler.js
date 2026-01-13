export class InputHandler {
    constructor() {
        this.keys = {
            jump: false,
            duck: false
        };

        window.addEventListener('keydown', (e) => {
            if ((e.code === 'Space' || e.code === 'ArrowUp') && !this.keys.jump) {
                this.keys.jump = true;
            }
            if (e.code === 'ArrowDown') {
                this.keys.duck = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.keys.jump = false;
            }
            if (e.code === 'ArrowDown') {
                this.keys.duck = false;
            }
        });

        // Touch support for mobile basics
        window.addEventListener('touchstart', () => {
            this.keys.jump = true;
        });
        window.addEventListener('touchend', () => {
            this.keys.jump = false;
        });
    }
}
