import { ApiProperty } from '@nestjs/swagger';

export class PlayerSigninDTO {
  @ApiProperty()
  amount!: number;

  @ApiProperty({ description: 'currency code' })
  currency!: string;
}

export class PlayerDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  position!: string;

  @ApiProperty()
  thumbnail!: string;

  @ApiProperty({ type: PlayerSigninDTO })
  signin!: PlayerSigninDTO;

  @ApiProperty({ description: 'Datetime ISO string' })
  born!: string;
}
