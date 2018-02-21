export function drawRect(ctx, opts) {
  const { x,y, w,h, style } = opts;
  if (style) ctx.strokeStyle = style;
  ctx.strokeRect(x,y, w,h);
}

export function fillRect(ctx, opts) {
  const { x,y, w,h, style } = opts;
  if (style) ctx.fillStyle = style;
  ctx.fillRect(x,y, w,h);
}