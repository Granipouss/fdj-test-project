import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  @HostBinding('class')
  readonly hostClassName = 'container is-max-desktop';
}
