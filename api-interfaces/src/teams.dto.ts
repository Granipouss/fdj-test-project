import type { ObjectId } from 'mongoose';

export type TeamDTO = {
  _id: ObjectId;
  name: string;
  thumbnail: string;
  players: ObjectId[];
};

export type TeamListDTO = {
  data: TeamDTO[];
};
