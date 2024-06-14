import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { Player } from './player.schema';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  findAll() {
    return this.playerModel.find().exec();
  }

  findOne(id: string) {
    return this.playerModel.findOne({ _id: id }).exec();
  }
}
