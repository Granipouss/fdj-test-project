import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player } from './player.schema';

@Injectable()
export class AppService {
  constructor(
    //
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async getData() {
    const players = await this.playerModel.find();
    return { data: players };
  }
}
