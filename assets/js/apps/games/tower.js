setTimeout(() => {
  document.dispatchEvent(new CustomEvent('es-game-loaded'));
}, 2000);

(function() {
  // const canvas = document.querySelector('#game-el');
  // const ctx = canvas.getContext('2d');

  // function main(time) {
  //   requestAnimationFrame(main);
  // }

  // requestAnimationFrame(main);
}());