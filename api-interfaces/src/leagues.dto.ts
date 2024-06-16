import { ApiProperty } from '@nestjs/swagger';

import { TeamDTO } from './teams.dto';

export class LeagueDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sport!: string;
}

export class LeagueDetailsDTO extends LeagueDTO {
  @ApiProperty({ type: [TeamDTO] })
  teams!: TeamDTO[];
}

export class LeagueListDTO {
  @ApiProperty({ type: [LeagueDTO] })
  data!: LeagueDTO[];
}
