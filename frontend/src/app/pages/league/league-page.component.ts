import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import type { LeagueDetailsDTO } from 'api-interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'app-league-page',
  templateUrl: './league-page.component.html',
  styleUrl: './league-page.component.scss',
})
export class LeaguePageComponent {
  constructor(
    //
    private readonly route: ActivatedRoute,
    private readonly titleService: Title,
  ) {}

  @HostBinding('class')
  readonly hostClassName: string = 'container is-max-desktop';

  league$: Observable<LeagueDetailsDTO> = this.route.data.pipe(
    map((data) => data['league']),
    tap((league) => {
      this.titleService.setTitle(`Front Paris Sportifs - ${league.name}`);
    }),
  );
}
