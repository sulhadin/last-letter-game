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
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

interface ISpeechToTextResult {
  stop: () => void;
  start: () => void;
}

export default function SpeechToText(lang: string): ISpeechToTextResult {
  // , gr: [string] | [] = []
  // const grammar = `#JSGF V1.0; grammar words; public <color> = ${gr.join(' | ')} ;`;

  // const speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;

  recognition.lang = lang;

  return {
    stop: () => recognition.stop(),
    start: () => recognition.start(),
  };
}

recognition.onresult = (event: SpeechRecognitionEvent) => {
  document.dispatchEvent(
    new CustomEvent('speechResultEvent', {
      detail: { result: event.results[0][0].transcript },
    }),
  );
};

recognition.onspeechend = () => {
  recognition.stop();

  document.dispatchEvent(
    new CustomEvent('speechStopEvent', {
      detail: { result: 'stopped' },
    }),
  );
};

recognition.onerror = () => {
  recognition.stop();
  document.dispatchEvent(
    new CustomEvent('speechStopEvent', {
      detail: { result: 'stopped' },
    }),
  );
};
