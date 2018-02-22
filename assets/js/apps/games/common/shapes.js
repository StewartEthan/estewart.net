/**
 * Draw a rectangular outline
 * 
 * @param {CanvasRenderingContext2D} ctx The context to draw the rectangle on
 * @param {Object} opts The data indicating where and how to draw the rectangle on
 */
export function drawRect(ctx, opts) {
  const { x,y, w,h, style } = opts;
  if (style) ctx.strokeStyle = style;
  ctx.strokeRect(x,y, w,h);
}

/**
 * Draw a filled rectangle
 * 
 * @param {CanvasRenderingContext2D} ctx The context to draw the rectangle on
 * @param {Object} opts The data indicating where and how to draw the rectangle on
 */
export function fillRect(ctx, opts) {
  const { x,y, w,h, style } = opts;
  if (style) ctx.fillStyle = style;
  ctx.fillRect(x,y, w,h);
}