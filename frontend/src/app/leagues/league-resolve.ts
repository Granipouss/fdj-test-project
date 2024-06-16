import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { LeagueDTO } from 'api-interfaces';

import { LeaguesApiService } from './leagues-api.service';

export const leagueResolver: ResolveFn<LeagueDTO> = (route) => {
  const leaguesService = inject(LeaguesApiService);
  return leaguesService.getLeagueById(route.params['leagueId']);
};
