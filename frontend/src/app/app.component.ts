import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import type { PlayerListDTO } from 'api-interfaces';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    //
    private readonly http: HttpClient,
  ) {}

  title = 'frontend';

  readonly players$ = this.http
    .get<PlayerListDTO>(`/api`)
    .pipe(map((res) => res.data));
}
