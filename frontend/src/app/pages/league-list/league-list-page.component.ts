import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ReplaySubject,
  debounceTime,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { LeaguesApiService } from '../../leagues/leagues-api.service';
import { LeaguesModule } from '../../leagues/leagues.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    LeaguesModule,
  ],
  selector: 'app-league-list-page',
  templateUrl: './league-list-page.component.html',
  styleUrl: './league-list-page.component.scss',
})
export class LeagueListPageComponent implements OnDestroy {
  constructor(
    //
    private readonly leaguesApi: LeaguesApiService,
  ) {}

  @HostBinding('class')
  readonly hostClassName = 'container is-max-desktop';

  readonly searchControl = new FormControl('');

  readonly filteredSuggestions$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    map((value) => value?.trim().toLocaleLowerCase() ?? ''),
    switchMap((value) => this.leaguesApi.autocomplete(value)),
    map((dto) => dto.data),
    shareReplay(1),
  );

  readonly searchQuery$ = new ReplaySubject<string>(1);

  handleSearch() {
    const query = this.searchControl.value;
    if (!query) return;
    this.searchQuery$.next(query);
  }

  readonly leagues$ = this.searchQuery$.pipe(
    switchMap((query) =>
      this.leaguesApi.searchLeagues(query).pipe(
        map((dto) => dto.data),
        startWith(null),
      ),
    ),
    shareReplay(1),
  );

  readonly leaguesLoading$ = merge(
    this.searchQuery$.pipe(map(() => true)),
    this.leagues$.pipe(map(() => false)),
  ).pipe(startWith(false), shareReplay(1));

  ngOnDestroy(): void {
    this.searchQuery$.complete();
  }
}
