import { Controller, Get, Param } from '@nestjs/common';

import type { PlayerDTO, PlayerListDTO } from 'api-interfaces';

import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAll(): Promise<PlayerListDTO> {
    const data = await this.playersService.findAll();
    return { data };
  }

  @Get(':id')
  async getOne(@Param() params: { id: string }): Promise<PlayerDTO> {
    return this.playersService.findOne(params.id);
  }
}
