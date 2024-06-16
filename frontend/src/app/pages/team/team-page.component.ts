import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import type { TeamDetailsDTO } from 'api-interfaces';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent {
  constructor(
    //
    private readonly route: ActivatedRoute,
  ) {}

  team$ = this.route.data.pipe(map((data) => data['team'] as TeamDetailsDTO));
}
