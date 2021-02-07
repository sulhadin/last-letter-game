declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

let { SpeechRecognition } = window as Window;
const { webkitSpeechRecognition } = window as Window;

SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

interface ISpeechToTextResult {
  stop: () => void;
  start: () => void;
}

export function getSpeechRecognition(lang: string): SpeechRecognition {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.lang = lang;

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

  return recognition;
}

export default function SpeechToText(lang: string): ISpeechToTextResult {
  // I haven't used grammar implementation here since I did not need it.
  // Can be implemented in the future.

  //* ********************************
  // const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  // grammar: [string] | [] = []
  // const grammar = `#JSGF V1.0; grammar somethings; public <someTag> = ${grammar.join(' | ')} ;`;

  // const speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;
  //* ********************************
  const recognition = getSpeechRecognition(lang);

  return {
    stop: () => recognition.stop(),
    start: () => recognition.start(),
  };
}
