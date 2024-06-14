import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

import type { LeagueDTO } from 'api-interfaces';

@Schema()
export class League implements LeagueDTO {
  @Prop()
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  sport: string;

  @Prop()
  teams: ObjectId[];
}

export type LeagueDocument = HydratedDocument<League>;

export const LeagueSchema = SchemaFactory.createForClass(League);
