import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

import { PlayerDocument } from '../players/player.schema';

@Schema()
export class Team {
  @Prop()
  _id!: ObjectId;

  @Prop()
  name!: string;

  @Prop()
  position!: string;

  @Prop()
  thumbnail!: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Player' })
  players!: PlayerDocument[];
}

export type TeamDocument = HydratedDocument<Team>;

export const TeamSchema = SchemaFactory.createForClass(Team);
