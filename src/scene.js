import { Player } from "./solids.js";
import { isPlayerCollidesVertically, resolve, ResolveSolution, isPlayerCollidesHorizontally } from "./collisions.js";
import { fillText } from "./draw.js";

export class Scene 
{
    /**
     * @param {...Positionnable} elements 
     */
    constructor(...elements)
    {
        this.elements = elements;
        this.cameraPos = 0;
    }

    checkCollisions()
    {
        this.elements
            .filter(el => el instanceof Player)
            .forEach(player => {
                player.onGround = false;
                this.elements.forEach(el => {
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
        return this.elements.find(el => el instanceof Player);
    }


    render(ctx)
    {
        this.elements.forEach(el => el.draw(ctx, this.cameraPos));
    }

    addIndicator(ctx, text, x, y)
    {
        fillText(ctx, x, y, text, 'top', 'right');
    }

    updatePositions(elapsed)
    {
        this.elements
            .filter(el => el instanceof Player)
            .forEach(player => player.updatePosition(elapsed));
    }

    updateCameraPosition(screenWidth)
    {
        this.elements
            .filter(el => el instanceof Player)
            .forEach(player => {
                if (player.x - this.cameraPos > screenWidth - 150) {
                    this.cameraPos += player.x - this.cameraPos - screenWidth + 150;
                } else if (player.x - this.cameraPos < 30) {
                    this.cameraPos -= this.cameraPos - player.x + 30;
                }
            });
    }
}
