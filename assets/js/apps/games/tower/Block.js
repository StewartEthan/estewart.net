export class Block {
  constructor(w, h, x, y, dx = 1, dy = 0) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}