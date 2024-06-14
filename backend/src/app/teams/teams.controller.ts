import { Controller, Get, Param } from '@nestjs/common';

import type { TeamDTO, TeamListDTO } from 'api-interfaces';

import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getAll(): Promise<TeamListDTO> {
    const data = await this.teamsService.findAll();
    return { data };
  }

  @Get(':id')
  async getOne(@Param() params: { id: string }): Promise<TeamDTO> {
    return this.teamsService.findOne(params.id);
  }
}
