import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import type {
  AutocompleteDTO,
  LeagueDetailsDTO,
  LeagueListDTO,
} from 'api-interfaces';

@Injectable()
export class LeaguesApiService {
  constructor(private readonly http: HttpClient) {}

  getLeagues() {
    return this.http.get<LeagueListDTO>(`/api/leagues`);
  }

  searchLeagues(query: string) {
    return this.http.get<LeagueListDTO>(`/api/leagues?q=${encodeURI(query)}`);
  }

  getLeagueById(id: string) {
    return this.http.get<LeagueDetailsDTO>(`/api/leagues/${id}`);
  }

  autocomplete(query: string) {
    // No need to send a request
    if (query.length < 3) return of({ data: [] });
    return this.http.get<AutocompleteDTO>(
      `/api/leagues/autocomplete?q=${encodeURI(query)}`,
    );
  }
}
