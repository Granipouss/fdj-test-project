import { PlayerDTO } from './players.dto';

export type TeamDTO = {
  id: string;
  name: string;
  thumbnail: string;
};

export type TeamDetailsDTO = TeamDTO & {
  players: PlayerDTO[];
};
