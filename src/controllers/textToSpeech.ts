const synth = window.speechSynthesis;

/**
 * Uses webkit speech recognition.
 *
 * @param text Some text to be converted into speech.
 */
function textToSpeech(text: string): () => void {
  const utterThis = new SpeechSynthesisUtterance(text);
  return () => {
    synth.speak(utterThis);
  };
}

export default textToSpeech;
