declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

let { SpeechRecognition } = window as Window;
const { webkitSpeechRecognition } = window as Window;

SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SpeechRecognition();

function TextToSpeech(computerWord: string): void {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(computerWord);
  synth.speak(utterThis);
}

function SpeechToText(lang: string): () => void {
  // , gr: [string] | [] = []
  // const grammar = `#JSGF V1.0; grammar words; public <color> = ${gr.join(' | ')} ;`;

  // const speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return () => {
    recognition.start();
  };
}

recognition.onresult = (event: SpeechRecognitionEvent) => {
  document.dispatchEvent(
    new CustomEvent('speechEvent', {
      detail: { result: event.results[0][0].transcript },
    }),
  );
};

recognition.onspeechend = () => {
  recognition.stop();
};

recognition.onerror = () => {
  recognition.stop();
};

export { TextToSpeech, SpeechToText };
