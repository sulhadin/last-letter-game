export type TPreferences = {
  charLength: number;
  letterFromEnd: boolean; // Also can get letters from beginning to make the game more interesting.
  probabilityPercent: number;
  restricted: boolean;
  inputType: 'TEXT' | 'VOICE';
};
