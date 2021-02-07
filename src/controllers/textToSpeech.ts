const synth = window.speechSynthesis;

export function getSpeechSynthesisUtterance(text: string): SpeechSynthesisUtterance {
  return new SpeechSynthesisUtterance(text);
}
/**
 * Uses webkit speech recognition.
 *
 * @param text Some text to be converted into speech.
 */
function textToSpeech(text: string): () => void {
  const utterThis = getSpeechSynthesisUtterance(text);
  return () => {
    synth.speak(utterThis);
  };
}

export default textToSpeech;
