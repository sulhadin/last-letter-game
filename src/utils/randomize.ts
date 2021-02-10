/**
 * Always returns a random number between min (included) and max (included)
 *
 * @param {number} start - A number that determines the beginning point
 * @param {number} end - A number that determines the end point
 * @return {number} - Returns a random number between start-end range.
 */
const randomize = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export default randomize;
