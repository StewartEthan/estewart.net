(function() {
  const canvas = document.querySelector('#game-el');

  function getCanvasSize() {
    return Math.min(window.innerHeight, window.innerWidth);
  }

  function handleResize(e) {
    const size = getCanvasSize() * .85;
    canvas.width = canvas.height = size;
  }

  window.addEventListener('resize', window.util.debounce(handleResize, 150));
  handleResize();
}());