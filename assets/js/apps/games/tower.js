import { Block } from './tower/Block.js';

(function() {
  const canvas = document.querySelector('#game-el');
  const ctx = canvas.getContext('2d');

  const block = new Block(
    200, 25,
    50, canvas.height - 50,
    2
  );

  function main() {
    ctx.fillStyle = 'aquamarine';
    ctx.fillRect(0,0, canvas.width,canvas.height);

    block.draw(ctx);
    block.update();

    requestAnimationFrame(main);
  }

  document.dispatchEvent(new CustomEvent('es-game-loaded'));
  requestAnimationFrame(main);
}());