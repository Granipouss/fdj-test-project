import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { TeamDTO, TeamListDTO } from 'api-interfaces';

@Injectable()
export class TeamsApiService {
  constructor(private readonly http: HttpClient) {}

  getTeams() {
    return this.http.get<TeamListDTO>(`/api/teams`);
  }

  getTeamById(id: string) {
    return this.http.get<TeamDTO>(`/api/teams/${id}`);
  }
}
