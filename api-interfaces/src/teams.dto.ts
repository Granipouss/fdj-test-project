import { ApiProperty } from '@nestjs/swagger';

import { PlayerDTO } from './players.dto';

export class TeamDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  thumbnail!: string;
}

export class TeamDetailsDTO extends TeamDTO {
  @ApiProperty({ type: [PlayerDTO] })
  players!: PlayerDTO[];
}
