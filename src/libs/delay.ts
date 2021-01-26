import randomize from './randomize';

/**
 * Prepare a setTimeout function with random or static ms.
 *
 * @param callback
 * @param ms Either can be range or number.
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
