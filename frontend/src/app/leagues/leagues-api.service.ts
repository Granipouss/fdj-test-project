import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import type {
  AutocompleteDTO,
  LeagueDetailsDTO,
  LeagueListDTO,
} from 'api-interfaces';

@Injectable()
export class LeaguesApiService {
  constructor(private readonly http: HttpClient) {}

  searchLeagues(query: string): Observable<LeagueListDTO> {
    return this.http.get<LeagueListDTO>(`/api/leagues?q=${encodeURI(query)}`);
  }

  getLeagueById(id: string): Observable<LeagueDetailsDTO> {
    return this.http.get<LeagueDetailsDTO>(`/api/leagues/${id}`);
  }

  autocomplete(query: string): Observable<AutocompleteDTO> {
    // No need to send a request
    if (query.length < 3) return of({ data: [] });
    return this.http.get<AutocompleteDTO>(
      `/api/leagues/autocomplete?q=${encodeURI(query)}`,
    );
  }
}
