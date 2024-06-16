import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  debounceTime,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { LeagueDTO } from 'api-interfaces';

import { LeaguesApiService } from '../../leagues/leagues-api.service';
import { LeaguesModule } from '../../leagues/leagues.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    LeaguesModule,
  ],
  selector: 'app-league-list-page',
  templateUrl: './league-list-page.component.html',
  styleUrl: './league-list-page.component.scss',
})
export class LeagueListPageComponent implements OnInit, OnDestroy {
  constructor(
    //
    private readonly leaguesApi: LeaguesApiService,
  ) {}

  searchControl = new FormControl('');
  filteredSuggestions$: Observable<string[]> = EMPTY;

  searchQuery$ = new ReplaySubject<string>(1);

  leagues$: Observable<LeagueDTO[] | null> = EMPTY;
  leaguesLoading$: Observable<boolean> = EMPTY;

  ngOnInit() {
    this.filteredSuggestions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => value?.trim().toLocaleLowerCase() ?? ''),
      switchMap((value) => this.leaguesApi.autocomplete(value)),
      map((dto) => dto.data),
      shareReplay(1),
    );

    this.leagues$ = this.searchQuery$.pipe(
      switchMap((query) =>
        this.leaguesApi.searchLeagues(query).pipe(
          map((dto) => dto.data),
          startWith(null),
        ),
      ),
      shareReplay(1),
    );

    this.leaguesLoading$ = merge(
      this.searchQuery$.pipe(map(() => true)),
      this.leagues$.pipe(map(() => false)),
    ).pipe(startWith(false), shareReplay(1));
  }

  ngOnDestroy(): void {
    this.searchQuery$.complete();
  }

  handleSearch() {
    const query = this.searchControl.value;
    if (!query) return;
    this.searchQuery$.next(query);
  }
}
