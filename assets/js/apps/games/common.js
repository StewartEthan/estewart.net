(function() {
  const canvas = document.querySelector('#game-el');
  const spinner = document.querySelector('.game-loading-spinner');

  function getCanvasSize() {
    return Math.min(window.innerHeight, window.innerWidth);
  }

  function handleResize(evt) {
    const size = getCanvasSize() * .85;
    canvas.width = canvas.height = size;
  }

  document.addEventListener('es-game-loaded', evt => {
    handleResize();
    spinner.classList.add('hide');
    canvas.classList.remove('hide');
  });
  window.addEventListener('resize', window.util.debounce(handleResize, 150));
}());