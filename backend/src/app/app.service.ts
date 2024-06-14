import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player } from './player.schema';

import type { PlayerListDTO } from 'api-interfaces';

@Injectable()
export class AppService {
  constructor(
    //
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async getData(): Promise<PlayerListDTO> {
    const players = await this.playerModel.find();
    return { data: players.map((p) => p.toJSON()) };
  }
}
