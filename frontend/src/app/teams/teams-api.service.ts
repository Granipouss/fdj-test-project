import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { TeamDetailsDTO } from 'api-interfaces';

@Injectable()
export class TeamsApiService {
  constructor(private readonly http: HttpClient) {}

  getTeamById(id: string): Observable<TeamDetailsDTO> {
    return this.http.get<TeamDetailsDTO>(`/api/teams/${id}`);
  }
}
