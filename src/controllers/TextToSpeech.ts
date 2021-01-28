const synth = window.speechSynthesis;

function TextToSpeech(computerWord: string): () => void {
  const utterThis = new SpeechSynthesisUtterance(computerWord);
  return () => {
    synth.speak(utterThis);
  };
}

export default TextToSpeech;
