import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Cache } from 'cache-manager';

import {
  AutocompleteDTO,
  LeagueDTO,
  LeagueDetailsDTO,
  LeagueListDTO,
} from 'api-interfaces';

import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(
    private readonly leaguesService: LeaguesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiResponse({
    status: 200,
    description: [
      'Return a list of leagues.',
      'The list can be filtered with the query parameters if given.',
    ].join('\n\n'),
    type: LeagueListDTO,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'The string to search in the league names.',
  })
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

  @ApiResponse({
    status: 200,
    description: [
      'Return a list of up to 5 league names with the given prefix.',
      'This method is designed for creating assistive UI elements that allow users to free-type league names.',
      'If `q` has a length less than 3, it will return an empty line.',
    ].join('\n\n'),
    type: AutocompleteDTO,
  })
  @ApiQuery({
    name: 'q',
    description: 'The string to autocomplete',
  })
  @Get('autocomplete')
  async getAutocomplete(@Query('q') query?: string): Promise<AutocompleteDTO> {
    if (!query || query.length < 3) return { data: [] };
    const cacheKey = `league_autocomplete_${query}`;
    const valueFromCache = await this.cacheManager.get<string[]>(cacheKey);
    if (valueFromCache) return { data: valueFromCache };
    const leagues = await this.leaguesService.findAll({ name: '^' + query });
    const data = leagues.slice(0, 5).map((league) => league.name);
    await this.cacheManager.set(cacheKey, data);
    return { data };
  }

  @ApiResponse({
    status: 200,
    description: 'Return one league details for the given id.',
    type: LeagueDetailsDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the league',
  })
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
