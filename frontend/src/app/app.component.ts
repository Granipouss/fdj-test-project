import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { NxWelcomeComponent } from './nx-welcome.component';
import { PlayersApiService } from './players/players-api.service';
import { PlayersModule } from './players/players.module';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule, PlayersModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    //
    private readonly playersApi: PlayersApiService,
  ) {}

  title = 'frontend';

  readonly players$ = this.playersApi.getPlayers().pipe(map((res) => res.data));
}
