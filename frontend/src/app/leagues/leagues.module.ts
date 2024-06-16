import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { LeagueSearchControlComponent } from './league-search-control.component';
import { LeaguesApiService } from './leagues-api.service';

@NgModule({
  providers: [LeaguesApiService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [LeagueSearchControlComponent],
  exports: [LeagueSearchControlComponent],
})
export class LeaguesModule {}
