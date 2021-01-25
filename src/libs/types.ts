export type Data = {
  item: string;
};

export type Spoken = Data[];

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
