import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import type { TeamDetailsDTO } from 'api-interfaces';

import { TeamsApiService } from './teams-api.service';

export const teamResolver: ResolveFn<TeamDetailsDTO> = (route) => {
  console.log(route);

  const teamsService = inject(TeamsApiService);
  return teamsService.getTeamById(route.params['teamId']);
};
