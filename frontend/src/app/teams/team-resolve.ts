import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import type { TeamDetailsDTO } from 'api-interfaces';

import { catchResolverError } from '../helpers/catchResolverError';
import { TeamsApiService } from './teams-api.service';

export const teamResolver: ResolveFn<TeamDetailsDTO> = (route) => {
  const teamsService = inject(TeamsApiService);
  return teamsService
    .getTeamById(route.params['teamId'])
    .pipe(catchResolverError());
};
