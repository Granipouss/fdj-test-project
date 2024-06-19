import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

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
    private readonly titleService: Title,
  ) {}

  @HostBinding('class')
  readonly hostClassName = 'container is-max-desktop';

  team$: Observable<TeamDetailsDTO> = this.route.data.pipe(
    map((data) => data['team']),
    tap((team) => {
      this.titleService.setTitle(`Front Paris Sportifs - ${team.name}`);
    }),
  );
}
