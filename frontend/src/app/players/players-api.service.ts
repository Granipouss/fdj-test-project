import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { PlayerDTO, PlayerListDTO } from 'api-interfaces';

@Injectable()
export class PlayersApiService {
  constructor(private readonly http: HttpClient) {}

  getPlayers() {
    return this.http.get<PlayerListDTO>(`/api/players`);
  }

  getPlayerById(id: string) {
    return this.http.get<PlayerDTO>(`/api/players/${id}`);
  }
}
