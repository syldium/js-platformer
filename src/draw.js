/**
 * Draw a filled rectangle with the given color.
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} color 
 */
export function fillRect(ctx, x, y, width, height, color)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}