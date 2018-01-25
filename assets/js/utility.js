/* eslint-disable no-unused-vars */
/* global clearTimeout setTimeout scrollBy */
/**
 * A file containing small utility functions for use across the site
 */


/**
 * Ensures a function is only called after `time` milliseconds after the last invocation
 * @param {Function} fn   the function to be debounced
 * @param {Number}   time the amount of time in milliseconds to wait after invoking the debounced function before invoking `fn`
 */
function debounce(fn, time) {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      fn(...args);
    }, time);
  };
}

/**
 * Returns a random integer within a range
 * @param  {Number} min minimum random number to return
 * @param  {Number} max maximum number to return
 * @return {Number}     random number within the range provided
 */
function random(min = 0, max = 1) {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 * Provides a smooth scroll to the top of the page
 */
function scrollToTop() {
  if (window.scrollTo) {
    window.scrollTo(0,0);
  } else {
    while (document.body.scrollTop != 0 && document.documentElement.scrollTop != 0) {
      scrollBy(0,-50);
    }
  }
}

/**
 * Returns the string passed as a param with the first letter of
 * each word in the string capitalized
 * @param  {String} str String to be converted to title case
 * @return {String}     String in title case
 */
function titleCase(str) {
  return str
    .split(/\s+/)
    .map(word => word.replace(/^./, word[0].toUpperCase()))
    .join(' ');
}