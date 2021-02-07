const synth = window.speechSynthesis;

export function getSpeechSynthesisUtterance(text: string): SpeechSynthesisUtterance {
  return new SpeechSynthesisUtterance(text);
}
/**
 * Uses webkit speech recognition.
 *
 * @param lang Language definition
 */
function textToSpeech(lang: string): (text: string) => void {
  return (text: string) => {
    const utterThis = getSpeechSynthesisUtterance(text);
    utterThis.lang = lang;
    synth.speak(utterThis);
  };
}

export default textToSpeech;
