import { fillRect } from '../common/shapes.js';

export class Block {
  constructor(w, h, x, y, dx = 1, dy = 0) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx) {
    const { x, y, width: w, height: h } = this;
    const style = 'cadetblue';
    fillRect(ctx, { x,y, w,h, style });
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}