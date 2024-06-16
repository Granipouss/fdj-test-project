import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { TeamDetailsDTO } from 'api-interfaces';

@Injectable()
export class TeamsApiService {
  constructor(private readonly http: HttpClient) {}

  getTeamById(id: string) {
    return this.http.get<TeamDetailsDTO>(`/api/teams/${id}`);
  }
}
