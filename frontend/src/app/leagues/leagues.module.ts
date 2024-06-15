import { NgModule } from '@angular/core';

import { LeaguesApiService } from './leagues-api.service';

@NgModule({
  providers: [LeaguesApiService],
})
export class LeaguesModule {}
