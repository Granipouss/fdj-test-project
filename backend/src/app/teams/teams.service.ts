import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { Team } from './team.schema';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  findAll() {
    return this.teamModel.find().exec();
  }

  findOne(id: string) {
    return this.teamModel.findOne({ _id: id }).exec();
  }
}
