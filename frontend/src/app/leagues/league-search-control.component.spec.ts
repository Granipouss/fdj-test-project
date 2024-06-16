import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LeagueSearchControlComponent } from './league-search-control.component';
import { LeaguesModule } from './leagues.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        //
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [LeaguesModule],
    }).compileComponents();
  });

  it('should mount', () => {
    const fixture = TestBed.createComponent(LeagueSearchControlComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled).toBeTruthy();
  });
});
