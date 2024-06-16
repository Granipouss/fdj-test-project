import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { LeaguesModule } from './leagues/leagues.module';

export const appConfig: ApplicationConfig = {
  providers: [
    LeaguesModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
};
