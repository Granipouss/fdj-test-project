import type { ObjectId } from 'mongoose';

export type LeagueDTO = {
  _id: ObjectId;
  name: string;
  sport: string;
  teams: ObjectId[];
};

export type LeagueListDTO = {
  data: LeagueDTO[];
};
