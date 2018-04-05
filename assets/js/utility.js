/**
 * A file containing small utility functions for use across the site
 */
(function() {
  if ('util' in window) console.error('WARNING: There is now a pre-existing property on `window` called `util`. Change your helper fn object!');
  window.util = {};

  /**
   * Ensures a function is only called after `time` milliseconds after the last invocation
   * @param {Function} fn   the function to be debounced
   * @param {Number}   time the amount of time in milliseconds to wait after invoking the debounced function before invoking `fn`
   */
  window.util.debounce = (fn, time) => {
    let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        fn(...args);
      }, time);
    };
  };

  /**
   * Converts a decimal number to hexadecimal
   * @param  {Number} num        The number to be converted to hexadecimal
   * @param  {Number} digitCount Optional. The maximum number of hex digits to include. Defaults to 4
   * @return {String}            Hexadecimal string
   */
  window.util.decToHex = (num, digitCount = 4) => (Number(num) + 0x10000)
    .toString(16)
    .substr(digitCount * -1)
    .toUpperCase();

  /**
   * Determines whether a number is even
   * @param  {Number} num The number to check for being even
   * @return {Boolean}    Whether the number is even
   */
  window.util.isEven = (num) => {
    return num % 2 === 0;
  };

  /**
   * Determines whether a number is odd
   * @param  {Number} num The number to check for being odd
   * @return {Boolean}    Whether the number is odd
   */
  window.util.isOdd = (num) => {
    return num % 2 !== 0;
  };

  /**
   * Returns a random integer within a range
   * @param  {Number} min minimum random number to return
   * @param  {Number} max maximum number to return
   * @return {Number}     random number within the range provided
   */
  window.util.random = (min = 0, max = 1) => {
    return min + Math.floor(Math.random() * (max - min));
  };

  function* rangeHelper(start, end) {
    let i = start;
    while (i <= end) yield i++;
  }
  /**
   * Generates a range of all numbers from `first` to `last` inclusive
   * @param  {Number} first Number at which the range starts
   * @param  {Number} last  Number at which the range ends
   * @return {Array}        Range of all numbers in the range specified
   */
  window.util.range = (first, last) => {
    return [ ...rangeHelper(first, last) ];
  };

  /**
   * Provides a smooth scroll to the top of the page
   */
  window.util.scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo(0,0);
    } else {
      while (document.body.scrollTop !== 0 && document.documentElement.scrollTop !== 0) {
        scrollBy(0,-50);
      }
    }
  };

  /**
   * Returns the string passed as a param with the first letter of
   * each word in the string capitalized
   * @param  {String} str String to be converted to title case
   * @return {String}     String in title case
   */
  window.util.titleCase = (str) => {
    return str
      .split(/\s+/)
      .map(word => word.replace(/^./, word[0].toUpperCase()))
      .join(' ');
  };
}());