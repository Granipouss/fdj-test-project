import { Route } from '@angular/router';

import { leagueResolver } from './leagues/league-resolve';
import { LeaguesApiService } from './leagues/leagues-api.service';
import { InternalErrorPageComponent } from './pages/internal-error/internal-error-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
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
    loadComponent: () =>
      import('./pages/league-list/league-list-page.component').then(
        (m) => m.LeagueListPageComponent,
      ),
    title: 'Front Paris Sportifs',
  },
  {
    path: 'leagues/:leagueId',
    loadComponent: () =>
      import('./pages/league/league-page.component').then(
        (m) => m.LeaguePageComponent,
      ),
    providers: [LeaguesApiService],
    resolve: {
      league: leagueResolver,
    },
  },
  {
    path: 'teams/:teamId',
    loadComponent: () =>
      import('./pages/team/team-page.component').then(
        (m) => m.TeamPageComponent,
      ),
    providers: [TeamsApiService],
    resolve: {
      team: teamResolver,
    },
  },
  {
    path: '500',
    component: InternalErrorPageComponent,
    title: 'Front Paris Sportifs - 500 Internal Error',
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent,
    title: 'Front Paris Sportifs - 404 Not Found',
  },
];
