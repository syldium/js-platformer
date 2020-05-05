import { Positionnable, Player, Platform } from "./solids.js";
import { isPlayerCollidesVertically, resolve, ResolveSolution, isPlayerCollidesHorizontally } from "./collisions.js";
import { fillText } from "./draw.js";

export class Scene 
{
    /**
     * @param {number} spawnPoint
     * @param {...Chunk} chunks 
     */
    constructor({x, y}, ...chunks)
    {
        chunks[0].elements.push(new Player(x, y));
        this.chunks = chunks;
        this.cameraPos = 0;
    }

    checkCollisions()
    {
        this.chunks[0].elements
            .filter(el => el instanceof Player)
            .forEach(player => {
                player.onGround = false;
                this.chunks[0].elements.forEach(el => {
                    if (el !== player) {
                        const c = isPlayerCollidesVertically(player, el);
                        if (c) {
                            if (c === 1)
                                player.onGround = true;
                            resolve(player, el, ResolveSolution.Y);
                        }
                        else if (isPlayerCollidesHorizontally(player, el)) {
                            resolve(player, el, ResolveSolution.X);
                        }
                    }
                });
            });
    }

    /**
     * @return {Player}
     */
    player()
    {
        return this.chunks[0].elements.find(el => el instanceof Player);
    }

    render(ctx)
    {
        this.chunks[0].elements.forEach(el => { el.draw(ctx, this.cameraPos)});
    }

    addIndicator(ctx, text, x, y)
    {
        fillText(ctx, x, y, text, 'top', 'right');
    }

    updatePositions(elapsed)
    {
        this.chunks[0].elements
            .filter(el => el instanceof Player)
            .forEach(player => player.updatePosition(elapsed));
    }

    updateCameraPosition(screenWidth)
    {
        this.chunks[0].elements
            .filter(el => el instanceof Player)
            .forEach(player => {
                if (player.x - this.cameraPos > screenWidth - 150) {
                    this.cameraPos += player.x - this.cameraPos - screenWidth + 150;
                } else if (player.x - this.cameraPos < 30) {
                    this.cameraPos -= this.cameraPos - player.x + 30;
                }
            });
    }

    /**
     * @param {Chunk} chunk
     */
    addChunk(chunk)
    {
        this.chunks.push(chunk);
    }
}

export class Chunk
{
    /**
     * @param {number} id
     * @param {object} data
     */
    constructor(id, data)
    {
        this.id = id;
        /** @var Platform[] */
        this.elements = data.map(el => new Platform(el.x, el.y, el.width, 25));
        this.start = Math.min(...this.elements.map(p => p.x));
        this.end = Math.max(...this.elements.map(p => p.x + p.width));
    }

    /**
     * @param {Positionnable} el 
     */
    add(el)
    {
        this.elements.push(el);
    }
}