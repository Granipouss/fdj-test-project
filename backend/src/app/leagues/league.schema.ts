import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

import { TeamDocument } from '../teams/team.schema';

@Schema()
export class League {
  @Prop({ type: SchemaTypes.ObjectId })
  _id!: ObjectId;

  @Prop()
  name!: string;

  @Prop()
  sport!: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Team' })
  teams!: TeamDocument[];
}

export type LeagueDocument = HydratedDocument<League>;

export const LeagueSchema = SchemaFactory.createForClass(League);
