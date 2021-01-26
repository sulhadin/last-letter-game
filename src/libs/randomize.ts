/**
 * Always returns a random number between min (included) and max (included)
 * @param start
 * @param end
 */
const randomize = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export default randomize;
