import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

import type { TeamDetailsDTO } from 'api-interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent {
  constructor(
    //
    private readonly route: ActivatedRoute,
  ) {}

  @HostBinding('class')
  readonly hostClassName = 'container is-max-desktop';

  team$: Observable<TeamDetailsDTO> = this.route.data.pipe(
    map((data) => data['team']),
  );
}
