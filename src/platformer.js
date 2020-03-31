import { Scene } from "./scene.js";
import { Player, Platform } from "./solids.js";

export class Platformer
{
    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas)
    {
        this.height = canvas.height;
        this.width = canvas.width;
        this.ctx = canvas.getContext('2d');

        this.scene = new Scene(new Player(40, 0), new Platform(0, 275, 300, 25), new Platform(350, 200, 100, 25), new Platform(400, 275, 400, 25), new Platform(700, 120, 300, 25), new Platform(850, 275, 200, 25), new Platform(1000, 200, 100, 25));
        this.player = this.scene.player();
        this.timestamp = 0;

        this.addListeners(canvas);
    }

    addListeners()
    {
        document.addEventListener('keydown', (e) => {
            if (e.code == 'ArrowRight') {
                this.player.rightKeyDown = true;
            } else if (e.code == 'ArrowLeft') {
                this.player.leftKeyDown = true;
            }
            if (e.code == 'Space') {
                this.player.jump();
            }
        }, false);
        document.addEventListener('keyup', (e) => {
            if (e.code == 'ArrowRight') {
                this.player.rightKeyDown = false;
            }
            if (e.code == 'ArrowLeft') {
                this.player.leftKeyDown = false;
            }
        }, false);
    }

    /**
     * Tick game elements and render scene.
     * 
     * @param {number} timestamp since page load (in ms)
     */
    tick(timestamp = 0)
    {
        this.scene.updatePositions((timestamp - this.timestamp) / 1000);
        this.scene.checkCollisions();
        this.scene.updateCameraPosition(this.width);

        if (this.player.y > this.height) {
            this.player.x = 40;
            this.player.y = 0;
            this.player.velX = 0;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.scene.render(this.ctx);
        this.scene.addIndicator(this.ctx, (timestamp / 1000).toFixed(1), this.width - 10, 10);
        this.timestamp = timestamp;
        requestAnimationFrame(this.tick.bind(this));
    }
}