const synth = window.speechSynthesis;

export function getSpeechSynthesisUtterance(text: string): SpeechSynthesisUtterance {
  return new SpeechSynthesisUtterance(text);
}
/**
 * Uses {@link window.speechSynthesis} and  {@link SpeechSynthesisUtterance} to utter a given word.
 *
 * @param {string} lang - Language definition
 * @return {function} - Returns function that asks for a text to utter.
 */
function textToSpeech(lang: string): (text: string) => void {
  return (text: string) => {
    const utterThis = getSpeechSynthesisUtterance(text);
    utterThis.lang = lang;
    synth.speak(utterThis);
  };
}

export default textToSpeech;
