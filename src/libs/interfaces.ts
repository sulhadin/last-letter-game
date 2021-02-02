export interface IResult {
  response: string;
  found: boolean;
}

export interface IPayload {
  letters: string;
  spoken?: string[];
}

export interface IInput {
  onNewWord(value?: string): void;
  placeholder: string;
  disabled?: boolean;
}
