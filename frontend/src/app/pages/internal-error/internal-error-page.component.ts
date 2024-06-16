import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-internal-error-page',
  templateUrl: './internal-error-page.component.html',
  styleUrl: './internal-error-page.component.scss',
})
export class InternalErrorPageComponent {}
