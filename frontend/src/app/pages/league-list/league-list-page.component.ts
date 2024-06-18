import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  ReplaySubject,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import type { LeagueDTO } from 'api-interfaces';

import { LeaguesApiService } from '../../leagues/leagues-api.service';
import { LeaguesModule } from '../../leagues/leagues.module';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LeaguesModule],
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

  readonly searchQuery$ = new ReplaySubject<string>(1);

  handleSearch(): void {
    const query = this.searchControl.value;
    if (!query) return;
    this.searchQuery$.next(query);
  }

  readonly leagues$: Observable<LeagueDTO[] | null> = this.searchQuery$.pipe(
    switchMap((query) =>
      this.leaguesApi.searchLeagues(query).pipe(
        map((dto) => dto.data),
        startWith(null),
      ),
    ),
    shareReplay(1),
  );

  readonly leaguesLoading$: Observable<boolean> = merge(
    this.searchQuery$.pipe(map(() => true)),
    this.leagues$.pipe(map(() => false)),
  ).pipe(startWith(false), shareReplay(1));

  ngOnDestroy(): void {
    this.searchQuery$.complete();
  }
}
