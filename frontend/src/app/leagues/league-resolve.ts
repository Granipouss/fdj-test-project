import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { LeagueDTO } from 'api-interfaces';

import { catchResolverError } from '../helpers/catchResolverError';
import { LeaguesApiService } from './leagues-api.service';

export const leagueResolver: ResolveFn<LeagueDTO> = (route) => {
  const leaguesService = inject(LeaguesApiService);
  return leaguesService
    .getLeagueById(route.params['leagueId'])
    .pipe(catchResolverError(inject(Router)));
};
