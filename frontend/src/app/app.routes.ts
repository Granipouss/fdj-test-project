import { Route } from '@angular/router';

import { leagueResolver } from './leagues/league-resolve';
import { LeaguesApiService } from './leagues/leagues-api.service';
import { LeagueListPageComponent } from './pages/league-list/league-list-page.component';
import { LeaguePageComponent } from './pages/league/league-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { TeamPageComponent } from './pages/team/team-page.component';
import { teamResolver } from './teams/team-resolve';
import { TeamsApiService } from './teams/teams-api.service';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/leagues',
  },
  {
    path: 'leagues',
    component: LeagueListPageComponent,
  },
  {
    path: 'leagues/:leagueId',
    component: LeaguePageComponent,
    providers: [LeaguesApiService],
    resolve: {
      league: leagueResolver,
    },
  },
  {
    path: 'teams/:teamId',
    component: TeamPageComponent,
    providers: [TeamsApiService],
    resolve: {
      team: teamResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
];
