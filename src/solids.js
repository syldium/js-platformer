import { fillRect } from "./draw.js";
import { PLAYER_WALK_ACCELERATION, PLAYER_WALK_SPEED, PLAYER_JUMP_SPEED, FRICTION, GRAVITY } from "./constants.js";

export class Positionnable
{
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    boundingBox()
    {
        return {x: this.x, y: this.y, width: this.width, height: this.height};
    }
}

export class Player extends Positionnable
{
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y)
    {
        super(x, y, 20, 20);
        this.prevX = x;
        this.prevY = y;
        this.velX = 0;
        this.velY = 0;
        this.leftKeyDown = false;
        this.rightKeyDown = false;
    }

    canJump()
    {
        return this.onGround;
    }

    draw(ctx, cameraPos)
    {
        fillRect(ctx, this.x - cameraPos, this.y, this.width, this.height, 'red');
    }

    updatePosition(elapsed)
    {
        if (this.leftKeyDown) {
            this.velX = Math.max(this.velX - PLAYER_WALK_ACCELERATION * elapsed, -PLAYER_WALK_SPEED);
        }
        if (this.rightKeyDown) {
            this.velX = Math.min(this.velX + PLAYER_WALK_ACCELERATION * elapsed, PLAYER_WALK_SPEED);
        }

        this.prevX = this.x;
        this.x += this.velX * elapsed;

        this.prevY = this.y;
        this.y += this.velY * elapsed;

        if (this.onGround) {
            if (this.velX > 0) {
                this.velX -= FRICTION * elapsed;
                if(this.velX < 0) {
                    this.velX = 0;
                }
            } else if(this.velX < 0) {
                this.velX += FRICTION * elapsed;
    
                if(this.velX > 0)
                    this.velX = 0;
            }
        } else {
            this.velY += GRAVITY * elapsed;
        }
    }

    /**
     * Movements changes
     */
    jump(safe = true)
    {
        if (safe && !this.canJump()) return;
        this.velY = PLAYER_JUMP_SPEED;
        this.onGround = false;
    }
}

export class Platform extends Positionnable
{
    draw(ctx, cameraPos)
    {
        fillRect(ctx, this.x - cameraPos, this.y, this.width, this.height, 'green');
    }
}
