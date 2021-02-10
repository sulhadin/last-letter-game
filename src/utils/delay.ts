import randomize from './randomize';

/**
 * Prepare a setTimeout function with random or static ms.
 *
 * If ms is array, that array should has start-end values. Random value will be calculated based on start-end values
 * and use that random value as ms itself inside 'setTimeout'
 *
 * @param {function} callback - A callback function to be run in 'setTimeout'.
 * @param {number|[number,number]} ms Either can be range or number.
 * @return {void}
 * @see [Randomize]{@link randomize}
 */
function delay(callback: () => void, ms: number | [number, number]): void {
  let time;

  if (Array.isArray(ms)) {
    const [start, end] = ms;
    time = randomize(start, end);
  } else {
    time = ms;
  }

  setTimeout(callback, time);
}

export default delay;
