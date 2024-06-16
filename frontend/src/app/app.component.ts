import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { PlayersModule } from './players/players.module';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule, PlayersModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
