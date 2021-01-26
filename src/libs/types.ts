export type Word = {
  item: string;
  id: string;
};

export type Spoken = Word[];

export type Dialog = {
  Player: Spoken;
  Computer: Spoken;
};

// export type IPayload = {
//   charLength: number;
//   value: string;
//   computerFromStart: boolean;
//   playerFromStart: boolean;
//   probabilityPercent: number;
// };
