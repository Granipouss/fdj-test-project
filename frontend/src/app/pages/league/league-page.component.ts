import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import type { LeagueDetailsDTO } from 'api-interfaces';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-league-page',
  templateUrl: './league-page.component.html',
  styleUrl: './league-page.component.scss',
})
export class LeaguePageComponent {
  constructor(
    //
    private readonly route: ActivatedRoute,
  ) {}

  @HostBinding('class')
  readonly hostClassName = 'container is-max-desktop';

  league$ = this.route.data.pipe(
    map((data) => data['league'] as LeagueDetailsDTO),
  );
}
