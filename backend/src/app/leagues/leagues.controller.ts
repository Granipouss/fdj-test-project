import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

import type {
  AutocompleteDTO,
  LeagueDTO,
  LeagueDetailsDTO,
  LeagueListDTO,
} from 'api-interfaces';

import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  async getAll(@Query('q') query?: string): Promise<LeagueListDTO> {
    const leagues = await this.leaguesService.findAll({ name: query });
    const data = leagues.map(
      (league): LeagueDTO => ({
        id: league.id,
        name: league.name,
        sport: league.sport,
      }),
    );
    return { data };
  }

  @Get('autocomplete')
  async getAutocomplete(@Query('q') query?: string): Promise<AutocompleteDTO> {
    if (!query || query.length < 3) return { data: [] };
    const leagues = await this.leaguesService.findAll({ name: '^' + query });
    const data = leagues.slice(0, 5).map((league) => league.name);
    return { data };
  }

  @Get(':id')
  async getOne(@Param() params: { id: string }): Promise<LeagueDetailsDTO> {
    const league = await this.leaguesService.findById(params.id);
    if (!league) throw new NotFoundException();
    await league.populate('teams');
    return {
      id: league.id,
      name: league.name,
      sport: league.sport,
      teams: league.teams.map((team) => ({
        id: team.id,
        name: team.name,
        thumbnail: team.thumbnail,
      })),
    };
  }
}
