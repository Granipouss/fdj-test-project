import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { LeaguesApiService } from './leagues-api.service';

@Component({
  selector: 'app-league-search-control',
  templateUrl: './league-search-control.component.html',
  styleUrl: './league-search-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeagueSearchControlComponent),
      multi: true,
    },
  ],
})
export class LeagueSearchControlComponent
  implements ControlValueAccessor, OnDestroy
{
  constructor(
    //
    private readonly leaguesApi: LeaguesApiService,
  ) {}

  @Input()
  placeholder = '';

  @ViewChild(DefaultValueAccessor, { static: true })
  private valueAccessor!: DefaultValueAccessor;

  writeValue(value: string): void {
    this.valueAccessor.writeValue(value);
  }

  registerOnChange(fn: (value: string) => object): void {
    this.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.valueAccessor.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.valueAccessor.setDisabledState(isDisabled);
  }

  readonly valueChanges = new Subject<string>();

  readonly filteredSuggestions$: Observable<string[]> = this.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    map((value) => value?.trim().toLocaleLowerCase() ?? ''),
    switchMap((value) => this.leaguesApi.autocomplete(value)),
    map((dto) => dto.data),
    shareReplay(1),
  );

  ngOnDestroy(): void {
    this.valueChanges.complete();
  }
}
