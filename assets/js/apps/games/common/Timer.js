// Taken from JS Mario tutorial on YouTube by MethMethMethod
export class Timer {
  constructor(delta = 1/60) {
    let accTime = 0;
    let lastTime = 0;

    this.updateProxy = time => {
      if (typeof this.update !== 'function') {
        console.error('TIMER CONSTRUCTOR: You must supply your Timer instance with an `update` method');
        this.stop();
        return;
      }
      accTime += (time - lastTime) / 1000;

      if (accTime > 1) accTime = 1;

      while (accTime > delta) {
        this.update(delta);
        accTime -= delta;
      }
      lastTime = time;

      this.enqueue();
    };
  }

  enqueue() {
    this.animId = requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }

  stop() {
    cancelAnimationFrame(this.animId);
  }
};