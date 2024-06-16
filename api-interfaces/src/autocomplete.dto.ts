import { ApiProperty } from '@nestjs/swagger';

export class AutocompleteDTO {
  @ApiProperty({ type: [String] })
  data!: string[];
}
