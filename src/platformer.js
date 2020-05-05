import { Scene, Chunk } from "./scene.js";

export class Platformer
{
    /**
     * @param {HTMLElement} menu
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(menu, canvas)
    {
        this.menu = menu;
        this.canvas = canvas;
        this.height = canvas.height;
        this.width = canvas.width;
        this.ctx = canvas.getContext('2d');
        this.levels = [];

        this.timestamp = 0;
        this.start = 0;
        this.ingame = false;

        this.addListeners(canvas);
        this.bindLevels();
    }

    get player()
    {
        if (typeof this._player === 'undefined' && typeof this.scene !== 'undefined') {
            this._player = this.scene.player();
        }
        return this._player;
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
            if (e.code == 'Escape') {
                this.setInGame(false);
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
        if (!this.ingame) return;

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
        this.scene.addIndicator(this.ctx, ((timestamp - this.start) / 1000).toFixed(1), this.width - 10, 10);
        this.timestamp = timestamp;
        if (this.ingame)
            requestAnimationFrame(this.tick.bind(this));
    }

    /**
     * Make level menu clickable.
     */
    bindLevels()
    {
        document.querySelectorAll('.levels li').forEach(li => {
            const name = li.firstChild.getAttribute('href').substring(1);
            li.addEventListener('click', event => {
                event.preventDefault();
                this.loadLevel(`levels/${name}.json`).then(level => {
                    this.scene = level;
                    this.setInGame(true);
                });
            })
        });
    }

    /**
     * Load a level from a .json file. If the file is already fetched, the scene will not be recreated.
     * 
     * @param {string} levelname 
     * @returns {Promise<Scene>}
     */
    async loadLevel(levelname)
    {
        if (levelname in this.levels) {
            return new Promise((resolve) => resolve(this.levels[levelname]));
        }

        const map = await fetch(levelname).then(res => res.json());

        const chunks = map.chunks.map((chunk, id) => new Chunk(id, chunk));
        const scene = new Scene(map.spawnpoint, ...chunks);
        this.levels[levelname] = scene;
        return scene;
    }

    /**
     * @param {number} state 
     */
    setInGame(state)
    {
        if (state) {
            this.menu.classList.add('invisible');
            this.canvas.classList.remove('invisible');
            this.start = performance.now();
        } else {
            this.menu.classList.remove('invisible');
            this.canvas.classList.add('invisible');
        }
        this.ingame = state;
        this.tick();
    }
}