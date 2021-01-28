declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
    webkitSpeechGrammarList: unknown;
  }
}

const { webkitSpeechRecognition, webkitSpeechGrammarList }: Window = window as Window;

const SR = SpeechRecognition || webkitSpeechRecognition;
const SG = SpeechGrammarList || webkitSpeechGrammarList;

const recognition = new SR();

function TextToSpeech(computerWord: string): void {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(computerWord);
  synth.speak(utterThis);
}

function SpeechToText(lang: string, gr: [string] | [] = []): () => void {
  const grammar = `#JSGF V1.0; grammar words; public <color> = ${gr.join(' | ')} ;`;

  const speechRecognitionList = new SG();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
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
