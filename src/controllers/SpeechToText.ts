const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();

function TextToSpeech(computerWord: string) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(computerWord);
  synth.speak(utterThis);
}

function SpeechToText(lang: string, gr: [string] | [] = []) {
  const grammar = `#JSGF V1.0; grammar words; public <color> = ${gr.join(' | ')} ;`;
  console.log(grammar);

  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  console.log('Ready to receive a color command.');

  return () => {
    recognition.start();
  };
}

recognition.onresult = function (event: SpeechRecognitionEvent) {
  document.dispatchEvent(
    new CustomEvent('speechEvent', {
      detail: { result: event.results[0][0].transcript },
    }),
  );
};

recognition.onspeechend = () => {
  recognition.stop();
};

recognition.onnomatch = (event: SpeechRecognitionEvent) => {
  console.log('onnomatch', event);
};

recognition.onerror = (event) => {
  console.log('onerror', event.error);
};

export { TextToSpeech, SpeechToText };
