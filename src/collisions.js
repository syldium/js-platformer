import { Player, Platform } from "./solids.js";

export const ResolveSolution = {
    X: 1,
    Y: 2
}

/**
 * Check if the two objects collides.
 * 
 * @param {Positionnable} a 
 * @param {Positionnable} b 
 */
export function isCollides(a, b)
{
    const b1 = a.boundingBox();
    const b2 = b.boundingBox();

    return b1.x <= b2.x + b2.width &&
        b1.x + b1.width >= b2.x &&
        b1.y <= b2.y + b2.height &&
        b1.height + b1.y >= b2.y;
}

/**
 * Checks if the player collides with the platform vertically.
 * 
 * @param {Player} player 
 * @param {Platform} platform 
 */
export function isPlayerCollidesVertically(player, platform)
{
    if (player.x <= platform.x + platform.width &&
        player.x + player.width >= platform.x) {
        if (player.prevY + player.height <= platform.y && player.y + player.height >= platform.y) {
            return 1;
        }
        if (player.prevY >= platform.y + platform.height && player.y <= platform.y + platform.height) {
            return 2;
        }
    }
    return 0;
}

/**
 * Checks if the player collides with the platform horizontally.
 * 
 * @param {Player} player 
 * @param {Platform} platform 
 */
export function isPlayerCollidesHorizontally(player, platform)
{
    return player.y <= platform.y + platform.height &&
        player.y + player.height >= platform.y &&
        ((player.prevX + player.width <= platform.x && player.x + player.width >= platform.x) ||
        (player.prevX >= platform.x + platform.width && player.x <= platform.x + platform.width));
}

/**
 * Resolves the collision along the given axis by moving the movable object.
 * 
 * @param {Player} movable
 * @param {Positionnable} fixed
 * @param {number} direction
 */
export function resolve(movable, fixed, direction = ResolveSolution.X)
{
    if (direction === ResolveSolution.X) {
        const fixedCenter = fixed.x + fixed.width/2;
        if (movable.prevX + movable.width < fixedCenter) {
            movable.x -= movable.x + movable.width - fixed.x;
        } else {
            movable.x -= movable.x - fixed.x - fixed.width;
        }
    } else if (direction === ResolveSolution.Y) {
        const fixedCenter = fixed.y + fixed.height/2;
        if (movable.prevY + movable.height < fixedCenter) {
            movable.y = fixed.y - movable.height;
        } else {
            movable.y -= movable.y - fixed.y - fixed.height;
            movable.velY = -movable.velY * 0.01;
        }
    }
}
