(function() {
  const canvas = document.querySelector('#game-el');
  const ctx = canvas.getContext('2d');

  function main() {
    ctx.fillStyle = 'aquamarine';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    // requestAnimationFrame(main);
  }

  document.dispatchEvent(new CustomEvent('es-game-loaded'));
  requestAnimationFrame(main);
}());