/**
 * Draw a filled rectangle with the given color.
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} color 
 */
export function fillRect(ctx, x, y, width, height, color)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}

/**
 * Draw text into the canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {string} text 
 * @param {string} baseline
 * @param {string} align
 * @param {number} fontSize in px
 */
export function fillText(ctx, x, y, text, baseline = 'top', align = 'center', fontSize = 12)
{
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = baseline;
    ctx.textAlign = align;
    ctx.strokeText(text, x, y);
}