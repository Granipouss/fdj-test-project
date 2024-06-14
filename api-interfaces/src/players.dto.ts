import type { ObjectId } from 'mongoose';

export type PlayerDTO = {
  _id: ObjectId;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: string;
  };
  born: Date;
};

export type PlayerListDTO = {
  data: PlayerDTO[];
};
