import { Controller, Get, Param, Query } from '@nestjs/common';

import type { AutocompleteDTO, LeagueDTO, LeagueListDTO } from 'api-interfaces';

import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  async getAll(@Query('q') query?: string): Promise<LeagueListDTO> {
    const data = await this.leaguesService.findAll({ name: query });
    return { data };
  }

  @Get('autocomplete')
  async getAutocomplete(@Query('q') query?: string): Promise<AutocompleteDTO> {
    if (!query || query.length < 3) return { options: [] };
    const leagues = await this.leaguesService.findAll({ name: '^' + query });

    return {
      options: leagues
        .slice(0, 5)
        .map((league) => ({ id: league._id, name: league.name })),
    };
  }

  @Get(':id')
  async getOne(@Param() params: { id: string }): Promise<LeagueDTO> {
    return this.leaguesService.findById(params.id);
  }
}
