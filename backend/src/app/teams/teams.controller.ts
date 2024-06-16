import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { TeamDetailsDTO } from 'api-interfaces';

import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiResponse({
    status: 200,
    description: 'Return one team details for the given id.',
    type: TeamDetailsDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the team',
  })
  @Get(':id')
  async getOne(@Param() params: { id: string }): Promise<TeamDetailsDTO> {
    const team = await this.teamsService.findById(params.id);
    if (!team) throw new NotFoundException();
    await team.populate('players');
    return {
      id: team.id,
      name: team.name,
      thumbnail: team.thumbnail,
      players: team.players.map((player) => ({
        id: player.id,
        name: player.name,
        position: player.position,
        thumbnail: player.thumbnail,
        born: player.born.toISOString(),
        signin: {
          amount: player.signin.amount,
          currency: player.signin.currency,
        },
      })),
    };
  }
}
