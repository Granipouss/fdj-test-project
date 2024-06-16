import type { TeamDTO } from './teams.dto';

export type LeagueDTO = {
  id: string;
  name: string;
  sport: string;
};

export type LeagueDetailsDTO = LeagueDTO & {
  teams: TeamDTO[];
};

export type LeagueListDTO = {
  data: LeagueDTO[];
};
